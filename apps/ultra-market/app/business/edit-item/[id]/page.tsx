'use client';
import React from 'react';
import EditableProductPage from '../../../../components/edit-item';
import { fetcher } from '../../../../utils/fetcher';
import useSWR from 'swr';
import { toast } from 'sonner';

export default function ParentComponent({
  params,
}: {
  params: { id: string };
}) {
  const { data: product } = useSWR(`/api/item/${params.id}`, fetcher);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto bg-neutral-800 rounded p-5 my-10">
      <h1 className="text-3xl font-bold mb-4 text-white">Áru szerkesztése</h1>

      <EditableProductPage
        product={{
          ...product,
          categories: product.categories.map((c: any) => c.name),
        }}
        onSave={async (updatedProduct) => {
          const result = await fetch(`/api/org/item/${params.id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedProduct),
          });
          if (result.ok) {
            toast.success('Az áru sikeresen frissítve lett.');
          } else toast.error('Hiba történt az áru frissítése közben.');
        }}
      />
    </div>
  );
}
