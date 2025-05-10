
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { QrCode, User, School, Calendar, Download, Share2, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EmployerVerify = () => {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const [certificateId, setCertificateId] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [verificationResult, setVerificationResult] = useState<null | {
    isValid: boolean;
    certificate?: {
      id: string;
      studentName: string;
      studentId?: string;
      institutionName: string;
      program: string;
      issueDate: string;
      cgpa?: string;
      graduationDate?: string;
      type: string;
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
      if (certificateId.toLowerCase() === "invalid") {
        setVerificationResult({
          isValid: false,
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
            studentId: "S2019032",
            institutionName: "University of Technology",
            program: "Bachelor of Computer Science",
            issueDate: "2023-06-15",
            cgpa: "3.8/4.0",
            graduationDate: "2023-05-30",
            type: "Degree Certificate",
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
      
      // Automatically trigger verification - fixing the type conversion here
      setTimeout(() => {
        // Create a proper FormEvent instead of using Event directly
        const mockFormEvent = {
          preventDefault: () => {},
        } as React.FormEvent;
        
        handleManualVerify(mockFormEvent);
      }, 500);
      
    }, 3000);
  };

  const resetVerification = () => {
    setVerificationResult(null);
    setCertificateId("");
  };

  return (
    <div className="page-container bg-blockchain-softPurple bg-opacity-20">
      <h1 className="text-3xl font-bold text-blockchain-dark mb-6">Verify Certificate</h1>
      <p className="text-blockchain-medium mb-8">Verify the authenticity of academic credentials on the blockchain.</p>
      
      {verificationResult ? (
        <Card className={`soft-card ${verificationResult.isValid ? 'border-green-200' : 'border-red-200'}`}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center">
                  Verification Result
                  <Badge className={`ml-4 ${verificationResult.isValid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {verificationResult.isValid ? 'VERIFIED & AUTHENTIC' : 'VERIFICATION FAILED'}
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
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-green-800 flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">This certificate has been cryptographically verified on the blockchain.</p>
                    <p className="text-sm mt-1">The data matches the original certificate issued by {verificationResult.certificate.institutionName}.</p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg border-b pb-2">Student Information</h3>
                      
                      <div className="flex items-start space-x-3">
                        <User className="h-5 w-5 mt-1 text-blockchain-medium" />
                        <div>
                          <p className="text-sm text-blockchain-medium">Student Name</p>
                          <p className="font-medium">{verificationResult.certificate.studentName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <School className="h-5 w-5 mt-1 text-blockchain-medium" />
                        <div>
                          <p className="text-sm text-blockchain-medium">Program</p>
                          <p className="font-medium">{verificationResult.certificate.program}</p>
                        </div>
                      </div>
                      
                      {verificationResult.certificate.cgpa && (
                        <div className="flex items-start space-x-3">
                          <div className="h-5 w-5 mt-1 flex items-center justify-center text-blockchain-medium">
                            <span className="text-lg font-bold">A</span>
                          </div>
                          <div>
                            <p className="text-sm text-blockchain-medium">CGPA</p>
                            <p className="font-medium">{verificationResult.certificate.cgpa}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 mt-1 text-blockchain-medium" />
                        <div>
                          <p className="text-sm text-blockchain-medium">Graduation Date</p>
                          <p className="font-medium">
                            {verificationResult.certificate.graduationDate 
                              ? new Date(verificationResult.certificate.graduationDate).toLocaleDateString() 
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg border-b pb-2">Certificate Details</h3>
                      
                      <div>
                        <p className="text-sm text-blockchain-medium">Certificate Type</p>
                        <p className="font-medium">{verificationResult.certificate.type}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-blockchain-medium">Institution</p>
                        <p className="font-medium">{verificationResult.certificate.institutionName}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-blockchain-medium">Issue Date</p>
                        <p className="font-medium">
                          {new Date(verificationResult.certificate.issueDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-sm text-blockchain-medium">Certificate ID</p>
                        <p className="font-mono text-sm">{verificationResult.certificate.id}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-lg border-b pb-2">Blockchain Verification</h3>
                      
                      <div className="bg-blockchain-gray bg-opacity-50 p-4 rounded-lg font-mono text-xs space-y-3">
                        <div>
                          <span className="text-blockchain-medium">Block Number:</span>
                          <span className="block mt-1">{verificationResult.certificate.blockchain.blockNumber}</span>
                        </div>
                        <div>
                          <span className="text-blockchain-medium">Transaction Hash:</span>
                          <span className="block mt-1 break-all">{verificationResult.certificate.blockchain.transactionHash}</span>
                        </div>
                        <div>
                          <span className="text-blockchain-medium">Timestamp:</span>
                          <span className="block mt-1">{new Date(verificationResult.certificate.blockchain.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-blockchain-medium italic">
                        This certificate was verified against the permanent record on the blockchain. The digital signature matches the original issuance data.
                      </p>
                    </div>
                    
                    <div className="pt-4">
                      <div className="flex flex-col space-y-3">
                        <Button className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download Certificate
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Share2 className="mr-2 h-4 w-4" />
                          Share Verification Result
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 text-red-800 flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">This certificate could not be verified on the blockchain.</p>
                    <p className="text-sm mt-1">The certificate may be invalid, tampered with, or doesn't exist.</p>
                  </div>
                </div>
                
                <div className="text-center py-8">
                  <p className="font-medium">Certificate ID: {certificateId}</p>
                  <div className="mt-6 max-w-md mx-auto text-sm text-blockchain-medium space-y-4">
                    <p>Please check the certificate ID and try again, or ask the certificate owner to provide a valid certificate.</p>
                    <p>If you believe this is an error, please contact the issuing institution for verification.</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="qr" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mx-auto">
            <TabsTrigger value="qr">Scan QR Code</TabsTrigger>
            <TabsTrigger value="manual">Enter Certificate ID</TabsTrigger>
          </TabsList>
          
          <TabsContent value="qr">
            <Card className="soft-card max-w-md mx-auto">
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
                      <div className="bg-blockchain-softPurple p-6 rounded-full inline-block mb-4">
                        <QrCode className="h-16 w-16 text-blockchain-blue" />
                      </div>
                      <p className="text-blockchain-medium">Scan the QR code on the certificate to verify its authenticity</p>
                    </div>
                    <Button onClick={handleScanQr} className="w-full">
                      <QrCode className="h-4 w-4 mr-2" />
                      Start Camera and Scan
                    </Button>
                    <p className="text-xs text-center text-blockchain-medium">
                      Point your camera at the QR code on the certificate
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="manual">
            <Card className="soft-card max-w-md mx-auto">
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
                    <Input 
                      id="certificateId"
                      value={certificateId}
                      onChange={(e) => setCertificateId(e.target.value)}
                      placeholder="e.g. CERT-2023-0042"
                      className="font-mono"
                    />
                    <p className="text-xs text-blockchain-medium mt-1">
                      Enter the certificate ID exactly as it appears on the document.
                    </p>
                    <p className="text-xs text-blockchain-medium mt-1">
                      For demo purposes, enter "invalid" to see an invalid certificate response.
                    </p>
                  </div>
                  <Button type="submit" disabled={isVerifying} className="w-full">
                    {isVerifying ? "Verifying..." : "Verify Certificate"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default EmployerVerify;
