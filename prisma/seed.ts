import { PrismaClient } from '@prisma/client';
import { fakerHU as faker } from '@faker-js/faker';
const prisma = new PrismaClient();

faker.seed(123);

async function main() {
  const users = await Promise.all(
    new Array(10).fill(0).map((_, i) => {
      return prisma.user.upsert({
        update: {},
        where: { id: i + 1 },
        create: {
          id: i + 1,
        },
      });
    })
  );

  const orgs = await Promise.all(
    new Array(10).fill(0).map((_, i) => {
      return prisma.organization.upsert({
        update: {},
        where: { id: i + 1 },
        create: {
          name: faker.company.name(),
          logo: faker.image.url(),
          address: faker.location.streetAddress(),
          phone: faker.phone.number(),
          vat: faker.number.int().toString(),
          ownerId: users[i].id,
        },
      });
    })
  );
  for (let i = 1; i <= 100; i++) {
    const category = faker.commerce.department();
    await prisma.shopItem.upsert({
      where: { id: i },
      update: {},
      create: {
        id: i,
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        images: [faker.image.url()],
        description: faker.commerce.productDescription(),
        organizationId: orgs[faker.number.int(orgs.length - 1)].id,
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
