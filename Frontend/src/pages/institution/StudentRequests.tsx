
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, Calendar, School, FileText, Check, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const StudentRequests = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  
  // Mock data for certificate requests
  const allRequests = [
    {
      id: "REQ-2023-001",
      studentName: "Alice Johnson",
      studentId: "S2020001",
      program: "Bachelor of Computer Science",
      requestDate: "2023-06-10",
      requestType: "Degree Certificate",
      status: "pending",
      message: "Requesting my degree certificate for job application purposes."
    },
    {
      id: "REQ-2023-002",
      studentName: "Bob Smith",
      studentId: "S2020042",
      program: "Bachelor of Computer Science",
      requestDate: "2023-06-08",
      requestType: "Transcript",
      status: "approved",
      message: "Need my academic transcript for higher education application."
    },
    {
      id: "REQ-2023-003",
      studentName: "Charlie Brown",
      studentId: "S2020098",
      program: "Master of Business Administration",
      requestDate: "2023-06-05",
      requestType: "Grade Card",
      status: "rejected",
      message: "Requesting grade card for the last semester.",
      rejectionReason: "Student records show incomplete coursework."
    },
    {
      id: "REQ-2023-004",
      studentName: "Diana Prince",
      studentId: "S2020103",
      program: "Bachelor of Arts",
      requestDate: "2023-06-09",
      requestType: "Grade Card",
      status: "pending",
      message: "Need my grade card for scholarship application."
    },
    {
      id: "REQ-2023-005",
      studentName: "Edward Norton",
      studentId: "S2019056",
      program: "Master of Data Science",
      requestDate: "2023-06-01",
      requestType: "Course Completion Certificate",
      status: "approved",
      message: "Requesting certificate for Blockchain Technology course."
    }
  ];

  // Filter requests based on search term and status
  const filteredRequests = allRequests.filter(req => {
    const matchesSearch = 
      req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = status === "all" || req.status === status;
    
    return matchesSearch && matchesStatus;
  });

  // Handle request approval
  const handleApprove = (requestId: string) => {
    // In a real app, you would call your API to update the request status
    toast({
      title: "Request Approved",
      description: `Request ${requestId} has been approved and will be processed.`,
    });
  };

  // Handle request rejection
  const handleReject = (requestId: string) => {
    // In a real app, you would call your API to update the request status
    toast({
      title: "Request Rejected",
      description: `Request ${requestId} has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <div className="page-container bg-blockchain-lightGray bg-opacity-30">
      <h1 className="text-3xl font-bold text-blockchain-dark mb-6">Student Certificate Requests</h1>
      <p className="text-blockchain-medium mb-8">Review and approve certificate requests from students</p>
      
      <Card className="soft-card mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blockchain-medium" />
              <Input
                placeholder="Search by student name, ID or request ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs 
              defaultValue="all" 
              className="w-full sm:w-auto"
              value={status}
              onValueChange={(v) => setStatus(v as "all" | "pending" | "approved" | "rejected")}
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>
      
      {filteredRequests.length === 0 ? (
        <Card className="soft-card text-center py-12">
          <CardContent>
            <FileText className="h-12 w-12 mx-auto text-blockchain-medium opacity-50 mb-3" />
            <h3 className="text-lg font-medium text-blockchain-dark">No requests found</h3>
            <p className="text-blockchain-medium mt-1">There are no certificate requests matching your filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="soft-card overflow-hidden">
              <div className={`h-1 ${
                request.status === "pending" ? "bg-amber-400" :
                request.status === "approved" ? "bg-green-400" :
                "bg-red-400"
              }`} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      {request.id}
                      <Badge className="ml-3" variant={
                        request.status === "pending" ? "outline" :
                        request.status === "approved" ? "default" :
                        "destructive"
                      }>
                        {request.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {request.requestType} request from {request.studentName}
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm text-blockchain-medium">
                    {new Date(request.requestDate).toLocaleDateString()}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-blockchain-medium" />
                        <div>
                          <p className="text-xs text-blockchain-medium">Student ID</p>
                          <p className="font-medium">{request.studentId}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <School className="h-4 w-4 text-blockchain-medium" />
                        <div>
                          <p className="text-xs text-blockchain-medium">Program</p>
                          <p className="font-medium">{request.program}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-blockchain-medium mb-1">Student Message</p>
                      <p className="text-sm p-3 bg-blockchain-gray bg-opacity-30 rounded">
                        "{request.message}"
                      </p>
                    </div>
                    
                    {request.status === "rejected" && request.rejectionReason && (
                      <div>
                        <p className="text-xs text-red-600 mb-1">Rejection Reason</p>
                        <p className="text-sm p-3 bg-red-50 text-red-700 rounded">
                          {request.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-end justify-end">
                    {request.status === "pending" ? (
                      <div className="flex space-x-3">
                        <Button variant="outline" onClick={() => handleReject(request.id)}>
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button onClick={() => handleApprove(request.id)}>
                          <Check className="h-4 w-4 mr-1" />
                          Approve & Issue
                        </Button>
                      </div>
                    ) : request.status === "approved" ? (
                      <div className="text-right">
                        <Button>View Issued Certificate</Button>
                      </div>
                    ) : (
                      <div className="text-right">
                        <Button variant="outline">
                          Review Again
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentRequests;
