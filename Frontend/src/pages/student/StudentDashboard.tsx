
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { FileText, Download, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StudentDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  // Mock certificate data for demo
  const certificates = [
    {
      id: "cert-123",
      type: "Degree Certificate",
      institution: "University of Technology",
      program: "Bachelor of Computer Science",
      issueDate: "2023-04-15",
      status: "verified",
    },
    {
      id: "cert-124",
      type: "Grade Card",
      institution: "University of Technology",
      program: "Bachelor of Computer Science",
      semester: "6",
      issueDate: "2023-04-01",
      status: "verified",
    },
    {
      id: "cert-125",
      type: "Course Certificate",
      institution: "Online Learning Platform",
      program: "Advanced Web Development",
      issueDate: "2023-03-10",
      status: "pending",
    },
  ];

  // Mock certificate requests for demo
  const requests = [
    {
      id: "req-789",
      type: "Transcript",
      institution: "University of Technology",
      requestDate: "2023-05-08",
      status: "pending",
    },
  ];

  return (
    <div className="blockchain-container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blockchain-dark">Student Dashboard</h1>
          <p className="text-blockchain-medium mt-1">Welcome, {user.name}</p>
        </div>
        <Link to="/student/request">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Request Certificate
          </Button>
        </Link>
      </div>

      {/* My Credentials Section */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>My Credentials</CardTitle>
              <CardDescription>All your verified certificates and academic records</CardDescription>
            </div>
            <Link to="/student/credentials">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {certificates.length === 0 ? (
            <div className="text-center py-8 text-blockchain-medium">
              <FileText className="h-12 w-12 mx-auto text-blockchain-medium opacity-50 mb-3" />
              <p>You don't have any certificates yet.</p>
              <Link to="/student/request" className="mt-4 inline-block">
                <Button variant="outline" size="sm">Request Your First Certificate</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div key={cert.id} className="flex flex-col md:flex-row md:items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-blockchain-dark">{cert.type}</h4>
                      <Badge variant={cert.status === "verified" ? "default" : "outline"}>
                        {cert.status === "verified" ? "Verified" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-blockchain-medium">{cert.institution}</p>
                    <p className="text-sm text-blockchain-medium">{cert.program} {cert.semester ? `• Semester ${cert.semester}` : ''}</p>
                    <p className="text-xs text-blockchain-medium mt-1">Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex space-x-2 mt-3 md:mt-0">
                    <Button size="sm" variant="outline" className="flex items-center">
                      <Download className="mr-1 h-4 w-4" />
                      Download
                    </Button>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Requests</CardTitle>
          <CardDescription>Certificate requests awaiting approval</CardDescription>
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-center py-4 text-blockchain-medium">No pending requests</p>
          ) : (
            <div className="space-y-4">
              {requests.map((request) => (
                <div key={request.id} className="flex flex-col md:flex-row md:items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                  <div>
                    <h4 className="font-medium text-blockchain-dark">{request.type}</h4>
                    <p className="text-sm text-blockchain-medium">{request.institution}</p>
                    <p className="text-xs text-blockchain-medium mt-1">Requested: {new Date(request.requestDate).toLocaleDateString()}</p>
                  </div>
                  <Badge className="mt-2 md:mt-0">Pending</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
