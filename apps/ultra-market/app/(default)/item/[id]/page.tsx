'use client';
import React from 'react';
import ItemDetailPage from '../../../../components/detailed-item';
import ImageSlider from '../../../../components/image-slider';
import useSWR from 'swr';

type Props = {
  id: string;
};
const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json() as any);
export default function ItemDetailExample({ params }: { params: Props }) {
  const { data: item, isLoading } = useSWR(`/api/item/${params.id}`, fetcher);

  return (
    <div>
      {item && (
        <>
          <ImageSlider images={item.images} />
          <ItemDetailPage item={item} />
        </>
      )}
    </div>
  );
}
