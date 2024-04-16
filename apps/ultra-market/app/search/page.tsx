import Search from './../../components/search';
import SearchItem from './../../components/search-item';

export default async function Index() {
    const mockItems = [
        {
            itemName: 'Example Item 1',
            price: 19.99,
            imageUrl: '/../public/logo.png',
        },
        {
            itemName: 'Example Item 2',
            price: 24.99,
            imageUrl: '/../public/logo.png',
        },
        {
            itemName: 'Example Item 3',
            price: 14.99,
            imageUrl: '/../public/logo.png',
        },
    ];
    
    return (
        <div>
            <Search />

            {mockItems.map((item, index) => (
                <SearchItem
                key={index}
                itemName={item.itemName}
                price={item.price}
                imageUrl={item.imageUrl}
                />
            ))}
        </div>
    );
}