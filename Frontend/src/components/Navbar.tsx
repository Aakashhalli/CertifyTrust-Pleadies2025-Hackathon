
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/store/authSlice";
import { ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="blockchain-container">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <ShieldCheck className="h-8 w-8 text-blockchain-blue" />
            <span className="font-bold text-xl text-blockchain-dark">CertChain</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Role-specific navigation links */}
                {user.role === "institution" && (
                  <>
                    <Link to="/institution/issue" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Issue Certificate</Link>
                    <Link to="/institution/verify" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Verify Certificate</Link>
                    <Link to="/institution/issued" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Issued Credentials</Link>
                    <Link to="/institution/requests" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Requests</Link>
                  </>
                )}

                {user.role === "student" && (
                  <>
                    <Link to="/student/request" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Request Certificate</Link>
                    <Link to="/student/credentials" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">My Credentials</Link>
                  </>
                )}

                {user.role === "employer" && (
                  <Link to="/employer/verify" className="text-blockchain-medium hover:text-blockchain-blue transition-colors">Verify Certificate</Link>
                )}

                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
