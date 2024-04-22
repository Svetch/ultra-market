import { fakerHU as faker } from '@faker-js/faker';
import { Checkbox } from '@ultra-market/ui/checkbox';
import { Input } from '@ultra-market/ui/input';
import { Slider } from '@ultra-market/ui/slider';
import { search as searchItems } from '../../../actions';
import SearchItem from '../../../components/search-item';
import { PriceControl } from '../../../components/price-control';

faker.seed(123);

const categories = new Array(10).fill(0).map((_, i) => {
  return {
    id: i,
    name: faker.commerce.department(),
  };
});

export default async function Index({
  params,
}: {
  params: { search: string };
}) {
  const items = await searchItems(params.search);

  return (
    <div className="grid grid-cols-[auto,1fr]">
      <div className="bg-background p-5 flex flex-col gap-2">
        <Input placeholder="Keresés" />
        <h1>Szűrés</h1>
        <div>
          <h3 className='pb-2'>Kategóriák</h3>
          {categories.map((category, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox id={`category-${category.id.toString()}`} />
              <label
                htmlFor={`category-${category.id.toString()}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
        <div>
          <h3 className='pb-2'>Ár</h3>
          <PriceControl />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 2xl:grid-cols-5 gap-5 p-5 grid-row auto-rows-min">
        {items.map((item, index) => (
          <SearchItem
            key={index}
            id={item.id}
            itemName={item.name}
            price={item.price}
            imageUrl={item.images[0]}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
