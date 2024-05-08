'use client';
import { Button } from '@ultra-market/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ultra-market/ui/card';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useCartStore } from './cart';
import { toast } from 'sonner';

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface SearchItemProps {
  id: number;
  itemName: string;
  price: number;
  imageUrl: string;
  edit?: boolean;
  description?: string;
  index: number;
}

const SearchItem: React.FC<SearchItemProps> = ({
  id,
  itemName,
  price,
  imageUrl,
  edit,
  description,
  index,
}) => {
  const hrefValue = edit ? `/business/edit-item/${id}` : `/item/${id}`;
  const { addToCart, openCart } = useCartStore();
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{
        delay: Math.min((index % 10) * 0.1, 0.3),
        ease: 'easeInOut',
        duration: 0.2,
      }}
      viewport={{ once: true }}
      variants={variants}
      className="flex transition-all hover:scale-105 "
    >
      <Card className="border-gray-500 grid grid-rows-[auto,1fr,auto]">
        <CardHeader className="p-0">
          <Link href={hrefValue} className="flex">
            <img src={imageUrl} alt={itemName} className="rounded-lg" />
          </Link>
        </CardHeader>
        <CardContent className="py-2">
          <Link href={hrefValue} className="">
            <CardTitle className="tect-center text-lg">{itemName}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </Link>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-lg">{price.toFixed(2)} Ft</p>
          <Button
            onClick={() => {
              addToCart({
                categories: [],
                description: '',
                id,
                images: [imageUrl],
                name: itemName,
                price,
              });
              toast('Sikeresen hozzáadtál egy terméket a korárhoz', {
                action: {
                  label: 'Kosárhoz',
                  onClick: openCart,
                },
                duration: 3000,
              });
            }}
            className="transition-all hover:scale-105"
          >
            <ShoppingCart />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SearchItem;
