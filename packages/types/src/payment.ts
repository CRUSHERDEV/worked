import type { UUID, Timestamp, Currency } from "./common";

export enum PaymentMethod {
  CARD = "card",
  MOBILE_MONEY = "mobile_money",
  BANK_TRANSFER = "bank_transfer",
  CASH_ON_DELIVERY = "cash_on_delivery",
  WALLET = "wallet",
  LINKED_COIN = "linked_coin",
}

export enum PaymentProvider {
  STRIPE = "stripe",
  PAYSTACK = "paystack",
  FLUTTERWAVE = "flutterwave",
  INTERNAL = "internal",
}

export enum TransactionType {
  PURCHASE = "purchase",
  REFUND = "refund",
  PAYOUT = "payout",
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  REWARD = "reward",
  TRANSFER = "transfer",
  FEE = "fee",
}

export interface Payment {
  id: UUID;
  orderId?: UUID;
  userId: UUID;
  amount: number;
  currency: Currency;
  method: PaymentMethod;
  provider: PaymentProvider;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled" | "refunded";
  metadata: PaymentMetadata;
  providerTransactionId?: string;
  failureReason?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  completedAt?: Timestamp;
}

export interface PaymentMetadata {
  description?: string;
  customerEmail?: string;
  customerPhone?: string;
  ipAddress?: string;
  userAgent?: string;
  [key: string]: unknown;
}

export interface Wallet {
  id: UUID;
  userId: UUID;
  fiatBalance: number;
  linkedCoinBalance: number;
  currency: Currency;
  status: "active" | "suspended" | "closed";
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Transaction {
  id: UUID;
  walletId: UUID;
  type: TransactionType;
  amount: number;
  currency: Currency;
  balanceBefore: number;
  balanceAfter: number;
  reference: string;
  description: string;
  metadata?: Record<string, unknown>;
  status: "pending" | "completed" | "failed";
  createdAt: Timestamp;
}

export interface Payout {
  id: UUID;
  vendorId: UUID;
  amount: number;
  currency: Currency;
  status: "pending" | "processing" | "completed" | "failed";
  bankAccount: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankCode: string;
  };
  reference: string;
  providerReference?: string;
  failureReason?: string;
  requestedAt: Timestamp;
  processedAt?: Timestamp;
  completedAt?: Timestamp;
}
