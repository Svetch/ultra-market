'use client';
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs';
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import { Button } from '@ultra-market/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@ultra-market/ui/command';
import { Input } from '@ultra-market/ui/input';
import { Separator } from '@ultra-market/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ultra-market/ui/sheet';
import { Menu, Minus, Plus, Search, Trash2 } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { FormEvent, useEffect, useState } from 'react';
import { toast } from 'sonner';
import Stripe from 'stripe';
import { Product } from '../../types';
import getStripe from '../../utils/get-stripe';
import { useCartStore } from '../cart';
import { UserDropdownButton } from '../user-button';
interface NavItem {
  children?: React.ReactNode;
  href: string;
  alignRight?: boolean;
}

interface NavbarProps {
  items: NavItem[];
  logo: StaticImageData;
}

const Navbar: React.FC<NavbarProps> = ({ items, logo }) => {
  const [openSearch, setOpenSearch] = useState(false);

  const [cartState, setCartState] = useState<Product[]>([]);

  const formatter = new Intl.NumberFormat('hu-HU', {
    currency: 'HUF',
    style: 'currency',
  });
  const {
    cart,
    open: cartOpen,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateProductQuantity,
    removeOneFromCart,
    totalPrice,
    totalItems,
    emptyCart,
  } = useCartStore();

  useEffect(() => {
    setCartState(cart);
  }, [cart]);

  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();
    const checkoutSession: Stripe.Checkout.Session = await (
      await fetch('/api/checkout_sessions', {
        method: 'POST',
        body: JSON.stringify({ items: cart }),
      })
    ).json();

    if ((checkoutSession as any).statusCode === 500) {
      console.error((checkoutSession as any).message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await getStripe();
    emptyCart();
    const { error } = await stripe!.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: checkoutSession.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      toast('Sikertelen fizetés!', { description: error.message });
      console.warn(error.message);
    }
  };

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Image src={logo} alt="logo" width={250} height={40} />
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
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Image src={logo} alt="logo" width={250} height={40} />
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
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              onClick={() => setOpenSearch(true)}
            />
          </div>
        </div>
        <CommandDialog open={openSearch} onOpenChange={setOpenSearch}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <FaceIcon className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem>
                <RocketIcon className="mr-2 h-4 w-4" />
                <span>Launch</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <PersonIcon className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <EnvelopeClosedIcon className="mr-2 h-4 w-4" />
                <span>Mail</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <GearIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        <Sheet
          open={cartOpen}
          onOpenChange={(open) => {
            if (!open) {
              return closeCart();
            }
            openCart();
          }}
        >
          <SheetTrigger asChild>
            <Button variant="outline" className="relative">
              <Image src="/cart.png" alt="kosár" width={32} height={32} />
              {!!totalItems && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <form onSubmit={handleCheckout}>
              <SheetHeader>
                <SheetTitle>Bevásárlókosár</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 overflow-y-auto flex-grow">
                {cartState &&
                  cartState.map((product, index) => (
                    <div
                      key={index}
                      className="flex flex-row items-center gap-4"
                    >
                      <div className="hidden sm:block">
                        <Image
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={product.images[0]}
                          width="64"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row gap-4 items-center">
                          <span className="font-medium">{product.name}</span>
                          <div className="ml-auto mr-4 p-1 flex flex-row">
                            <Button
                              type="button"
                              className="p-1 h-auto"
                              onClick={() => removeOneFromCart(product)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              value={product.quantity}
                              className="p-1 w-10 h-auto text-center"
                              onChange={(e) => {
                                let value = parseInt(e.target.value);
                                if (isNaN(value)) {
                                  return;
                                }
                                if (value < 1) {
                                  value = 1;
                                }
                                updateProductQuantity(product, value);
                              }}
                            ></Input>
                            <Button
                              type="button"
                              onClick={() => addToCart(product)}
                              className="p-1 h-auto"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-row gap-4 items-center">
                          <span>{product.price} Ft</span>
                          <Button
                            className="ml-auto mr-4 bg-transparent p-1 h-auto border-transparent text-white hover:text-red-600 hover:bg-transparent border-2 hover:border-destructive"
                            onClick={() => {
                              removeFromCart(product);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                {!cartState.length && 'Üres a kosarad'}
              </div>
              {cartState && (
                <>
                  <Separator />
                  <div className="flex flex-row">
                    <span>Összesen</span>
                    <span className="ml-auto">
                      {formatter.format(totalPrice)}
                    </span>
                  </div>
                </>
              )}
              <SheetFooter className="mt-4">
                <SheetClose asChild>
                  <Button type="submit">Fizetés</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </SheetContent>
        </Sheet>
        <SignedIn>
          <UserDropdownButton />
        </SignedIn>
        <SignedOut>
          <SignInButton>Bejeletkezés</SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Navbar;
