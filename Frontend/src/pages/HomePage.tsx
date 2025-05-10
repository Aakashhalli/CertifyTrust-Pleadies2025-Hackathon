
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { BadgeCheck, FileCheck, Shield, Zap, BookOpen, Globe, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HomePage = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // Function to determine where to navigate based on user role
  const getDashboardLink = () => {
    if (!isAuthenticated) return "/login";
    
    switch (user.role) {
      case "institution":
        return "/institution";
      case "student":
        return "/student";
      case "employer":
        return "/employer";
      default:
        return "/login";
    }
  };

  return (
    <div className="bg-gradient-to-b from-white to-blockchain-lightGray">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="blockchain-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-blockchain-softGreen text-green-700 font-medium text-sm mb-2">
                Blockchain-Powered Verification
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-blockchain-dark">
                Secure Digital Academic Credentials
              </h1>
              <p className="text-lg text-blockchain-medium max-w-lg">
                CertChain provides tamper-proof, instantly verifiable academic certificates using blockchain technology.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild size="lg" className="shadow-sm">
                  <Link to={getDashboardLink()}>
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/register">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-blockchain-blue bg-opacity-10 rounded-xl p-1">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2 items-center">
                      <Shield className="h-5 w-5 text-blockchain-blue" />
                      <span className="font-semibold">CertChain</span>
                    </div>
                    <Badge className="px-2 py-1 text-xs rounded-full" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-24 w-24 mx-auto mb-2 bg-blue-50 rounded-lg flex items-center justify-center">
                      <BadgeCheck className="h-12 w-12 text-blockchain-blue" />
                    </div>
                    <h3 className="text-center font-bold text-lg">Certificate Verified</h3>
                    <div className="text-sm bg-green-50 border border-green-100 rounded-md p-3 text-green-800">
                      <p className="font-medium">Successfully verified on blockchain</p>
                      <p className="text-xs mt-1">Block #15482674 • June 15, 2023</p>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blockchain-medium">Student:</span>
                        <span className="font-medium">John Smith</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blockchain-medium">Institution:</span>
                        <span className="font-medium">University of Technology</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blockchain-medium">Degree:</span>
                        <span className="font-medium">Bachelor of Computer Science</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-blockchain-softPeach -z-10"></div>
              <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-blockchain-softYellow -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="page-section bg-white">
        <div className="blockchain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blockchain-dark mb-3">Why Choose CertChain?</h2>
            <p className="text-blockchain-medium max-w-2xl mx-auto">
              Our platform offers secure, efficient, and transparent certificate management for institutions, students, and employers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-blockchain-softGreen p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Tamper-Proof Security</h3>
              <p className="text-blockchain-medium">
                Certificates stored on the blockchain cannot be altered or falsified, ensuring complete academic integrity.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-blockchain-softPeach p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Zap className="h-12 w-12 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-2">Instant Verification</h3>
              <p className="text-blockchain-medium">
                Verify certificates in seconds with a simple QR code scan or certificate ID, saving time and resources.
              </p>
            </div>

            <div className="bg-gradient-to-br from-white to-blockchain-softPurple p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <FileCheck className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-2">Permanent Records</h3>
              <p className="text-blockchain-medium">
                Your academic achievements are permanently stored on the blockchain, accessible anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="page-section">
        <div className="blockchain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blockchain-dark mb-3">For Everyone in Education</h2>
            <p className="text-blockchain-medium max-w-2xl mx-auto">
              CertChain serves the needs of all educational stakeholders with tailored features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-blockchain-blue">
              <BookOpen className="h-12 w-12 text-blockchain-blue mb-4" />
              <h3 className="text-xl font-bold mb-3">For Students</h3>
              <ul className="space-y-2 text-blockchain-medium">
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Receive tamper-proof certificates</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Share credentials securely with employers</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Request certificates from institutions</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register">Register as Student</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-blockchain-green">
              <Globe className="h-12 w-12 text-blockchain-green mb-4" />
              <h3 className="text-xl font-bold mb-3">For Institutions</h3>
              <ul className="space-y-2 text-blockchain-medium">
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Issue blockchain-secured certificates</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Eliminate certificate fraud</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Streamline certificate management</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register">Register as Institution</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-amber-400">
              <User className="h-12 w-12 text-amber-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">For Employers</h3>
              <ul className="space-y-2 text-blockchain-medium">
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Instantly verify candidate credentials</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Ensure authenticity of qualifications</span>
                </li>
                <li className="flex items-start">
                  <BadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Streamline recruitment processes</span>
                </li>
              </ul>
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register">Register as Employer</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="page-section bg-blockchain-blue bg-opacity-5">
        <div className="blockchain-container">
          <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-3xl mx-auto border border-blockchain-blue border-opacity-20">
            <h2 className="text-3xl font-bold text-blockchain-dark mb-4">Ready to Get Started?</h2>
            <p className="text-blockchain-medium mb-6">
              Join CertChain today and transform how you manage and verify academic credentials.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/register">Create Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
