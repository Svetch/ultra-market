'use client';
import { Button } from '@ultra-market/ui/button';
import { Card, CardContent, CardHeader } from '@ultra-market/ui/card';
import { useState } from 'react';
import Stripe from 'stripe';
import useSWR from 'swr';
import { fetcher } from '../../../../utils/fetcher';
import { formatAmountForDisplay } from '../../../../utils/stripe-helpers';

export default function PaymentResult({ params }: { params: { id: string } }) {
  const [showIds, setShowIds] = useState(false);
  const { data, isLoading, error } = useSWR<Stripe.Checkout.Session>(
    `/api/payment/${params.id}`,
    fetcher
  );

  if (error) {
    return <p>{error}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }
  //Rendelésed sikeresen rögzitettük!
  return (
    <div className="flex justify-center items-center">
      <Card>
        <CardContent>
          <CardHeader>
            <h1>Sikeresen leadtad a rendelésed!</h1>
            <p>A csomagod elkezdjük előkészíteni.</p>
          </CardHeader>
          <p>Rendelési szám: {showIds ? data.id : '****'}</p>
          <p>
            Fizetési azonosító:{' '}
            {showIds ? data.payment_intent?.toString() : '****'}
          </p>

          <Button onClick={() => setShowIds(!showIds)}>
            {!showIds ? 'ShowIds' : 'Hide ids'}
          </Button>
          <h2>Products</h2>
          {data.line_items!.data!.map((item) => {
            if (typeof item.price?.product !== 'object') return null;
            if ('deleted' in item.price.product) return null;
            return (
              <div key={item.id} className="flex flex-row items-center gap-4">
                <div className="hidden sm:block">
                  <img
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={item.price.product.images[0]}
                    width="64"
                    alt={item.price.product.name}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row gap-4 items-center">
                    <span className="font-medium">
                      {item.price.product.name}
                    </span>
                    <div className="ml-auto mr-4 p-1 flex flex-row">
                      <span className="p-1 w-10 h-auto text-center">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 items-center">
                    <span>
                      {formatAmountForDisplay(item.price.unit_amount!, 'HUF')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
