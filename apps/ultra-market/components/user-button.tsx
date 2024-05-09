import { UserButton } from '@clerk/nextjs';
import { BaggageClaim, LoaderIcon } from 'lucide-react';
import useSWRInfinite from 'swr/infinite';
import { fetcher } from '../utils/fetcher';
import Stripe from 'stripe';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Order from './incoming-order';

export function UserDropdownButton() {
  return (
    <UserButton>
      <UserButton.UserProfilePage
        label="Rendelési előzmények"
        labelIcon={<BaggageClaim className="h-4 w-4" />}
        url="/order-hystory"
      >
        <div className="flex flex-col h-[80vh]">
          <h1>Legutóbbi rendelések</h1>
          <OrdersComponent />
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  );
}

function OrdersComponent() {
  const {
    data: pages,
    error,
    isLoading,
    isValidating,
    setSize,
    size,
  } = useSWRInfinite<{
    data: Stripe.Checkout.Session[];
    metaData: any;
  }>(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.metaData.hasNextPage)
        return null;

      const queryParams: Record<string, string> = {};

      if (pageIndex !== 0 && previousPageData.metaData.lastCursor) {
        queryParams.cursor = previousPageData.metaData.lastCursor;
      }

      return `/api/me/orders?${new URLSearchParams(queryParams)}`;
    },
    fetcher,
    {
      errorRetryCount: 3,
    }
  );
  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && !isLoading && pages?.[size - 1]?.metaData.hasNextPage) {
      //
      setSize(size + 1);
    }
  }, [inView, setSize, size, pages, isLoading]);

  return (
    <>
      {pages &&
        pages
          .flatMap((page) => page.data)
          .map((order) => (
            <Order key={order.id} order={order} updateStatus={() => {
              //
            }} />
          ))}
      {pages &&
        !isLoading &&
        pages.flatMap((page) => page.data).length === 0 && (
          <div>Nincs még rendelés</div>
        )}
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
    </>
  );
}
