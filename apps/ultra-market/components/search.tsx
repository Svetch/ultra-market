'use client'
import { useSearchParams } from 'next/navigation'


const MainPage: React.FC = () => {

  const searchParams = useSearchParams()
  const search = searchParams.get('q')
  
  return (
    <div className="search">
        <input type="text" placeholder={`${search}`} />
        <button>Keresés</button>
    </div>
  );
};

export default MainPage;

