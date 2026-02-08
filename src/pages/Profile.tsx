import { useAuth, Bid } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Truck, Building2, CheckCircle, XCircle, Clock, LogOut } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  declined: "bg-red-100 text-red-800",
};

const Profile = () => {
  const { user, logout, contracts, bids, updateBidStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/sign-in");
  }, [user, navigate]);

  if (!user) return null;

  const isDriver = user.role === "driver";
  const isContractor = user.role === "contractor";

  const myBids = bids.filter((b) => b.driverId === user.id);
  const myContracts = contracts.filter((c) => c.contractorId === user.id);

  const getBidsForContract = (contractId: string) => bids.filter((b) => b.contractId === contractId);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6 max-w-5xl">
          {/* Profile Header */}
          <Card className="p-6 mb-8 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  {isDriver ? <Truck className="w-8 h-8 text-primary" /> : <Building2 className="w-8 h-8 text-primary" />}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{user.fullName}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary">{isDriver ? "Driver / Truck Owner" : "Contractor / Company"}</Badge>
                    {user.companyName && <span className="text-sm text-muted-foreground">• {user.companyName}</span>}
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => { logout(); navigate("/"); }}>
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div><span className="text-muted-foreground">Contact:</span> <span className="font-medium">{user.contactNumber || "—"}</span></div>
              <div><span className="text-muted-foreground">Role:</span> <span className="font-medium capitalize">{user.role}</span></div>
              {user.companyName && <div><span className="text-muted-foreground">Company:</span> <span className="font-medium">{user.companyName}</span></div>}
            </div>
          </Card>

          {/* Driver View: My Bids */}
          {isDriver && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Placed Bids</h2>
              {myBids.length === 0 ? (
                <Card className="p-8 text-center shadow-card">
                  <p className="text-muted-foreground mb-4">You haven't placed any bids yet.</p>
                  <Button onClick={() => navigate("/browse-opportunities")}>Browse Opportunities</Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {myBids.map((bid) => {
                    const contract = contracts.find((c) => c.id === bid.contractId);
                    return (
                      <Card key={bid.id} className="p-5 shadow-card">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">Contract #{bid.contractId}</h3>
                              <Badge className={statusColors[bid.status]}>{bid.status}</Badge>
                            </div>
                            {contract && (
                              <p className="text-sm text-muted-foreground">
                                {contract.pickupLocation} → {contract.deliveryLocation} • {contract.productType}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">₹{bid.bidAmount.toLocaleString()}</p>
                            <p className="text-xs text-muted-foreground">{bid.vehicleType} • {bid.createdAt}</p>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Contractor View: My Contracts + Bids */}
          {isContractor && (
            <div>
              <h2 className="text-xl font-semibold mb-4">My Contracts</h2>
              {myContracts.length === 0 ? (
                <Card className="p-8 text-center shadow-card">
                  <p className="text-muted-foreground mb-4">You haven't posted any contracts yet.</p>
                  <Button onClick={() => navigate("/post-contract")}>Post a Contract</Button>
                </Card>
              ) : (
                <div className="space-y-6">
                  {myContracts.map((contract) => {
                    const contractBids = getBidsForContract(contract.id);
                    return (
                      <Card key={contract.id} className="p-5 shadow-card">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">Contract #{contract.id} — {contract.productType}</h3>
                            <p className="text-sm text-muted-foreground">
                              {contract.pickupLocation} → {contract.deliveryLocation} • {contract.weight}T • {contract.estimatedKms} km
                            </p>
                          </div>
                          <Badge variant="secondary">{contract.status}</Badge>
                        </div>

                        {/* Bids on this contract */}
                        <div className="border-t border-border pt-3">
                          <h4 className="text-sm font-medium text-muted-foreground mb-3">
                            Bids ({contractBids.length})
                          </h4>
                          {contractBids.length === 0 ? (
                            <p className="text-sm text-muted-foreground italic">No bids yet</p>
                          ) : (
                            <div className="space-y-3">
                              {contractBids.map((bid) => (
                                <BidRow key={bid.id} bid={bid} onApprove={() => updateBidStatus(bid.id, "approved")} onDecline={() => updateBidStatus(bid.id, "declined")} />
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BidRow = ({ bid, onApprove, onDecline }: { bid: Bid; onApprove: () => void; onDecline: () => void }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-muted/30 rounded-lg">
    <div className="flex-1">
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium text-sm">{bid.driverName}</span>
        <Badge className={statusColors[bid.status]}>{bid.status}</Badge>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {bid.vehicleType} • {bid.isInsured ? "Insured" : "Not Insured"} • {bid.createdAt}
      </p>
      {bid.notes && <p className="text-xs text-muted-foreground mt-1">"{bid.notes}"</p>}
    </div>
    <div className="flex items-center gap-3">
      <span className="font-bold">₹{bid.bidAmount.toLocaleString()}</span>
      {bid.status === "pending" && (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50" onClick={onApprove}>
            <CheckCircle className="w-4 h-4 mr-1" /> Approve
          </Button>
          <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50" onClick={onDecline}>
            <XCircle className="w-4 h-4 mr-1" /> Decline
          </Button>
        </div>
      )}
    </div>
  </div>
);

export default Profile;
