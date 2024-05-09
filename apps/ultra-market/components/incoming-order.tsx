import React from 'react';
import Stripe from 'stripe';
import { formatAmountForDisplay } from '../utils/stripe-helpers';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ultra-market/ui/select';

type OrderProps = {
  order: Stripe.Checkout.Session;
  edit?: boolean;
  updateStatus: (orderId: string, status: string) => void;
};

const Order: React.FC<OrderProps> = ({ order, updateStatus, edit }) => {
  const handleStatusChange = (value: string) => {
    updateStatus(order.id, value);
  };
  const { id, customer_details, shipping_details, created, line_items } = order;

  return (
    <div className="p-4 border border-gray-300 rounded-md mb-4">
      <h3 className="text-lg font-semibold">
        Rendelés azonosítója:{' '}
        <span aria-label={id}>{id.slice(0, 10) + '...'}</span>
      </h3>
      <p>
        <strong>Vásárló neve:</strong> {customer_details?.name}
      </p>
      <p>
        <strong>Cím:</strong> {shipping_details?.address?.country}{' '}
        {shipping_details?.address?.postal_code}{' '}
        {shipping_details?.address?.state} {shipping_details?.address?.city}{' '}
        {shipping_details?.address?.line1} {shipping_details?.address?.line2}
      </p>
      <p>
        <strong>Telefon:</strong> {customer_details?.phone}
      </p>
      <p>
        <strong>Rendelés ideje:</strong>{' '}
        {new Date(created * 1000).toLocaleString('hu-HU')}
      </p>
      <p>
        <strong>Fizetési Állapot:</strong>{' '}
        {order.payment_status === 'paid' ? 'Fizetve' : 'Fizetésre vár'}
      </p>

      <div className="flex flex-row gap-4 items-center py-1">
        <strong>Állapot:</strong>
        {edit && (
          <Select
            value={(order as any).orderStatus}
            onValueChange={handleStatusChange}
            disabled={(order as any).orderStatus === 'WaitingForPayment'}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Állapot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="WaitingForPayment" disabled>
                Fizetés Alatt
              </SelectItem>
              <SelectItem value="Pending">Függőben</SelectItem>
              <SelectItem value="Packiging">Csomagolás</SelectItem>
              <SelectItem value="Shipping">Szállítás</SelectItem>
              <SelectItem value="Delivered">Kézbesített</SelectItem>
              <SelectItem value="Canceled">Törölve</SelectItem>
            </SelectContent>
          </Select>
        )}
        {!edit && <span>{translateStatus((order as any).orderStatus)}</span>}
      </div>
      <h4 className="mt-2 mb-1 font-semibold">Termékek:</h4>
      <ul className="list-disc list-inside">
        {line_items?.data.map((item) => (
          <li key={item.id}>
            {(item.price?.product as Stripe.Product).name} - ${item.quantity} x{' '}
            {formatAmountForDisplay(item.price!.unit_amount! / 100, 'HUF')}
          </li>
        ))}
      </ul>
      <p>
        <strong>Összesen:</strong>{' '}
        {formatAmountForDisplay(order.amount_total! / 100, 'HUF')}
      </p>
    </div>
  );
};

function translateStatus(status: string) {
  switch (status) {
    case 'WaitingForPayment':
      return 'Fizetés Alatt';
    case 'Pending':
      return 'Függőben';
    case 'Packiging':
      return 'Csomagolás';
    case 'Shipping':
      return 'Szállítás';
    case 'Delivered':
      return 'Kézbesített';
    case 'Canceled':
      return 'Törölve';
    default:
      return status;
  }
}

export default Order;
