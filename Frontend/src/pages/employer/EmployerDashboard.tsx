
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { QrCode, CheckCircle, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const EmployerDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  // Mock verification history for demo
  const verificationHistory = [
    {
      id: "verify-123",
      certificate: "Bachelor of Computer Science",
      student: "Alice Johnson",
      institution: "University of Technology",
      verificationDate: "2023-05-09",
      status: "valid",
    },
    {
      id: "verify-124",
      certificate: "Master of Business Administration",
      student: "Bob Smith",
      institution: "Business School International",
      verificationDate: "2023-05-05",
      status: "valid",
    },
    {
      id: "verify-125",
      certificate: "Data Science Certification",
      student: "Charlie Brown",
      institution: "Tech Academy",
      verificationDate: "2023-05-01",
      status: "invalid",
    },
  ];

  return (
    <div className="blockchain-container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blockchain-dark">Employer Dashboard</h1>
          <p className="text-blockchain-medium mt-1">Welcome, {user.name}</p>
        </div>
        <Link to="/employer/verify">
          <Button>
            <QrCode className="mr-2 h-4 w-4" />
            Verify Certificate
          </Button>
        </Link>
      </div>

      {/* Quick Verify Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Certificate Verification</CardTitle>
          <CardDescription>Instantly verify academic credentials</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-blockchain-medium mb-2">
              Scan a QR code or enter a certificate ID to verify its authenticity on the blockchain.
            </p>
            <div className="flex space-x-3 mt-4">
              <Link to="/employer/verify">
                <Button>
                  <QrCode className="mr-2 h-4 w-4" />
                  Scan QR Code
                </Button>
              </Link>
              <Link to="/employer/verify?mode=manual">
                <Button variant="outline">
                  Enter Certificate ID
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-blockchain-gray p-6 rounded-lg">
            <CheckCircle className="h-20 w-20 mx-auto text-blockchain-green" />
            <p className="text-center mt-2 font-medium">Blockchain Verified</p>
            <p className="text-center text-sm text-blockchain-medium">Tamper-proof certificates</p>
          </div>
        </CardContent>
      </Card>

      {/* Verification History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Verification History</CardTitle>
            <CardDescription>Recent certificate verifications</CardDescription>
          </div>
          <History className="h-5 w-5 text-blockchain-medium" />
        </CardHeader>
        <CardContent>
          {verificationHistory.length === 0 ? (
            <p className="text-center py-4 text-blockchain-medium">No verification history yet</p>
          ) : (
            <div className="space-y-4">
              {verificationHistory.map((record) => (
                <div key={record.id} className="flex flex-col md:flex-row md:items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-blockchain-dark">{record.certificate}</h4>
                      <Badge variant={record.status === "valid" ? "default" : "destructive"}>
                        {record.status === "valid" ? "Valid" : "Invalid"}
                      </Badge>
                    </div>
                    <p className="text-sm text-blockchain-medium">Student: {record.student}</p>
                    <p className="text-sm text-blockchain-medium">Institution: {record.institution}</p>
                    <p className="text-xs text-blockchain-medium mt-1">
                      Verified: {new Date(record.verificationDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" className="mt-3 md:mt-0">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployerDashboard;
