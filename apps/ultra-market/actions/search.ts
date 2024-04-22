'use server';
import { db } from './db';
export async function search(q: string) {
  console.log("q",q);
  return db.shopItem.findMany({
    where: {
      name: {
        contains: q,
      },
    },
    take: 10,
    select: {
        id: true,
        name: true,
        price: true,
        images: true,
        description: true,
        tags: true,        
    }
  });
/* 
  return [
    {
      id: 1,
      itemName: 'Example Item 1',
      price: 19.99,
      imageUrl: '/watch_black.jpg',
    },
    {
      id: 2,
      itemName: 'Example Item 2',
      price: 24.99,
      imageUrl: '/watch_white.jpg',
    },
    {
      id: 3,
      itemName: 'Example Item 3',
      price: 14.99,
      imageUrl: '/watch_grey.jpg',
    },
  ]; */
}
