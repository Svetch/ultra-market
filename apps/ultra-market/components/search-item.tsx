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

interface SearchItemProps {
  id: number;
  itemName: string;
  price: number;
  imageUrl: string;
  edit?: boolean;
  description?: string;
}

const SearchItem: React.FC<SearchItemProps> = ({
  id,
  itemName,
  price,
  imageUrl,
  edit,
  description,
}) => {
  const hrefValue = edit ? `/business/edit-item?id=${id}` : `/item?id=${id}`;

  return (
    <Link href={hrefValue} className='transition-all hover:scale-105 flex'>
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
    </Link>
  );

  return (
    <Link
      href={hrefValue}
      className="flex flex-col border border-gray-500 rounded-lg overflow-hidden text-gray-30 hover:bg-slate-800 transition duration-300"
    >
      <div>
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        {/*         <Image
          src={imageUrl}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto' }}
          alt={itemName}
        /> */}
      </div>

      <div className="search-item-details p-2">
        <h3 className="search-item-name">{itemName}</h3>
        <p className="search-item-price">{price.toFixed(2)} Ft</p>
      </div>
    </Link>
  );
};

export default SearchItem;
