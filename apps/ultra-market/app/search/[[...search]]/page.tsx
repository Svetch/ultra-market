'use client';
import { fakerHU as faker } from '@faker-js/faker';
import { useDebouncedValue } from '@mantine/hooks';
import { Checkbox } from '@ultra-market/ui/checkbox';
import { Input } from '@ultra-market/ui/input';
import { useEffect, useState } from 'react';
import { PriceControl } from '../../../components/price-control';
import SearchItem from '../../../components/search-item';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';

faker.seed(123);

const categories = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    name: faker.commerce.department(),
  };
});
// created function to handle API request
const fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit<CfProperties<unknown>> | undefined
) => fetch(input, init).then((res) => res.json());

export default function Index({ params }: { params: { search: string[] } }) {
  const router = useRouter();
  const [search, setSearch] = useState(decodeURI(params.search?.[0]) || '');
  const [debouncedSearch] = useDebouncedValue(search, 200);
  const { data, error, isLoading, isValidating } = useSWR<any>(
    `/api/search/${debouncedSearch}`,
    fetcher
  );
  useEffect(() => {
    window.history.pushState(null, '', `/search/${debouncedSearch}`);
  }, [debouncedSearch]);
  const items = data?.items;

  return (
    <div className="grid grid-cols-[auto,1fr]">
      <div className="bg-background p-5 flex flex-col gap-2">
        <Input
          placeholder="Keresés"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />
        <h1>Szűrés</h1>
        <div>
          <h3 className="pb-2">Kategóriák</h3>
          <div className="flex flex-col gap-2">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`category-${category.id.toString()}`} />
                <label
                  htmlFor={`category-${category.id.toString()}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="pb-2">Ár</h3>
          <PriceControl />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 2xl:grid-cols-5 gap-5 p-5 grid-row auto-rows-min">
        {items &&
          items.map((item: any, index: number) => (
            <SearchItem
              key={item.id}
              id={item.id}
              itemName={item.name}
              price={item.price}
              imageUrl={item.images[0]}
              description={item.description}
            />
          ))}
      </div>
    </div>
  );
}
