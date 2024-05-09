'use client';
import useSWR from 'swr';
import SearchItem from './../../../components/search-item';
import { fetcher } from './../../../utils/fetcher';

export default function Index() {
  const { data: items } = useSWR('/api/org/item', fetcher);

  return (
    <div className="grid lg:grid-cols-3 2xl:grid-cols-5 gap-5 p-5 grid-row auto-rows-min">
      {items &&
        items.map((item: any, index: any) => (
          <SearchItem
            key={item.id}
            index={index}
            id={item.id}
            itemName={item.itemName}
            price={item.price}
            imageUrl={item.images[0]}
            edit={true}
            description={item.description}
          />
        ))}
    </div>
  );
}
