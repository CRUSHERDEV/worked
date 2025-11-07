import type { UUID, Timestamp } from "./common";

export enum RewardType {
  PURCHASE = "purchase",
  REFERRAL = "referral",
  REVIEW = "review",
  SIGNUP = "signup",
  MILESTONE = "milestone",
  PROMOTION = "promotion",
}

export enum RewardStatus {
  PENDING = "pending",
  VESTING = "vesting",
  CLAIMABLE = "claimable",
  CLAIMED = "claimed",
  EXPIRED = "expired",
  CANCELLED = "cancelled",
}

export interface Reward {
  id: UUID;
  userId: UUID;
  type: RewardType;
  amount: number;
  status: RewardStatus;
  metadata: RewardMetadata;
  vestingSchedule?: VestingSchedule;
  claimedAt?: Timestamp;
  expiresAt?: Timestamp;
  createdAt: Timestamp;
}

export interface RewardMetadata {
  description: string;
  orderId?: UUID;
  referralId?: UUID;
  reviewId?: UUID;
  [key: string]: unknown;
}

export interface VestingSchedule {
  totalAmount: number;
  vestedAmount: number;
  remainingAmount: number;
  startDate: Timestamp;
  endDate: Timestamp;
  cliffDate?: Timestamp;
  milestones?: {
    date: Timestamp;
    amount: number;
    claimed: boolean;
  }[];
}

export interface Referral {
  id: UUID;
  referrerId: UUID;
  refereeId?: UUID;
  code: string;
  status: "pending" | "active" | "completed" | "expired";
  rewardAmount: number;
  conversions: {
    signups: number;
    purchases: number;
    totalValue: number;
  };
  expiresAt?: Timestamp;
  createdAt: Timestamp;
}

export interface LinkedCoinAccount {
  userId: UUID;
  balance: number;
  totalEarned: number;
  totalSpent: number;
  totalStaked?: number;
  stakingRewards?: number;
  tier?: "bronze" | "silver" | "gold" | "platinum";
  lastActivityAt?: Timestamp;
  createdAt: Timestamp;
}

export interface StakingPool {
  id: UUID;
  userId: UUID;
  amount: number;
  duration: number; // in days
  apy: number;
  status: "active" | "completed" | "cancelled";
  rewardsEarned: number;
  startDate: Timestamp;
  endDate: Timestamp;
  earlyWithdrawalPenalty?: number;
}

export interface GovernanceProposal {
  id: UUID;
  proposerId: UUID;
  title: string;
  description: string;
  category: "platform" | "rewards" | "fees" | "features" | "other";
  status: "draft" | "active" | "passed" | "rejected" | "executed";
  voting: {
    startDate: Timestamp;
    endDate: Timestamp;
    quorum: number;
    votesFor: number;
    votesAgainst: number;
    votesAbstain: number;
    participationRate: number;
  };
  createdAt: Timestamp;
}
