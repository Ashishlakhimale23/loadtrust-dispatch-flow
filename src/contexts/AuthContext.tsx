import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "contractor" | "driver";

export interface User {
  id: string;
  email: string;
  fullName: string;
  companyName?: string;
  contactNumber: string;
  role: UserRole;
}

export interface Bid {
  id: string;
  contractId: string;
  driverId: string;
  driverName: string;
  vehicleType: string;
  isInsured: boolean;
  bidAmount: number;
  notes: string;
  status: "pending" | "approved" | "declined";
  createdAt: string;
}

export interface Contract {
  id: string;
  contractorId: string;
  productType: string;
  weight: number;
  pickupLocation: string;
  deliveryLocation: string;
  pickupDate: string;
  deliveryDate: string;
  vehicleType: string;
  estimatedKms: number;
  insuranceRequired: boolean;
  company: string;
  status: "Open" | "Assigned" | "Completed";
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (data: Omit<User, "id"> & { password: string }) => { success: boolean; error?: string };
  logout: () => void;
  contracts: Contract[];
  bids: Bid[];
  addContract: (contract: Omit<Contract, "id" | "contractorId" | "createdAt" | "status">) => void;
  addBid: (bid: Omit<Bid, "id" | "driverId" | "driverName" | "status" | "createdAt">) => void;
  updateBidStatus: (bidId: string, status: "approved" | "declined") => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "bulkway_users";
const CURRENT_USER_KEY = "bulkway_current_user";
const CONTRACTS_KEY = "bulkway_contracts";
const BIDS_KEY = "bulkway_bids";

// Seed some demo contracts
const seedContracts: Contract[] = [
  {
    id: "C001",
    contractorId: "demo-contractor",
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
    status: "Open",
    createdAt: "2024-01-10",
  },
  {
    id: "C002",
    contractorId: "demo-contractor",
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
    status: "Open",
    createdAt: "2024-01-12",
  },
  {
    id: "C003",
    contractorId: "demo-contractor",
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
    status: "Open",
    createdAt: "2024-01-11",
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [contracts, setContracts] = useState<Contract[]>(() => {
    const saved = localStorage.getItem(CONTRACTS_KEY);
    return saved ? JSON.parse(saved) : seedContracts;
  });

  const [bids, setBids] = useState<Bid[]>(() => {
    const saved = localStorage.getItem(BIDS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
  }, [user]);

  useEffect(() => {
    localStorage.setItem(CONTRACTS_KEY, JSON.stringify(contracts));
  }, [contracts]);

  useEffect(() => {
    localStorage.setItem(BIDS_KEY, JSON.stringify(bids));
  }, [bids]);

  const getUsers = (): (User & { password: string })[] => {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  };

  const login = (email: string, password: string) => {
    const users = getUsers();
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { success: false, error: "Invalid email or password" };
    const { password: _, ...userData } = found;
    setUser(userData);
    return { success: true };
  };

  const signup = (data: Omit<User, "id"> & { password: string }) => {
    const users = getUsers();
    if (users.find((u) => u.email === data.email)) {
      return { success: false, error: "Email already registered" };
    }
    const newUser = { ...data, id: crypto.randomUUID() };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    return { success: true };
  };

  const logout = () => setUser(null);

  const addContract = (contract: Omit<Contract, "id" | "contractorId" | "createdAt" | "status">) => {
    if (!user) return;
    const newContract: Contract = {
      ...contract,
      id: `C${String(contracts.length + 1).padStart(3, "0")}`,
      contractorId: user.id,
      company: user.companyName || user.fullName,
      status: "Open",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setContracts((prev) => [...prev, newContract]);
  };

  const addBid = (bid: Omit<Bid, "id" | "driverId" | "driverName" | "status" | "createdAt">) => {
    if (!user) return;
    const newBid: Bid = {
      ...bid,
      id: `B${String(bids.length + 1).padStart(3, "0")}`,
      driverId: user.id,
      driverName: user.fullName,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setBids((prev) => [...prev, newBid]);
  };

  const updateBidStatus = (bidId: string, status: "approved" | "declined") => {
    setBids((prev) => prev.map((b) => (b.id === bidId ? { ...b, status } : b)));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, contracts, bids, addContract, addBid, updateBidStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
