"use client";
import React, {useState} from 'react';
import Image, {StaticImageData} from 'next/image';
import Link from 'next/link';
import {SignedIn, SignedOut, SignInButton, UserButton} from '@clerk/nextjs';
import {Sheet, SheetContent, SheetTrigger} from '@ultra-market/ui/sheet';
import {Button} from '@ultra-market/ui/button';
import {CalendarIcon, EnvelopeClosedIcon, FaceIcon, GearIcon, PersonIcon, RocketIcon,} from "@radix-ui/react-icons";
import {Input} from "@ultra-market/ui/input";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@ultra-market/ui/command";
import {Menu, Search} from "lucide-react";

interface NavItem {
  children?: React.ReactNode;
  href: string;
  alignRight?: boolean;
}

interface NavbarProps {
  items: NavItem[];
  logo: StaticImageData;
}

const Navbar: React.FC<NavbarProps> = ({items, logo}) => {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav
        className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src={logo} alt="logo" width={250} height={40}/>
        </Link>
        {items.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.children}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5"/>
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image src={logo} alt="logo" width={250} height={40}/>
            </Link>
            {items.map((item, index) => (
              <Link
                href="#"
                key={index}
                className="text-muted-foreground hover:text-foreground"
              >
                {item.children}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              onClick={() => setOpenSearch(true)}
            />
          </div>
        </div>
        <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
          <CommandInput placeholder="Type a command or search..."/>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <CalendarIcon className="mr-2 h-4 w-4"/>
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <FaceIcon className="mr-2 h-4 w-4"/>
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <RocketIcon className="mr-2 h-4 w-4"/>
                <span>Launch</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator/>
            <CommandGroup heading="Settings">
              <CommandItem>
                <PersonIcon className="mr-2 h-4 w-4"/>
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <EnvelopeClosedIcon className="mr-2 h-4 w-4"/>
                <span>Mail</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <GearIcon className="mr-2 h-4 w-4"/>
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        <SignedIn>
          <UserButton/>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            Bejeletkezés
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Navbar;
