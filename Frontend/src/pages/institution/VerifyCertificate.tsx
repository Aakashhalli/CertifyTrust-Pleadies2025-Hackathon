
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { QrCode, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const VerifyCertificate = () => {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [verificationResult, setVerificationResult] = useState<null | {
    isValid: boolean;
    certificate?: {
      id: string;
      studentName: string;
      institutionName: string;
      program: string;
      issueDate: string;
      blockchain: {
        blockNumber: number;
        transactionHash: string;
        timestamp: string;
      };
    };
  }>(null);

  // Function to handle manual verification
  const handleManualVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) {
      toast({
        title: "Certificate ID required",
        description: "Please enter a certificate ID to verify.",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      // Here you would integrate with your backend API
      // For now, we'll just simulate a verification check
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful verification for demo
      // In a real app, this would come from your blockchain verification API
      if (certificateId === "invalid") {
        setVerificationResult({
          isValid: false,
          certificate: undefined
        });
        toast({
          title: "Invalid Certificate",
          description: "This certificate could not be verified on the blockchain.",
          variant: "destructive",
        });
      } else {
        setVerificationResult({
          isValid: true,
          certificate: {
            id: certificateId,
            studentName: "John Smith",
            institutionName: "University of Technology",
            program: "Bachelor of Computer Science",
            issueDate: "2023-06-15",
            blockchain: {
              blockNumber: 15482674,
              transactionHash: "0x7c2b4fc6d702e218f5ffe45867b5b0b11e71a7f14d4f12b6c1e0e84d692d9623",
              timestamp: "2023-06-15T10:23:15Z"
            }
          }
        });
        
        toast({
          title: "Certificate Verified",
          description: "This certificate has been successfully verified on the blockchain.",
        });
      }
      
    } catch (error) {
      toast({
        title: "Verification Error",
        description: "There was an error verifying the certificate. Please try again.",
        variant: "destructive",
      });
      setVerificationResult(null);
    } finally {
      setIsVerifying(false);
    }
  };
  
  // Function to simulate QR code scanning
  const handleScanQr = () => {
    setShowCamera(true);
    
    // In a real app, you would initialize the camera and QR scanning here
    // For our demo, we'll just simulate finding a QR code after a delay
    setTimeout(() => {
      // Simulate finding a QR code
      const simulatedQrData = "CERT-2023-0042";
      setCertificateId(simulatedQrData);
      setShowCamera(false);
      
      toast({
        title: "QR Code Scanned",
        description: `Certificate ID ${simulatedQrData} detected.`,
      });
    }, 3000);
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setCertificateId("");
  };

  return (
    <div className="page-container bg-blockchain-lightGray bg-opacity-30">
      <h1 className="text-3xl font-bold text-blockchain-dark mb-6">Verify Certificate</h1>
      <p className="text-blockchain-medium mb-8">Verify the authenticity of academic credentials on the blockchain.</p>
      
      {verificationResult ? (
        <Card className={`soft-card ${verificationResult.isValid ? 'border-green-200' : 'border-red-200'}`}>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center">
                  Verification Result
                  <Badge className={`ml-4 ${verificationResult.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {verificationResult.isValid ? 'VALID' : 'INVALID'}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Certificate verification status from the blockchain
                </CardDescription>
              </div>
              <Button variant="ghost" onClick={resetVerification}>Verify Another</Button>
            </div>
          </CardHeader>
          <CardContent>
            {verificationResult.isValid && verificationResult.certificate ? (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-green-800">
                  <p className="font-medium">This certificate has been cryptographically verified on the blockchain.</p>
                  <p className="text-sm mt-1">The data is authentic and has not been tampered with.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-blockchain-medium">Certificate ID</h3>
                      <p className="font-mono">{verificationResult.certificate.id}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-blockchain-medium">Student Name</h3>
                      <p>{verificationResult.certificate.studentName}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-blockchain-medium">Institution</h3>
                      <p>{verificationResult.certificate.institutionName}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-blockchain-medium">Program</h3>
                      <p>{verificationResult.certificate.program}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-blockchain-medium">Issue Date</h3>
                      <p>{new Date(verificationResult.certificate.issueDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-blockchain-medium">Blockchain Details</h3>
                    <div className="bg-blockchain-gray bg-opacity-50 p-4 rounded-lg font-mono text-xs">
                      <div className="space-y-2">
                        <div>
                          <span className="text-blockchain-medium">Block:</span>
                          <span className="ml-2">{verificationResult.certificate.blockchain.blockNumber}</span>
                        </div>
                        <div>
                          <span className="text-blockchain-medium">TX Hash:</span>
                          <span className="ml-2 break-all">{verificationResult.certificate.blockchain.transactionHash}</span>
                        </div>
                        <div>
                          <span className="text-blockchain-medium">Timestamp:</span>
                          <span className="ml-2">{new Date(verificationResult.certificate.blockchain.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <Button>View Full Certificate</Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-800">
                  <p className="font-medium">This certificate could not be verified on the blockchain.</p>
                  <p className="text-sm mt-1">The certificate may be invalid, tampered with, or doesn't exist.</p>
                </div>
                
                <div className="text-center py-4">
                  <p className="text-blockchain-medium">Certificate ID: {certificateId}</p>
                  <p className="text-sm text-blockchain-medium mt-4">Please check the certificate ID and try again, or contact support if you believe this is an error.</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="manual">Enter Certificate ID</TabsTrigger>
            <TabsTrigger value="qr">Scan QR Code</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <Card className="soft-card">
              <CardHeader>
                <CardTitle>Verify by Certificate ID</CardTitle>
                <CardDescription>
                  Enter the unique certificate ID to verify its authenticity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleManualVerify} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="certificateId">Certificate ID</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="certificateId"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        placeholder="e.g. CERT-2023-0042"
                        className="flex-1"
                      />
                      <Button type="submit" disabled={isVerifying}>
                        {isVerifying ? "Verifying..." : "Verify"}
                      </Button>
                    </div>
                    <p className="text-xs text-blockchain-medium mt-2">
                      For demo purposes, enter "invalid" to see an invalid certificate response.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="qr">
            <Card className="soft-card">
              <CardHeader>
                <CardTitle>Scan QR Code</CardTitle>
                <CardDescription>
                  Use your camera to scan the certificate's QR code
                </CardDescription>
              </CardHeader>
              <CardContent>
                {showCamera ? (
                  <div className="space-y-4">
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="animate-pulse">
                          <QrCode className="h-16 w-16 mx-auto mb-2" />
                          <p>Scanning for QR code...</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setShowCamera(false)} className="w-full">
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <QrCode className="h-16 w-16 mx-auto mb-4 text-blockchain-medium opacity-50" />
                      <p className="text-blockchain-medium">Scan the QR code on the certificate to verify its authenticity</p>
                    </div>
                    <Button onClick={handleScanQr} className="w-full">
                      <QrCode className="h-4 w-4 mr-2" />
                      Start Camera and Scan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default VerifyCertificate;
