import { Button } from "@/components/ui/button";
import { onBoardUser } from "@/modules/auth/actions";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default async function Home() {
  await onBoardUser();
  return (
    <div>
      <UserButton />
    </div>
  );
}
