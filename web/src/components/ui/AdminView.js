import { PhilippineMap, MapGroupSection } from '@synergy-project-t/ui-components';
import { useState } from 'react';

const markers = [
    {
      label: '1',
      viewId: 'GROUP1',
      name: 'User 1', // user name
      //icon: "https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109", // image icon
      status: 'NEED_HELP', // SAFE, NEED_HELP, NO_RESPONSE
      address: [10.534851, 122.875836], // user address
    },
    {
      label: '2',
      viewId: 'GROUP2',
      name: 'User 2', 
      icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
      status: 'SAFE', 
      address: [7.938080467480591, 122.7804583101427],
    },
    {
      label: '3',
      viewId: 'GROUP3',
      name: 'User 3',
      icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
      status: 'NO_RESPONSE',
      address: [11.9960484769978, 121.91716483177602],
    },
    {
      label: '4',
      viewId: 'GROUP4',
      name: 'User 4',
      icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
      status: 'SAFE',
      address: [18.373760, 121.105051],
    },
    {
      label: '5',
      viewId: 'GROUP5',
      name: 'User 5',
      icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
      status: 'NO_RESPONSE',
      address: [9.282173091121518, 125.84579344397739],
    },
    {
      label: '6',
      viewId: 'GROUP6',
      name: 'User 6',
      icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
      status: 'SAFE',
      address: [13.751736402758034, 123.39197473649288],
    },
    {
      label: '7',
      viewId: 'GROUP7',
      name: 'User 7',
      icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
      status: 'NEED_HELP',
      address: [13.781983178861278, 121.01534704946845],
    },
  ]

const AdminView = () => {

    const [viewId, setViewId] = useState("GUIDE");

    const handleMarkerClick = (e) => {
        const clickedViewId = e.target.getAttribute('view-id');
        if (clickedViewId !== viewId) {
            setViewId(clickedViewId);
        }
    };

    return (
        <div class="flex h-full gap-2">
            <div className="w-[600px] h-[100%] flex flex-col relative border rounded-[0.22rem]">
                <div className="w-[100%] bg-[rgb(244,247,247)] px-7 py-4">MAP</div>
                <div className="p-1 w-[100%] flex-1">
                    <PhilippineMap zoomLevel={5} markers={markers} onMarkerClick={handleMarkerClick}/>
                </div>
            </div>
            <MapGroupSection viewId={viewId}/>
        </div>
    );
};

export default AdminView;