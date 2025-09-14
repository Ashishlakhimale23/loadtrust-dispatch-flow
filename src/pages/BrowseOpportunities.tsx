import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Package, Truck, Clock, DollarSign, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const BrowseOpportunities = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    location: "",
    vehicleType: "",
    sortBy: "latest"
  });

  // Mock contract data
  const contracts = [
    {
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
      status: "Open"
    },
    {
      id: "C002",
      productType: "Furniture",
      weight: 8.0,
      pickupLocation: "Delhi, Delhi",
      deliveryLocation: "Jaipur, Rajasthan",
      pickupDate: "2024-01-20",
      deliveryDate: "2024-01-21",
      vehicleType: "12 Wheeler",
      estimatedKms: 280,
      insuranceRequired: false,
      company: "Home Decor Inc",
      companyRating: 4.2,
      postedDate: "2024-01-12",
      bidsCount: 8,
      status: "Open"
    },
    {
      id: "C003",
      productType: "Food Items",
      weight: 5.2,
      pickupLocation: "Chennai, Tamil Nadu",
      deliveryLocation: "Hyderabad, Telangana",
      pickupDate: "2024-01-18",
      deliveryDate: "2024-01-19",
      vehicleType: "6 Wheeler",
      estimatedKms: 625,
      insuranceRequired: true,
      company: "Fresh Foods Corp",
      companyRating: 4.8,
      postedDate: "2024-01-11",
      bidsCount: 15,
      status: "Open"
    }
  ];

  const handleBid = (contractId: string) => {
    console.log("Bidding on contract:", contractId);
    // Handle bidding logic
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Browse Opportunities</h1>
              <p className="text-lg text-muted-foreground">
                Find transportation contracts that match your vehicle and route preferences
              </p>
            </div>

            {/* Filters */}
            <Card className="p-6 mb-8 shadow-card">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Location</label>
                  <Input
                    placeholder="Enter city or state"
                    value={filters.location}
                    onChange={(e) => setFilters({...filters, location: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Vehicle Type</label>
                  <Select onValueChange={(value) => setFilters({...filters, vehicleType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="All vehicles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="4-wheeler">4 Wheeler</SelectItem>
                      <SelectItem value="6-wheeler">6 Wheeler</SelectItem>
                      <SelectItem value="10-wheeler">10 Wheeler</SelectItem>
                      <SelectItem value="12-wheeler">12 Wheeler</SelectItem>
                      <SelectItem value="trailer">Trailer Truck</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Sort By</label>
                  <Select onValueChange={(value) => setFilters({...filters, sortBy: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Latest" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Latest Posted</SelectItem>
                      <SelectItem value="pickup-date">Pickup Date</SelectItem>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="weight">Weight</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Apply Filters
                  </Button>
                </div>
              </div>
            </Card>

            {/* Contracts List */}
            <div className="space-y-6">
              {contracts.map((contract) => (
                <Card key={contract.id} className="p-6 shadow-card hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-foreground">Contract #{contract.id}</h3>
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
                          <p className="text-muted-foreground">{contract.company} • ★ {contract.companyRating}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Product</p>
                            <p className="font-medium">{contract.productType}</p>
                            <p className="text-sm text-muted-foreground">{contract.weight}T</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Route</p>
                            <p className="font-medium text-sm">{contract.pickupLocation}</p>
                            <p className="font-medium text-sm">→ {contract.deliveryLocation}</p>
                            <p className="text-xs text-muted-foreground">{contract.estimatedKms} km</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Schedule</p>
                            <p className="font-medium text-sm">Pickup: {contract.pickupDate}</p>
                            <p className="font-medium text-sm">Delivery: {contract.deliveryDate}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-sm text-muted-foreground">Vehicle</p>
                            <p className="font-medium">{contract.vehicleType}</p>
                            <p className="text-xs text-muted-foreground">{contract.bidsCount} bids</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:min-w-[160px]">
                      <Button 
                        onClick={() => handleBid(contract.id)}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Place Bid
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => navigate('/contract-details')}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Contracts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseOpportunities;