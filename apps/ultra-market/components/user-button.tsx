import { UserButton } from '@clerk/nextjs';
import { BaggageClaim } from 'lucide-react';

export function UserDropdownButton() {
  return (
    <UserButton>
      <UserButton.UserProfilePage
        label="Rendelési előzmények"
        labelIcon={<BaggageClaim className="h-4 w-4" />}
        url="/order-hystory" 
      >
        <div className="flex flex-col h-[80vh]">
          <h1>Legutóbbi rendelések</h1>
          <div className=' flex flex-grow justify-center items-center text-6xl'>HAMAROSAN</div>
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  );
}
