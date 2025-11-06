import type { UUID, Timestamp, Address } from "./common";

export enum ShipmentStatus {
  PENDING = "pending",
  PICKED_UP = "picked_up",
  IN_TRANSIT = "in_transit",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  FAILED_DELIVERY = "failed_delivery",
  RETURNED = "returned",
  CANCELLED = "cancelled",
}

export enum CarrierType {
  STANDARD = "standard",
  EXPRESS = "express",
  SAME_DAY = "same_day",
  PICKUP_POINT = "pickup_point",
}

export interface Shipment {
  id: UUID;
  orderId: UUID;
  trackingNumber: string;
  carrierId: UUID;
  status: ShipmentStatus;
  origin: Address;
  destination: Address;
  pickupDate?: Timestamp;
  estimatedDeliveryDate: Timestamp;
  actualDeliveryDate?: Timestamp;
  events: ShipmentEvent[];
  dimensions?: {
    weight: number;
    length: number;
    width: number;
    height: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ShipmentEvent {
  id: UUID;
  shipmentId: UUID;
  status: ShipmentStatus;
  description: string;
  location?: {
    city: string;
    state: string;
    country: string;
  };
  timestamp: Timestamp;
  metadata?: Record<string, unknown>;
}

export interface Carrier {
  id: UUID;
  name: string;
  code: string;
  type: CarrierType;
  status: "active" | "inactive";
  coverage: {
    countries: string[];
    regions: string[];
  };
  pricing: CarrierPricing;
  sla: {
    pickupTime: number; // hours
    deliveryTime: number; // hours
  };
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
}

export interface CarrierPricing {
  baseRate: number;
  perKgRate: number;
  perKmRate?: number;
  minCharge: number;
  maxCharge?: number;
  zones?: {
    zone: string;
    rate: number;
  }[];
}

export interface DeliveryPartner {
  id: UUID;
  userId: UUID;
  name: string;
  phone: string;
  vehicleType: "motorcycle" | "car" | "van" | "truck" | "bicycle";
  vehicleNumber?: string;
  status: "active" | "inactive" | "on_delivery";
  rating: number;
  totalDeliveries: number;
  currentLocation?: {
    latitude: number;
    longitude: number;
    updatedAt: Timestamp;
  };
  verificationStatus: "pending" | "verified" | "rejected";
  documents: {
    license?: string;
    vehicleRegistration?: string;
    insurance?: string;
  };
  createdAt: Timestamp;
}

export interface DeliveryManifest {
  id: UUID;
  deliveryPartnerId: UUID;
  shipments: UUID[];
  status: "pending" | "in_progress" | "completed";
  route?: {
    stops: {
      shipmentId: UUID;
      address: Address;
      sequence: number;
      estimatedArrival: Timestamp;
      actualArrival?: Timestamp;
      status: "pending" | "arrived" | "delivered" | "failed";
    }[];
    optimized: boolean;
  };
  createdAt: Timestamp;
  completedAt?: Timestamp;
}

export interface ProofOfDelivery {
  shipmentId: UUID;
  deliveryPartnerId: UUID;
  signature?: string;
  photo?: string;
  recipientName: string;
  notes?: string;
  deliveredAt: Timestamp;
}
