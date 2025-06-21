"use client";

import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-aavatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const isMobile = useIsMobile();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  };

  if (isPending || !data?.user) {
    return null; // or return <Skeleton /> if you want a loader
  }

  const user = data.user;

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
            {user.image ? (
              <Avatar>
                <AvatarImage src={user.image} />
              </Avatar>
            ) : (
              <GeneratedAvatar
                seed={user.name}
                variant="botttsNeutral"
                className="size-9 mr-3"
              />
            )}
            <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
              <p className="text-sm truncate w-full">{user.name}</p>
              <p className="text-xs truncate w-full">{user.email}</p>
            </div>
            <ChevronDownIcon className="size-4 shrink-0" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{user.name}</DrawerTitle>
            <DrawerDescription>{user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              variant="outline"
              onClick={() => router.push("/billing")}
              className="flex items-center justify-start gap-2"
            >
              <CreditCardIcon className="size-4 text-black" />
              Billing
            </Button>
            <Button
              variant="outline"
              onClick={onLogout}
              className="flex items-center justify-start gap-2"
            >
              <LogOutIcon className="size-4 text-black" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden gap-x-2">
          {user.image ? (
            <Avatar>
              <AvatarImage src={user.image} />
            </Avatar>
          ) : (
            <GeneratedAvatar
              seed={user.name}
              variant="botttsNeutral"
              className="size-9 mr-3"
            />
          )}
          <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">{user.name}</p>
            <p className="text-xs truncate w-full">{user.email}</p>
          </div>
          <ChevronDownIcon className="size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate">{user.name}</span>
            <span className="text-sm font-normal text-muted-foreground truncate">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer flex items-center justify-between"
          onClick={() => router.push("/billing")}
        >
          Billing
          <CreditCardIcon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onLogout}
          className="cursor-pointer flex items-center justify-between"
        >
          Log Out
          <LogOutIcon className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
