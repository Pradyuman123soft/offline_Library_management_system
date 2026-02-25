import type { Member } from "../types/member.types";
import { dbPromise } from "../../../lib/db";

// ✅ Get All Members (Exclude Soft Deleted)
export const getMembers = async (): Promise<Member[]> => {
  const db = await dbPromise;
  const all = await db.getAll("members");

  return all.filter((m) => !m.isDeleted);
};

// ✅ Get Single Member
export const getMemberById = async (
  id: string
): Promise<Member | undefined> => {
  const db = await dbPromise;
  return await db.get("members", id);
};

// ✅ Add Member
export const addMember = async (member: Member): Promise<void> => {
  const db = await dbPromise;

  const now = Date.now();

  const memberWithMeta: Member = {
    ...member,
    createdAt: member.createdAt ?? now,
    updatedAt: new Date().toISOString(),
    syncStatus: "pending",
    isDeleted: false,
  };

  await db.put("members", memberWithMeta);

  await db.add("syncQueue", {
    type: "CREATE",
    payload: memberWithMeta,
  });
};

// ✅ Update Member
export const updateMember = async (updated: Member): Promise<void> => {
  const db = await dbPromise;

  const updatedWithMeta: Member = {
    ...updated,
    updatedAt: new Date().toISOString(),
    syncStatus: "pending",
  };

  await db.put("members", updatedWithMeta);

  await db.add("syncQueue", {
    type: "UPDATE",
    payload: updatedWithMeta,
  });
};

// ✅ Soft Delete Member (IMPORTANT 🔥)
export const deleteMember = async (id: string): Promise<void> => {
  const db = await dbPromise;

  const existing = await db.get("members", id);
  if (!existing) return;

  const softDeleted: Member = {
    ...existing,
    isDeleted: true,
    updatedAt: new Date().toISOString(),
    syncStatus: "pending",
  };

  await db.put("members", softDeleted);

  await db.add("syncQueue", {
    type: "DELETE",
    payload: { id },
  });
};