
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Search, Download, Eye, QrCode, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const MyCredentials = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [showQrCode, setShowQrCode] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  
  // Mock data for certificates
  const certificates = [
    {
      id: "CERT-2023-0042",
      type: "Degree Certificate",
      institution: "University of Technology",
      program: "Bachelor of Computer Science",
      issueDate: "2023-05-20",
      status: "verified",
      blockchain: {
        hash: "0x7c2b4fc6d702e218f5ffe45867b5b0b11e71a7f14d4f12b6c1e0e84d692d9623",
        blockNumber: 15482674
      }
    },
    {
      id: "CERT-2023-0039",
      type: "Grade Card",
      institution: "University of Technology",
      program: "Bachelor of Computer Science",
      semester: "6",
      issueDate: "2023-04-15",
      status: "verified",
      blockchain: {
        hash: "0xb3c937f010665f356367b34724a14dfdf77b42d19de29c689f0b8e0ba2822165",
        blockNumber: 15389245
      }
    },
    {
      id: "CERT-2023-0028",
      type: "Grade Card",
      institution: "University of Technology",
      program: "Bachelor of Computer Science",
      semester: "5",
      issueDate: "2022-12-10",
      status: "verified",
      blockchain: {
        hash: "0x8fab4c9de365f52a6a3bc5efe9c57ed108486298a8a198e974d7295b74cc0f73",
        blockNumber: 14982331
      }
    },
    {
      id: "CERT-2022-0156",
      type: "Course Completion",
      institution: "Online Learning Platform",
      program: "Advanced Web Development",
      issueDate: "2022-09-05",
      status: "verified",
      blockchain: {
        hash: "0x2d7ae1c6236690e39e7a2297697c4ae96d4bf61dcba1b6514a84f6f9b4cd0c2f",
        blockNumber: 14568742
      }
    },
    {
      id: "REQ-2023-005",
      type: "Transcript",
      institution: "University of Technology",
      program: "Bachelor of Computer Science",
      requestDate: "2023-06-08",
      status: "pending",
    }
  ];

  // Filter certificates based on search term and type
  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = 
      cert.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.program.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "" || cert.type === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Get unique certificate types for filter
  const certificateTypes = Array.from(new Set(certificates.map(cert => cert.type)));
  
  // Function to handle certificate selection and QR code display
  const handleViewQrCode = (certificate: any) => {
    setSelectedCertificate(certificate);
    setShowQrCode(true);
  };
  
  // Function to simulate download
  const handleDownload = (certificate: any) => {
    // In a real app, this would trigger a file download
    alert(`Downloading certificate ${certificate.id}`);
  };

  return (
    <div className="page-container bg-blockchain-lightGray bg-opacity-30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blockchain-dark">My Credentials</h1>
          <p className="text-blockchain-medium mt-1">View and manage your academic certificates</p>
        </div>
      </div>
      
      <Card className="soft-card mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blockchain-medium" />
              <Input
                placeholder="Search certificates..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-64">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
                  {certificateTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {filteredCertificates.length === 0 ? (
        <Card className="soft-card text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center justify-center">
              <QrCode className="h-16 w-16 text-blockchain-medium opacity-50 mb-3" />
              <h3 className="text-lg font-medium text-blockchain-dark">No credentials found</h3>
              <p className="text-blockchain-medium mt-1 mb-6">You don't have any certificates yet</p>
              <Button>Request Your First Certificate</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredCertificates.map((certificate) => (
            <Card key={certificate.id} className={`soft-card hover:shadow-md transition-shadow ${
              certificate.status === "pending" ? "border-l-4 border-l-amber-400" :
              "border-l-4 border-l-green-400"
            }`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-lg text-blockchain-dark">{certificate.type}</h3>
                        <Badge variant={certificate.status === "verified" ? "default" : "outline"}>
                          {certificate.status === "verified" ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-blockchain-medium">{certificate.institution}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="text-blockchain-medium">Program: </span>
                        <span className="font-medium">{certificate.program}</span>
                      </p>
                      
                      {certificate.semester && (
                        <p className="text-sm">
                          <span className="text-blockchain-medium">Semester: </span>
                          <span className="font-medium">{certificate.semester}</span>
                        </p>
                      )}
                      
                      <p className="text-sm">
                        <span className="text-blockchain-medium">
                          {certificate.status === "verified" ? "Issued: " : "Requested: "}
                        </span>
                        <span className="font-medium">
                          {new Date(certificate.issueDate || certificate.requestDate).toLocaleDateString()}
                        </span>
                      </p>
                      
                      {certificate.status === "verified" && (
                        <p className="text-xs text-blockchain-medium mt-1">
                          Certificate ID: <span className="font-mono">{certificate.id}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex md:flex-col justify-between items-end mt-4 md:mt-0 space-y-2">
                    {certificate.status === "verified" ? (
                      <div className="space-x-2 md:space-x-0 md:space-y-2">
                        <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleViewQrCode(certificate)}>
                          <QrCode className="mr-1.5 h-4 w-4" />
                          QR Code
                        </Button>
                        
                        <Button variant="outline" size="sm" className="flex items-center" onClick={() => handleDownload(certificate)}>
                          <Download className="mr-1.5 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    ) : (
                      <Badge variant="outline" className="px-3 py-1">
                        Processing
                      </Badge>
                    )}
                  </div>
                </div>
                
                {certificate.status === "verified" && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-1">
                      <p className="text-xs text-blockchain-medium">Blockchain Verified</p>
                      <p className="text-xs font-mono text-blockchain-medium truncate">
                        Block #{certificate.blockchain.blockNumber}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Certificate QR Code</DialogTitle>
            <DialogDescription>
              Scan this QR code to verify the certificate
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            {selectedCertificate && (
              <>
                <div className="bg-white p-6 rounded-lg shadow-inner mb-4">
                  <QrCode className="h-48 w-48" />
                </div>
                <div className="text-center">
                  <h4 className="font-medium">{selectedCertificate.type}</h4>
                  <p className="text-sm text-blockchain-medium">{selectedCertificate.id}</p>
                </div>
                <div className="flex space-x-3 mt-6">
                  <Button variant="outline" size="sm">
                    <Download className="mr-1.5 h-4 w-4" />
                    Download QR
                  </Button>
                  <Button size="sm">
                    <Share2 className="mr-1.5 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCredentials;
