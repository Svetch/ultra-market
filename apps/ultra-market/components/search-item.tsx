'use client';
import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@ultra-market/ui/card';
import { useInView } from 'framer-motion';
import { motion } from 'framer-motion';

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
  const hrefValue = edit ? `/business/edit-item?id=${id}` : `/item?id=${id}`;
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    once: true,
  });

  return (
    <Link href={hrefValue} className="transition-all hover:scale-105 flex">
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        transition={{
          delay: Math.min((index % 10) * 0.1, 0.3),
          ease: 'easeInOut',
          duration: 0.2,
        }}
        viewport={{ once: true }}
        variants={variants}
        className="flex"
      >
        <Card className="border-gray-500 grid grid-rows-[auto,1fr,auto]">
          <CardHeader className="p-0">
            <img src={imageUrl} alt={itemName} className="rounded-lg" />
          </CardHeader>
          <CardContent className="py-2">
            <CardTitle className="tect-center text-lg">{itemName}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-lg">{price.toFixed(2)} Ft</p>
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};

export default SearchItem;
