import Search from './../../components/search';
import SearchItem from './../../components/search-item';

export default async function Index() {
    const mockItems = [
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
    ];
    
    return (
        <div>
            <Search />

            {mockItems.map((item, index) => (
                <SearchItem
                key={index}
                id={item.id}
                itemName={item.itemName}
                price={item.price}
                imageUrl={item.imageUrl}
                />
            ))}
        </div>
    );
}