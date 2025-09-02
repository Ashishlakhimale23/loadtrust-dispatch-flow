import { Button } from "@/components/ui/button";
import { Truck, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-gradient-primary rounded-lg p-2">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">TransportHub</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className={`transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Home
            </Link>
            <Link 
              to="/post-contract" 
              className={`transition-colors ${location.pathname === '/post-contract' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Post Contract
            </Link>
            <Link 
              to="/browse-opportunities" 
              className={`transition-colors ${location.pathname === '/browse-opportunities' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              Browse Opportunities
            </Link>
          </div>
          
          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" className="text-muted-foreground hover:text-primary">
              Sign In
            </Button>
            <Button className="bg-gradient-primary text-white hover:shadow-lg" asChild>
              <Link to="/browse-opportunities">Get Started</Link>
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className={`transition-colors ${location.pathname === '/' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/post-contract" 
                className={`transition-colors ${location.pathname === '/post-contract' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Post Contract
              </Link>
              <Link 
                to="/browse-opportunities" 
                className={`transition-colors ${location.pathname === '/browse-opportunities' ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Opportunities
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" className="justify-start">
                  Sign In
                </Button>
                <Button className="bg-gradient-primary text-white justify-start" asChild>
                  <Link to="/browse-opportunities">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;