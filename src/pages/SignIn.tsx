import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Building2, Truck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    companyName: "",
    contactNumber: ""
  });

  // Redirect if already logged in
  if (user) {
    navigate("/profile");
    return null;
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (userType: 'company' | 'truck-owner') => {
    if (!formData.email || !formData.password) {
      toast({ title: "Error", description: "Email and password are required", variant: "destructive" });
      return;
    }

    if (isLogin) {
      const result = login(formData.email, formData.password);
      if (result.success) {
        toast({ title: "Welcome back!" });
        navigate("/profile");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast({ title: "Error", description: "Passwords don't match", variant: "destructive" });
        return;
      }
      if (!formData.fullName) {
        toast({ title: "Error", description: "Name is required", variant: "destructive" });
        return;
      }
      const result = signup({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        companyName: formData.companyName,
        contactNumber: formData.contactNumber,
        role: userType === "company" ? "contractor" : "driver",
      });
      if (result.success) {
        toast({ title: "Account created!" });
        navigate("/profile");
      } else {
        toast({ title: "Error", description: result.error, variant: "destructive" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <Button variant="outline" onClick={() => navigate('/')} className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Button>

            <Card className="p-6 shadow-card">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-muted-foreground">
                  {isLogin ? 'Sign in to your account' : 'Choose your account type to get started'}
                </p>
              </div>

              <Tabs defaultValue="company" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="company" className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Company
                  </TabsTrigger>
                  <TabsTrigger value="truck-owner" className="flex items-center gap-2">
                    <Truck className="w-4 h-4" /> Truck Owner
                  </TabsTrigger>
                </TabsList>

                {(["company", "truck-owner"] as const).map((type) => (
                  <TabsContent key={type} value={type} className="space-y-4 mt-6">
                    <div className="space-y-4">
                      {!isLogin && (
                        <>
                          {type === "company" && (
                            <div className="space-y-2">
                              <Label>Company Name</Label>
                              <Input placeholder="Enter company name" value={formData.companyName} onChange={(e) => handleInputChange('companyName', e.target.value)} />
                            </div>
                          )}
                          <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input placeholder="Enter full name" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Contact Number</Label>
                            <Input placeholder="Enter contact number" value={formData.contactNumber} onChange={(e) => handleInputChange('contactNumber', e.target.value)} />
                          </div>
                        </>
                      )}
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="Enter email address" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Password</Label>
                        <Input type="password" placeholder="Enter password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} />
                      </div>
                      {!isLogin && (
                        <div className="space-y-2">
                          <Label>Confirm Password</Label>
                          <Input type="password" placeholder="Confirm password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} />
                        </div>
                      )}
                      <Button onClick={() => handleSubmit(type)} className="w-full bg-primary hover:bg-primary/90">
                        {isLogin ? 'Sign In' : `Create ${type === 'company' ? 'Company' : 'Truck Owner'} Account`}
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>

              <Separator className="my-6" />
              <div className="text-center">
                <p className="text-muted-foreground">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="p-0 h-auto font-medium">
                  {isLogin ? 'Create account' : 'Sign in instead'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
