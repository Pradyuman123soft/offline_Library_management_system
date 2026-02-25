export type MemberRole = "Student" | "Teacher" | "Staff";

export type MemberStatus = "Active" | "Inactive" | "Suspended";

export type SyncStatus = "pending" | "synced";

export interface Member {
  id: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  role: MemberRole;
  department?: string;

  joinedDate: string;
  status: MemberStatus;

  // 🔥 NEW FIELDS FOR OFFLINE SYNC
  createdAt: number;
  updatedAt: string;
  syncStatus: SyncStatus;
  isDeleted?: boolean;   // Soft delete support
}


export type MemberFormData = Omit<
  Member,
  "createdAt" | "updatedAt" | "syncStatus" | "isDeleted"
>;