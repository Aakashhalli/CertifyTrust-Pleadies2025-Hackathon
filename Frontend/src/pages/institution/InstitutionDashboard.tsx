
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ArrowRight, FileText, CheckCircle, MessageSquare, User } from "lucide-react";

const InstitutionDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  // For a real app, you would fetch this data from your backend
  const statsData = {
    issuedCertificates: 124,
    pendingRequests: 7,
    verifiedCertificates: 89,
    studentsServed: 98
  };

  // Recent activity data (mock data for demo)
  const recentActivity = [
    { id: 1, type: "issue", student: "Alice Johnson", date: "2023-05-10T09:30:00" },
    { id: 2, type: "request", student: "Bob Smith", date: "2023-05-09T14:20:00" },
    { id: 3, type: "verify", student: "Charlie Brown", date: "2023-05-09T11:15:00" },
    { id: 4, type: "issue", student: "David Miller", date: "2023-05-08T16:45:00" }
  ];

  return (
    <div className="blockchain-container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blockchain-dark">Institution Dashboard</h1>
          <p className="text-blockchain-medium mt-1">Welcome, {user.name}</p>
        </div>
        <Link to="/institution/issue">
          <Button className="flex items-center">
            Issue New Certificate
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <FileText className="h-10 w-10 text-blockchain-blue" />
              <div>
                <p className="text-sm text-blockchain-medium">Issued Certificates</p>
                <h3 className="text-2xl font-bold text-blockchain-dark">{statsData.issuedCertificates}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <MessageSquare className="h-10 w-10 text-blockchain-blue" />
              <div>
                <p className="text-sm text-blockchain-medium">Pending Requests</p>
                <h3 className="text-2xl font-bold text-blockchain-dark">{statsData.pendingRequests}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <CheckCircle className="h-10 w-10 text-blockchain-green" />
              <div>
                <p className="text-sm text-blockchain-medium">Verified Certificates</p>
                <h3 className="text-2xl font-bold text-blockchain-dark">{statsData.verifiedCertificates}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <User className="h-10 w-10 text-blockchain-blue" />
              <div>
                <p className="text-sm text-blockchain-medium">Students Served</p>
                <h3 className="text-2xl font-bold text-blockchain-dark">{statsData.studentsServed}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest certificate actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between border-b last:border-0 pb-4 last:pb-0">
                <div>
                  <p className="font-medium text-blockchain-dark">
                    {activity.type === "issue" ? "Issued certificate to" :
                      activity.type === "request" ? "Certificate request from" :
                      "Certificate verified for"} {activity.student}
                  </p>
                  <p className="text-sm text-blockchain-medium">
                    {new Date(activity.date).toLocaleString()}
                  </p>
                </div>
                {activity.type === "request" && (
                  <Button variant="outline" size="sm">Review</Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Issue Certificate</CardTitle>
            <CardDescription>Create and issue new academic certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <Link to="/institution/issue">
                <Button>Issue Certificate</Button>
              </Link>
              <Link to="/institution/issue/mass">
                <Button variant="outline">Batch Issue</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Verify Certificate</CardTitle>
            <CardDescription>Verify authenticity of issued certificates</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/institution/verify">
              <Button>Verify Certificate</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Student Requests</CardTitle>
            <CardDescription>Review and approve pending certificate requests</CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/institution/requests">
              <Button>View Requests</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstitutionDashboard;
