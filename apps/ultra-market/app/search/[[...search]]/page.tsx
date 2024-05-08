'use client';
import { fakerHU as faker } from '@faker-js/faker';
import { useDebouncedValue } from '@mantine/hooks';
import { Checkbox } from '@ultra-market/ui/checkbox';
import { Input } from '@ultra-market/ui/input';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import { PriceControl } from '../../../components/price-control';
import SearchItem from '../../../components/search-item';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { LoaderIcon } from 'lucide-react';
faker.seed(123);

// created function to handle API request
const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json() as any);

export default function Index({ params }: { params: { search: string[] } }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState({
    query: decodeURI(params.search?.[0] || ''),
    category: searchParams.get('category')?.split(',') || [],
    price: {
      min: parseInt(searchParams.get('price')?.split(',')[0] || '0'),
      max: parseInt(searchParams.get('price')?.split(',')[1] || '3000'),
    },
  });
  const { ref, inView } = useInView();
  const [debouncedSearch] = useDebouncedValue(search, 500);

  type Categories = { id: number; name: string }[];
  const { data: categories } = useSWR<Categories>(`/api/categories`, fetcher, {
    errorRetryCount: 3,
  });

  const {
    data: pagesData,
    error,
    isLoading,
    isValidating,
    setSize,
    size,
  } = useSWRInfinite<any>(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.metaData.hasNextPage)
        return null;

      const queryParams: Record<string, string> = {};

      if (debouncedSearch.query) queryParams.query = debouncedSearch.query;

      if (debouncedSearch.category.length)
        queryParams.category = debouncedSearch.category.join(',');

      queryParams.price = `${debouncedSearch.price.min},${debouncedSearch.price.max}`;

      if (pageIndex !== 0 && previousPageData.metaData.lastCursor) {
        queryParams.cursor = previousPageData.metaData.lastCursor;
      }

      return `/api/search?${new URLSearchParams(queryParams)}`;
    },
    fetcher,
    {
      errorRetryCount: 3,
    }
  );

  useEffect(() => {
    const queryParams: Record<string, string> = {};

    //if (debouncedSearch.query) queryParams.query = debouncedSearch.query;

    if (debouncedSearch.category.length)
      queryParams.category = debouncedSearch.category.join(',');
    if (debouncedSearch.price.min !== 0 || debouncedSearch.price.max !== 3000)
      queryParams.price = `${debouncedSearch.price.min},${debouncedSearch.price.max}`;
    const searchParams = new URLSearchParams(queryParams);
    window.history.pushState(
      null,
      '',
      `/search/${debouncedSearch.query || ''}${
        searchParams.size > 0 ? '?' + searchParams.toString() : ''
      }`
    );
  }, [debouncedSearch]);

  useEffect(() => {
    if (inView && !isLoading && pagesData?.[size - 1]?.metaData.hasNextPage) {
      //
      setSize(size + 1);
    }
  }, [inView, setSize, size, pagesData, isLoading]);

  return (
    <div className="grid grid-cols-[auto,1fr]">
      <div className="bg-background p-5 flex flex-col gap-2">
        <form
          onChange={(event) => {
            const target: HTMLInputElement = event.target as HTMLInputElement;

            switch (target.type) {
              case 'checkbox':
                if (target.checked) {
                  setSearch((prev) => ({
                    ...prev,
                    category: [...prev.category, target.value],
                  }));
                } else {
                  setSearch((prev) => ({
                    ...prev,
                    category: prev.category.filter(
                      (category) => category !== target.value
                    ),
                  }));
                }
                break;
              case 'text':
                if (target.name === 'search') {
                  setSearch((prev) => ({
                    ...prev,
                    query: target.value,
                  }));
                }
                if (target.name === 'price[]') {
                  const side =
                    Array.prototype.indexOf.call(
                      target.parentNode!.childNodes,
                      target
                    ) === 1
                      ? 'min'
                      : 'max';
                  console.log('side', side, target.value);

                  setSearch((prev) => ({
                    ...prev,
                    price: {
                      ...prev.price,
                      [side]: parseInt(target.value),
                    },
                  }));
                }

                break;
              default:
                console.error('Unknown input type', target.type);
                break;
            }
          }}
        >
          <Input
            placeholder="Keresés"
            name="search"
            defaultValue={search.query}
          />
          <div>
            <h3 className="pb-2">Kategóriák</h3>
            <div className="flex flex-col gap-2">
              {categories &&
                categories.map((category, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      name={`category-${category.id.toString()}`}
                      value={category.id.toString()}
                      id={`category-${category.id.toString()}`}
                      defaultChecked={search.category.includes(
                        category.id.toString()
                      )}
                    />
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
            <PriceControl
              name="price"
              defaultValue={[search.price.min, search.price.max]}
              max={3000}
            />
          </div>
        </form>
      </div>
      <div className="grid grid-rows-[1fr,auto]">
        <div className="grid lg:grid-cols-3 2xl:grid-cols-5 gap-5 p-5 grid-row auto-rows-min">
          {pagesData &&
            pagesData
              .flatMap((page) => page.data)
              .map((item: any, index: number) => (
                <SearchItem
                  key={item.id}
                  id={item.id}
                  itemName={item.name}
                  price={item.price}
                  imageUrl={item.images[0]}
                  description={item.description}
                  index={index}
                />
              ))}
          {pagesData && pagesData.flatMap((page) => page.data).length === 0 && (
            <div>Nincs találat</div>
          )}
        </div>
        <div
          ref={ref}
          className="w-full min-h-1 bg-transparent justify-center items-center flex p-5"
        >
          {isLoading ||
            (isValidating && (
              <div>
                <LoaderIcon className="animate-spin" />
              </div>
            ))}
          {error && <div>Error: {error.message}</div>}
        </div>
      </div>
    </div>
  );
}
