import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Truck, Clock, DollarSign, Shield, ArrowLeft, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";

const ContractDetails = () => {
  const navigate = useNavigate();
  const [bidAmount, setBidAmount] = useState("");
  const [message, setMessage] = useState("");

  // Mock contract data (in real app, this would come from URL params or API)
  const contract = {
    id: "C001",
    productType: "Electronics",
    weight: 3.5,
    pickupLocation: "Mumbai, Maharashtra",
    deliveryLocation: "Bangalore, Karnataka",
    pickupDate: "2024-01-15",
    deliveryDate: "2024-01-17",
    vehicleType: "10 Wheeler",
    estimatedKms: 840,
    insuranceRequired: true,
    company: "Tech Solutions Ltd",
    companyRating: 4.5,
    postedDate: "2024-01-10",
    bidsCount: 12,
    status: "Open",
    description: "Urgent shipment of electronic components from our Mumbai warehouse to Bangalore distribution center. Requires careful handling and temperature-controlled transport.",
    requirements: [
      "Vehicle must be in good condition with valid insurance",
      "Driver should have at least 5 years experience",
      "GPS tracking mandatory",
      "Regular updates during transit required"
    ],
    companyDetails: {
      establishedYear: 2015,
      totalContracts: 245,
      averageRating: 4.5,
      location: "Mumbai, Maharashtra"
    }
  };

  const handlePlaceBid = () => {
    console.log("Placing bid:", { amount: bidAmount, message });
    // This would integrate with Supabase for actual functionality
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => navigate('/browse-opportunities')}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Opportunities
            </Button>

            {/* Contract Header */}
            <Card className="p-6 mb-6 shadow-card">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-2xl font-bold text-foreground">Contract #{contract.id}</h1>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {contract.status}
                    </Badge>
                    {contract.insuranceRequired && (
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        <Shield className="w-3 h-3 mr-1" />
                        Insured
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg font-semibold text-foreground">{contract.company}</h2>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{contract.companyRating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{contract.description}</p>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Product</p>
                        <p className="font-medium">{contract.productType}</p>
                        <p className="text-sm text-muted-foreground">{contract.weight}T</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Route</p>
                        <p className="font-medium text-sm">{contract.pickupLocation}</p>
                        <p className="font-medium text-sm">→ {contract.deliveryLocation}</p>
                        <p className="text-xs text-muted-foreground">{contract.estimatedKms} km</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Schedule</p>
                        <p className="font-medium text-sm">Pickup: {contract.pickupDate}</p>
                        <p className="font-medium text-sm">Delivery: {contract.deliveryDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Vehicle</p>
                        <p className="font-medium">{contract.vehicleType}</p>
                        <p className="text-xs text-muted-foreground">{contract.bidsCount} bids</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:min-w-[200px]">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <DollarSign className="w-4 h-4 mr-2" />
                        Place Bid
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Place Your Bid</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="bidAmount">Your Bid Amount (₹)</Label>
                          <Input
                            id="bidAmount"
                            placeholder="Enter your bid amount"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            placeholder="Add any additional information..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                          />
                        </div>
                        <Button onClick={handlePlaceBid} className="w-full">
                          Submit Bid
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          *Requires Supabase integration for actual functionality
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>

            {/* Requirements */}
            <Card className="p-6 mb-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Requirements</h3>
              <ul className="space-y-2">
                {contract.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Company Information */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Company Information</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Established</p>
                  <p className="font-medium">{contract.companyDetails.establishedYear}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Contracts</p>
                  <p className="font-medium">{contract.companyDetails.totalContracts}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="font-medium">{contract.companyDetails.averageRating}/5</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{contract.companyDetails.location}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractDetails;