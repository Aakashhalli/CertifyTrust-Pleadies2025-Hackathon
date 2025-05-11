
import jsQR from "jsqr";
import { toast } from "@/components/ui/use-toast";import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QrScannerComponent } from './QrScannerComponent';
import { CertificateResult } from './CertificateResult';
import { sampleCertificateValid, sampleCertificateInvalid } from '@/lib/mockData';
import { useToast } from '@/components/ui/use-toast';
import { Certificate } from '@/lib/mockData';
import { Search, Upload, AlertTriangle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const VerificationForm = () => {
  const [certificateId, setCertificateId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [scanActive, setScanActive] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  // Check for hash parameter in URL on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const hashParam = queryParams.get('hash');
    console.log("parameter found :=",hashParam)
    if (hashParam) {
      setCertificateId(hashParam);
      // Auto verify when hash is present in URL
      verifyWithHash(hashParam);
    }
  }, [location]);

const verifyWithHash = async (hash: string) => {
  if (!hash.trim()) {
    toast({
      title: "Error",
      description: "Invalid certificate hash",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);

  try {
    // 🔍 Extract certificate ID if hash is a full URL
    const certificateId = hash.includes("hash=")
      ? new URL(hash).searchParams.get("hash") || hash
      : hash;

    console.log("Calling backend with ID:", certificateId);

    const res = await fetch(`http://localhost:3000/verify-certificate/${certificateId}`);
    const json = await res.json();

    if (!json.success) throw new Error(json.error || "Verification failed");

    // Flatten backend data array
    const flatData = json.data.reduce((acc: Record<string, string>, item: any) => {
      const key = Object.keys(item)[0];
      acc[key] = item[key];
      return acc;
    }, {});

    const certificate = {
      ...flatData,
      id: json.certificateId,
      isValid: true,
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${json.certificateId}`,
    };

    setCertificate(certificate);
  } catch (err: any) {
    setCertificate({
      id: hash,
      isValid: false,
      error: err.message || "Failed to verify certificate",
    });
  } finally {
    setIsLoading(false);
  }
};



  const handleManualVerify = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!certificateId.trim()) {
    toast({
      title: "Error",
      description: "Please enter a valid certificate ID",
      variant: "destructive"
    });
    return;
  }

  setIsLoading(true);
  await verifyWithHash(certificateId.trim());
};

  
  const handleScanResult = (result: string) => {
    setScanActive(false);
    setCertificateId(result);
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, always return valid certificate for QR scans
      setCertificate(sampleCertificateValid);
      setIsLoading(false);
    }, 1000);
  };
  
  const resetVerification = () => {
    setCertificate(null);
    setCertificateId('');
  };
  
 
const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const context = canvas.getContext("2d");
      if (!context) return;

      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code?.data) {
        // ✅ Valid QR Code
        toast({
          title: "QR Code Scanned",
          description: "Redirecting to the verification page...",
        });
        window.location.href = code.data;
      } else {
        // ❌ Invalid QR Code
        toast({
          title: "Invalid QR Code",
          description: "The uploaded image does not contain a valid QR code.",
          variant: "destructive",
        });
      }
    };
    img.onerror = () => {
      toast({
        title: "Error",
        description: "Failed to load image.",
        variant: "destructive",
      });
    };
    img.src = reader.result as string;
  };
  reader.readAsDataURL(file);
};
  
  return (
    <div className="max-w-3xl mx-auto">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-500">Verifying certificate...</p>
        </div>
      ) : certificate ? (
        <div>
          <CertificateResult certificate={certificate} />
          <div className="mt-8 flex justify-center">
            <Button onClick={resetVerification}>Verify Another Certificate</Button>
          </div>
        </div>
      ) : (
        <Tabs defaultValue="scan">
          <TabsList className="w-full mb-8 ">
            <TabsTrigger value="scan" className="flex-1">Verify using cam scanner or upload a pic of QR</TabsTrigger>
            {/* <TabsTrigger value="manual" className="flex-1">Manual Entry</TabsTrigger> */}
          </TabsList>
          
          <TabsContent value="scan" className="space-y-6">
            {scanActive ? (
              <div className="relative">
                <div className="absolute top-4 right-4 z-10">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setScanActive(false)}
                  >
                    Cancel
                  </Button>
                </div>
                <QrScannerComponent onScan={handleScanResult} />
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Search size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-medium">Scan a QR Code</p>
                      <p className="text-gray-500 max-w-sm">
                        Scan the QR code on your certificate to instantly verify its authenticity
                      </p>
                    </div>
                    <Button onClick={() => setScanActive(true)}>
                      Start Camera
                    </Button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center mb-4">
                    <span className="h-px bg-gray-300 w-16"></span>
                    <span className="px-4 text-gray-500">Or</span>
                    <span className="h-px bg-gray-300 w-16"></span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 mb-4">Upload a QR Code Image</p>
                    <label htmlFor="qr-upload" className="cursor-pointer">
                      <div className="flex items-center space-x-2 border rounded-md px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
                        <Upload size={18} />
                        <span>Choose File</span>
                      </div>
                      <input 
                        id="qr-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* <TabsContent value="manual">
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center py-8 px-4 border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
                <div className="text-center max-w-md space-y-4">
                  <div className="p-3 rounded-full bg-warning/10 text-warning mx-auto w-fit">
                    <AlertTriangle size={32} />
                  </div>
                  <p className="text-lg font-medium">Manual Verification</p>
                  <p className="text-gray-500">
                    Enter the certificate ID or hash found on the credential. This is typically found at the bottom of the certificate or in the metadata section.
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleManualVerify} className="space-y-4">
                <div>
                  <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-1">
                    Certificate ID / Hash
                  </label>
                  <Input
                    id="certificateId"
                    placeholder="e.g., cert-abc-123-xyz-789"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    autoComplete="off"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading || !certificateId.trim()}
                 
                >
                  {isLoading ? 'Verifying...' : 'Verify Certificate'}
                </Button>
              </form>
            </div>
          </TabsContent> */}
        </Tabs>
      )}
    </div>
  );
};

export default VerificationForm;
