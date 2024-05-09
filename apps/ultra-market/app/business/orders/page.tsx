'use client';
import React, { useEffect, useState } from 'react';
import Order from './../../../components/incoming-order';
import useSWRInfinite from 'swr/infinite';
import { fetcher } from './../../..//utils/fetcher';
import { useInView } from 'react-intersection-observer';
import { LoaderIcon } from 'lucide-react';
import Stripe from 'stripe';
import { toast } from 'sonner';

const OrdersPage: React.FC = () => {
  const { ref, inView } = useInView();
  const [pagesData, setPagesData] = useState<
    {
      data: Stripe.Checkout.Session[];
      metaData: any;
    }[]
  >([]);
  const { data, error, isLoading, isValidating, setSize, size } =
    useSWRInfinite<{
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

        return `/api/org/orders?${new URLSearchParams(queryParams)}`;
      },
      fetcher,
      {
        errorRetryCount: 3,
      }
    );
  useEffect(() => {
    if (data) {
      setPagesData(data);
    }
  }, [data]);
  useEffect(() => {
    if (inView && !isLoading && pagesData?.[size - 1]?.metaData.hasNextPage) {
      //
      setSize(size + 1);
    }
  }, [inView, setSize, size, pagesData, isLoading]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    //
    const response = await fetch(`/api/org/orders/${orderId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    });
    if (response.ok) {
      toast.success('Sikeresen frissítve');
      setPagesData((prev) =>
        prev.map((page) => ({
          ...page,
          data: page.data.map((order) =>
            order.id === orderId ? { ...order, orderStatus: newStatus } : order
          ),
        }))
      );
    } else {
      toast.error('Hiba történt a frissítés során');
    }
    /* pagesData?.forEach((page) => {
      const order = page.data.find((order) => order.id === orderId);
      if (order) {
        (order as any).orderStatus = newStatus;
      }
    }); */
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Rendelések</h2>
      {pagesData &&
        pagesData
          .flatMap((page) => page.data)
          .map((order) => (
            <Order key={order.id} order={order} edit={true} updateStatus={updateStatus} />
          ))}
      {pagesData &&
        !isLoading &&
        pagesData.flatMap((page) => page.data).length === 0 && (
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
    </div>
  );
};

export default OrdersPage;
