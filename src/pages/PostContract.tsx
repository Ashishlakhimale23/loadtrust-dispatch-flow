import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, MapPin, Package, Truck, Shield, Clock } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";

const PostContract = () => {
  const [formData, setFormData] = useState({
    productType: "",
    weight: "",
    pickupLocation: "",
    deliveryLocation: "",
    pickupDate: "",
    deliveryDate: "",
    vehicleType: "",
    estimatedKms: "",
    insuranceRequired: false,
    insuranceType: "",
    specialInstructions: ""
  });

  // Calculate insurance cost based on type
  const calculateInsuranceCost = () => {
    if (!formData.insuranceRequired || !formData.insuranceType) return 0;
    
    switch (formData.insuranceType) {
      case "trip":
        // Calculate based on weight: ₹500 per ton
        return parseFloat(formData.weight || "0") * 500;
      case "monthly":
        return 5000; // Fixed monthly rate
      case "yearly":
        return 50000; // Fixed yearly rate
      default:
        return 0;
    }
  };

  const insuranceCost = calculateInsuranceCost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contract posted:", formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">Post a Contract</h1>
              <p className="text-lg text-muted-foreground">
                Share your transportation requirements and receive competitive bids from verified transporters
              </p>
            </div>

            <Card className="p-8 shadow-card">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Product Information */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Product Information</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="productType">Product Type</Label>
                      <Input
                        id="productType"
                        placeholder="e.g., Electronics, Furniture, Food Items"
                        value={formData.productType}
                        onChange={(e) => setFormData({...formData, productType: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (in tons)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="e.g., 5"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Location & Schedule */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Location & Schedule</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="pickupLocation">Pickup Location</Label>
                      <Input
                        id="pickupLocation"
                        placeholder="City, State"
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({...formData, pickupLocation: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deliveryLocation">Delivery Location</Label>
                      <Input
                        id="deliveryLocation"
                        placeholder="City, State"
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData({...formData, deliveryLocation: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="pickupDate">Pickup Date</Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={formData.pickupDate}
                        onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Required Delivery Date</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Vehicle Requirements */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Vehicle Requirements</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleType">Vehicle Type</Label>
                      <Select onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="4-wheeler">4 Wheeler</SelectItem>
                          <SelectItem value="6-wheeler">6 Wheeler</SelectItem>
                          <SelectItem value="10-wheeler">10 Wheeler</SelectItem>
                          <SelectItem value="12-wheeler">12 Wheeler</SelectItem>
                          <SelectItem value="trailer">Trailer Truck</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="estimatedKms">Estimated Distance (km)</Label>
                      <Input
                        id="estimatedKms"
                        type="number"
                        placeholder="e.g., 500"
                        value={formData.estimatedKms}
                        onChange={(e) => setFormData({...formData, estimatedKms: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold text-foreground">Additional Options</h2>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="insurance"
                      checked={formData.insuranceRequired}
                      onCheckedChange={(checked) => setFormData({...formData, insuranceRequired: checked as boolean, insuranceType: ""})}
                    />
                    <Label htmlFor="insurance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Insurance Required
                    </Label>
                  </div>

                  {/* Insurance Type Selection - Only show when insurance is required */}
                  {formData.insuranceRequired && (
                    <div className="space-y-4 pl-6 border-l-2 border-border">
                      <div className="space-y-2">
                        <Label htmlFor="insuranceType">Insurance Type</Label>
                        <Select 
                          value={formData.insuranceType} 
                          onValueChange={(value) => setFormData({...formData, insuranceType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select insurance type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="trip">Just This Trip</SelectItem>
                            <SelectItem value="monthly">Monthly Plan</SelectItem>
                            <SelectItem value="yearly">Yearly Plan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Insurance Cost Display */}
                      {formData.insuranceType && (
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Insurance Cost:</span>
                            <span className="font-semibold text-primary">₹{insuranceCost.toLocaleString()}</span>
                          </div>
                          {formData.insuranceType === "trip" && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Calculated at ₹500 per ton ({formData.weight || 0} tons)
                            </p>
                          )}
                          {formData.insuranceType === "monthly" && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Fixed monthly rate
                            </p>
                          )}
                          {formData.insuranceType === "yearly" && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Fixed yearly rate (Save 17% compared to monthly)
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      placeholder="Any special handling requirements, loading/unloading instructions, etc."
                      rows={3}
                      value={formData.specialInstructions}
                      onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                  <Button type="button" variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                  <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                    Post Contract
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContract;