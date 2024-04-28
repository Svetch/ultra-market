import SearchItem from './../../../components/search-item';

export default async function Index() {
    const mockItems = [
        {
            id: 1,
            itemName: 'Example Item 1',
            price: 19.99,
            imageUrl: '/watch_black.jpg',
            edit: true,
            description: 'Example Item 1',
        },
        {
            id: 2,
            itemName: 'Example Item 2',
            price: 24.99,
            imageUrl: '/watch_white.jpg',
            edit: true,
        },
        {
            id: 3,
            itemName: 'Example Item 3',
            price: 14.99,
            imageUrl: '/watch_grey.jpg',
            edit: true,
        },
    ];
    
    return (

        <div className="grid lg:grid-cols-3 2xl:grid-cols-5 gap-5 p-5 grid-row auto-rows-min">
            {mockItems.map((item, index) => (
                <SearchItem
                key={index}
                id={item.id}
                itemName={item.itemName}
                price={item.price}
                imageUrl={item.imageUrl}
                edit={item.edit}
                description={item.description}
                />
            ))}
        </div>
    );
}