import { currentUserRole } from "@/modules/auth/actions";
import Navbar from "@/modules/home/components/Navbar";
import React from "react";

const RootLayout = async ({ children }) => {
  const userRole = await currentUserRole();
  return (
    <main className="flex flex-col min-h-screen max-h-screen">
      <Navbar userRole={userRole} />
      <div className="flex flex-col flex-1 px-4 pb-4">
        <div className="flex flex-col flex-1 px-4 pb-4">
          <div className="-z-10 absolute inset-0 bg-[radial-gradient(#dadde2_1px,transparent_1px)] bg-[size:16px_16px] bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] dark:bg-[size:16px_16px] w-full h-full" />
          {children}
        </div>
      </div>
    </main>
  );
};

export default RootLayout;
