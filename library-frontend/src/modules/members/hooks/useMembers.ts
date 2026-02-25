import { useEffect, useState } from "react";
import * as service from "../services/member.service";
import type { Member } from "../types/member.types";

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    const data = await service.getMembers();
    setMembers(data);
  };

  const createMember = async (member: Member) => {
    await service.addMember(member);
    fetchMembers();
  };

  const removeMember = async (id: string) => {
    await service.deleteMember(id);
    fetchMembers();
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return {
    members,
    createMember,
    removeMember,
    fetchMembers,
  };
};