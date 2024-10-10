"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogBox } from "@/components/DialogBox";
import React, { useState } from "react";
import { signOut } from "next-auth/react";

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isTwoFactorEnabled: boolean;
};

interface UserButtonType {
  user: User | undefined;
}

export const UserButton = ({ user }: UserButtonType) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const avatarFallBack = (user?.name ?? "Unknown")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <React.Fragment>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="border border-black">
            <AvatarImage src={user?.image ?? ""} />
            <AvatarFallback>{avatarFallBack}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDialog(true)}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogBox
        header="Logout"
        content={
          <React.Fragment>Are you Sure you want to Logout ?</React.Fragment>
        }
        show={showDialog}
        onClose={() => setShowDialog(false)}
        onAction={() => signOut()}
        onActionButtonLabel="Logout"
      />
    </React.Fragment>
  );
};
