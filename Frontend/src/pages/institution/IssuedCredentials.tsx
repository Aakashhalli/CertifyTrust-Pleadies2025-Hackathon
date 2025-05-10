
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DownloadCloud, Eye, Search, SortAsc, SortDesc } from "lucide-react";

const IssuedCredentials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProgram, setFilterProgram] = useState("");
  const [filterYear, setFilterYear] = useState("");

  // Mock data for issued credentials
  const credentials = [
    {
      id: "CERT-2023-0001",
      studentName: "Alice Johnson",
      studentId: "S2020001",
      program: "Bachelor of Computer Science",
      issueDate: "2023-06-15",
      type: "Degree Certificate",
      status: "verified"
    },
    {
      id: "CERT-2023-0002",
      studentName: "Bob Smith",
      studentId: "S2020042",
      program: "Bachelor of Computer Science",
      issueDate: "2023-06-15",
      type: "Degree Certificate",
      status: "verified"
    },
    {
      id: "CERT-2023-0003",
      studentName: "Charlie Brown",
      studentId: "S2020098",
      program: "Master of Business Administration",
      issueDate: "2023-06-10",
      type: "Degree Certificate",
      status: "verified"
    },
    {
      id: "CERT-2023-0004",
      studentName: "Diana Prince",
      studentId: "S2020103",
      program: "Bachelor of Arts",
      issueDate: "2023-06-08",
      type: "Grade Card",
      status: "pending"
    },
    {
      id: "CERT-2023-0005",
      studentName: "Edward Norton",
      studentId: "S2019056",
      program: "Master of Data Science",
      issueDate: "2023-05-28",
      type: "Degree Certificate",
      status: "verified"
    }
  ];

  // Filter credentials based on search term and filters
  const filteredCredentials = credentials.filter(cred => {
    const matchesSearch = 
      cred.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cred.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cred.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProgram = filterProgram === "" || cred.program === filterProgram;
    
    const matchesYear = filterYear === "" || new Date(cred.issueDate).getFullYear().toString() === filterYear;
    
    return matchesSearch && matchesProgram && matchesYear;
  });

  // Get unique programs for filter
  const uniquePrograms = Array.from(new Set(credentials.map(cred => cred.program)));

  // Get unique years for filter
  const uniqueYears = Array.from(new Set(
    credentials.map(cred => new Date(cred.issueDate).getFullYear().toString())
  ));

  return (
    <div className="page-container bg-blockchain-lightGray bg-opacity-30">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blockchain-dark">Issued Credentials</h1>
          <p className="text-blockchain-medium mt-1">View and manage all certificates issued by your institution</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <DownloadCloud className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>
      
      <Card className="soft-card mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Search and Filter</CardTitle>
          <CardDescription>Find specific certificates or filter by criteria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search" className="sr-only">Search</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blockchain-medium" />
                <Input
                  id="search"
                  placeholder="Search by student name, ID or certificate ID..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="program-filter" className="sr-only">Program</Label>
              <Select value={filterProgram} onValueChange={setFilterProgram}>
                <SelectTrigger id="program-filter">
                  <SelectValue placeholder="All Programs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Programs</SelectItem>
                  {uniquePrograms.map(program => (
                    <SelectItem key={program} value={program}>
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="year-filter" className="sr-only">Year</Label>
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger id="year-filter">
                  <SelectValue placeholder="All Years" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Years</SelectItem>
                  {uniqueYears.map(year => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-blockchain-gray bg-opacity-50 text-blockchain-dark">
              <tr>
                <th className="px-6 py-3">Certificate ID</th>
                <th className="px-6 py-3">
                  <div className="flex items-center">
                    Student Name
                    <SortAsc className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3">Student ID</th>
                <th className="px-6 py-3">Program</th>
                <th className="px-6 py-3">
                  <div className="flex items-center">
                    Issue Date
                    <SortDesc className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCredentials.length === 0 ? (
                <tr className="border-b hover:bg-gray-50">
                  <td colSpan={8} className="px-6 py-12 text-center text-blockchain-medium">
                    No credentials found matching your search criteria
                  </td>
                </tr>
              ) : (
                filteredCredentials.map((credential) => (
                  <tr key={credential.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-blockchain-dark">
                      {credential.id}
                    </td>
                    <td className="px-6 py-4">
                      {credential.studentName}
                    </td>
                    <td className="px-6 py-4">
                      {credential.studentId}
                    </td>
                    <td className="px-6 py-4">
                      {credential.program}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(credential.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {credential.type}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={credential.status === "verified" ? "default" : "outline"}>
                        {credential.status === "verified" ? "Verified" : "Pending"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <DownloadCloud className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="py-3 px-6 flex items-center justify-between border-t">
          <div className="text-sm text-blockchain-medium">
            Showing {filteredCredentials.length} of {credentials.length} credentials
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuedCredentials;
