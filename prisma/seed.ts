import { PrismaClient } from '@prisma/client';
import { fakerHU as faker } from '@faker-js/faker';
const prisma = new PrismaClient();

faker.seed(123);

async function main() {
  const user = await prisma.user.upsert({
    update: {},
    where: { id: 'user_2fLST3UGHEDKEgQE886oJm34bhb' },
    create: {
      id: 'user_2fLST3UGHEDKEgQE886oJm34bhb',
    },
  });

  const org = await prisma.organization.upsert({
    update: {},
    where: { id: 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x' },
    create: {
      name: faker.company.name(),
      logo: faker.image.url(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      vat: faker.number.int().toString(),
      ownerId: user.id,
      id: 'org_2gCWS3ATE2MW9xKA8rH8xUJkp9x',
    },
  });

  for (let i = 1; i <= 100; i++) {
    const category = faker.commerce.department();
    await prisma.shopItem.upsert({
      where: { id: i },
      update: {},
      create: {
        id: i,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()) * 100,
        images: [faker.image.url()],
        description: faker.commerce.productDescription(),
        organizationId: org.id,
        shortDescription: faker.commerce.productDescription(),
        stock: faker.number.int(100),
        categories: {
          connectOrCreate: {
            where: {
              name: category,
            },
            create: {
              name: category,
            },
          },
        },
      },
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
