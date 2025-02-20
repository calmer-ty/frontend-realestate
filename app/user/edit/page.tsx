"use client";

import UserStatusWrite from "@/src/components/units/userStatus/write";

import { useUserStatus } from "@/src/hooks/useUserStatus";

export default function UserStatusEditPage(): JSX.Element {
  const { userStatus } = useUserStatus();

  return <UserStatusWrite isEdit={true} userStatus={userStatus} />;
}
