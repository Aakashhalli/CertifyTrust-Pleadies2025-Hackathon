
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Calendar } from "lucide-react";

const RequestCertificate = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [studentId, setStudentId] = useState("");
  const [institution, setInstitution] = useState("");
  const [program, setProgram] = useState("");
  const [certificateType, setCertificateType] = useState("");
  const [purpose, setPurpose] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  
  // Mock data for institutions
  const institutions = [
    { id: "inst-001", name: "University of Technology" },
    { id: "inst-002", name: "State College of Engineering" },
    { id: "inst-003", name: "National Institute of Science" },
    { id: "inst-004", name: "Global Business School" },
    { id: "inst-005", name: "Arts and Design Academy" }
  ];
  
  // Certificate types
  const certificateTypes = [
    "Degree Certificate",
    "Provisional Certificate",
    "Grade Card",
    "Transcript",
    "Course Completion Certificate",
    "Participation Certificate"
  ];
  
  // Purpose options
  const purposeOptions = [
    "Higher Education",
    "Employment",
    "Visa Application",
    "Scholarship Application",
    "Personal Records",
    "Other"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with your backend API
      // For now, we'll just simulate a success
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Request submitted successfully",
        description: "Your certificate request has been sent to the institution for processing.",
      });
      
      // Reset form
      setStudentId("");
      setInstitution("");
      setProgram("");
      setCertificateType("");
      setPurpose("");
      setAdditionalInfo("");
      
    } catch (error) {
      toast({
        title: "Failed to submit request",
        description: "There was an error submitting your certificate request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container bg-blockchain-lightGray bg-opacity-30">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blockchain-dark mb-6">Request Certificate</h1>
        <p className="text-blockchain-medium mb-8">
          Request a new certificate or academic credential from your institution
        </p>
        
        <Card className="soft-card">
          <CardHeader>
            <CardTitle>Certificate Request Form</CardTitle>
            <CardDescription>
              Fill in your details to request an academic certificate from your institution
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input 
                      id="studentName" 
                      value={user?.name || ""}
                      disabled
                      readOnly
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID/Roll Number</Label>
                    <Input 
                      id="studentId" 
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      placeholder="e.g. S20210001"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Select value={institution} onValueChange={setInstitution} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your institution" />
                    </SelectTrigger>
                    <SelectContent>
                      {institutions.map((inst) => (
                        <SelectItem key={inst.id} value={inst.id}>
                          {inst.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="program">Program / Course</Label>
                  <Input 
                    id="program" 
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    placeholder="e.g. Bachelor of Computer Science"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="certificateType">Certificate Type</Label>
                  <Select value={certificateType} onValueChange={setCertificateType} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select certificate type" />
                    </SelectTrigger>
                    <SelectContent>
                      {certificateTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select value={purpose} onValueChange={setPurpose} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea 
                    id="additionalInfo" 
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Any specific details or requirements for your certificate request"
                    rows={4}
                  />
                </div>
                
                <div className="bg-blockchain-softYellow bg-opacity-50 p-4 rounded-lg">
                  <div className="flex space-x-3">
                    <Calendar className="h-5 w-5 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium text-amber-800 mb-1">Processing Time</h4>
                      <p className="text-sm text-amber-700">
                        Certificate requests typically take 3-5 business days to process. You'll be notified once your request is approved.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-2">
                <Button variant="outline" type="reset">
                  Reset
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestCertificate;
