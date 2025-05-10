
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Upload } from "lucide-react";

const IssueCertificate = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for single certificate
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [program, setProgram] = useState("");
  const [semester, setSemester] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [sgpa, setSgpa] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [subjects, setSubjects] = useState([{ name: "", grade: "" }]);
  
  // Bulk upload state
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file selected");
  
  // Function to handle adding a subject
  const addSubject = () => {
    setSubjects([...subjects, { name: "", grade: "" }]);
  };
  
  // Function to handle removing a subject
  const removeSubject = (index: number) => {
    const newSubjects = [...subjects];
    newSubjects.splice(index, 1);
    setSubjects(newSubjects);
  };
  
  // Function to update subject data
  const updateSubject = (index: number, field: string, value: string) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setSubjects(newSubjects);
  };
  
  // Function to handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
  
  // Function to handle single certificate submission
  const handleSingleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with your backend API
      // For now, we'll just simulate a success
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Certificate issued successfully",
        description: `Certificate for ${studentName} has been created and stored on the blockchain.`,
      });
      
      // Reset form
      setStudentName("");
      setStudentId("");
      setProgram("");
      setSemester("");
      setCgpa("");
      setSgpa("");
      setIssueDate("");
      setSubjects([{ name: "", grade: "" }]);
      
    } catch (error) {
      toast({
        title: "Failed to issue certificate",
        description: "There was an error creating the certificate. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Function to handle bulk certificate submission
  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a file to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with your backend API
      // For now, we'll just simulate a success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Bulk certificates processed",
        description: `Successfully processed certificates from ${fileName}.`,
      });
      
      // Reset form
      setFile(null);
      setFileName("No file selected");
      
    } catch (error) {
      toast({
        title: "Failed to process certificates",
        description: "There was an error processing the file. Please check the format and try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container bg-blockchain-lightGray bg-opacity-30">
      <h1 className="text-3xl font-bold text-blockchain-dark mb-6">Issue Certificate</h1>
      <p className="text-blockchain-medium mb-8">Create and issue new academic certificates for students.</p>
      
      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="single">Issue Single Certificate</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single">
          <Card className="soft-card">
            <CardHeader>
              <CardTitle>Issue Single Certificate</CardTitle>
              <CardDescription>
                Fill in the student details to issue an individual certificate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSingleSubmit} className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Student Name</Label>
                      <Input 
                        id="studentName" 
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID/SRN</Label>
                      <Input 
                        id="studentId" 
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="program">Program</Label>
                      <Input 
                        id="program" 
                        value={program}
                        onChange={(e) => setProgram(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <Select value={semester} onValueChange={setSemester}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                            <SelectItem key={sem} value={sem.toString()}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cgpa">CGPA</Label>
                      <Input 
                        id="cgpa"
                        type="number"
                        step="0.01" 
                        min="0"
                        max="10"
                        value={cgpa}
                        onChange={(e) => setCgpa(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sgpa">SGPA</Label>
                      <Input 
                        id="sgpa"
                        type="number"
                        step="0.01" 
                        min="0"
                        max="10"
                        value={sgpa}
                        onChange={(e) => setSgpa(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="issueDate">Issue Date</Label>
                      <Input 
                        id="issueDate"
                        type="date"
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label>Subjects</Label>
                      <Button type="button" variant="ghost" size="sm" onClick={addSubject}>
                        <Plus className="h-4 w-4 mr-1" /> Add Subject
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {subjects.map((subject, index) => (
                        <div key={index} className="flex space-x-4 items-center">
                          <Input
                            className="flex-1"
                            placeholder="Subject name"
                            value={subject.name}
                            onChange={(e) => updateSubject(index, 'name', e.target.value)}
                            required
                          />
                          <Input
                            className="w-24"
                            placeholder="Grade"
                            value={subject.grade}
                            onChange={(e) => updateSubject(index, 'grade', e.target.value)}
                            required
                          />
                          {subjects.length > 1 && (
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon"
                              onClick={() => removeSubject(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="institution">Institution</Label>
                    <Input 
                      id="institution" 
                      value={user?.name || ""}
                      readOnly
                      disabled
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" type="reset">Reset</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Issue Certificate"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bulk">
          <Card className="soft-card">
            <CardHeader>
              <CardTitle>Bulk Issue Certificates</CardTitle>
              <CardDescription>
                Upload a CSV or Excel file with student data to issue multiple certificates at once
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBulkSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center bg-white">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                    <Label htmlFor="file-upload" className="block text-sm font-medium text-blockchain-dark mb-2">
                      Upload your file
                    </Label>
                    <p className="text-xs text-blockchain-medium mb-4">
                      Supported formats: .xlsx, .csv (max 5MB)
                    </p>
                    <Input 
                      id="file-upload" 
                      type="file" 
                      className="hidden"
                      accept=".csv,.xlsx" 
                      onChange={handleFileChange}
                    />
                    <div className="flex justify-center">
                      <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                        Browse Files
                      </Button>
                    </div>
                    <p className="text-sm text-blockchain-medium mt-4">
                      {fileName}
                    </p>
                  </div>
                  
                  <div className="bg-blockchain-softYellow bg-opacity-40 p-4 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">File Requirements</h4>
                    <ul className="text-sm text-amber-700 space-y-1 list-disc list-inside">
                      <li>Your file must include columns for: Name, ID, Program, Semester, CGPA, SGPA, Issue Date</li>
                      <li>Subjects and grades should be formatted as specified in the template</li>
                      <li>Maximum 100 records per upload</li>
                    </ul>
                    <Button variant="link" className="text-amber-800 p-0 h-auto mt-2">
                      Download Template
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setFileName("No file selected");
                    }}
                  >
                    Clear
                  </Button>
                  <Button type="submit" disabled={!file || isSubmitting}>
                    {isSubmitting ? "Processing..." : "Upload and Process"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IssueCertificate;
