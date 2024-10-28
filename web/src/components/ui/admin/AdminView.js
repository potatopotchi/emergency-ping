import { PhilippineMap, AdminGroupSection } from '@synergy-project-t/ui-components';
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
      viewId: 'REGION_NCR',
      name: 'User 7',
      icon: 'https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109',
      status: 'NEED_HELP',
      address: [13.781983178861278, 121.01534704946845],
    },
  ]

const AdminView = () => {

    const [viewId, setViewId] = useState("GUIDE");

    //TODO Implement SWR call here*

    const groupDetails = viewId === "REGION_NCR" ? {
      key: "REGION_NCR",
      name: "Metro Manila (NCR)",
      status: "RED",
      severity: "ORANGE",
      members: [
          {
              key: "PROVINCE_DISTRICT1",
              name: "Capital District",
              status: "GREEN",
              severity: "GREEN",
              members: [
                  {
                      key: "NCR_DISTRICT1_MANILA",
                      name: "Manila",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 12
                  }
              ]
          },
          {
              key: "PROVINCE_DISTRICT2",
              name: "Eastern Manila District",
              status: "GREEN",
              severity: "ORANGE",
              members: [
                  {
                      key: "NCR_DISTRICT2_MANDALUYONG",
                      name: "Mandaluyong",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 1
                  },
                  {
                      key: "NCR_DISTRICT2_MARIKINA",
                      name: "Marikina",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 0
                  },
                  {
                      key: "NCR_DISTRICT2_PASIG",
                      name: "Pasig",
                      status: "GREEN",
                      severity: "ORANGE",
                      population: 5
                  },
                  {
                      key: "NCR_DISTRICT2_QUEZONCITY",
                      name: "Quezon City",
                      status: "GREEN",
                      severity: "ORANGE",
                      population: 0
                  },
                  {
                      key: "NCR_DISTRICT2_SANJUAN",
                      name: "San Juan",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 2
                  }
              ]
          },
          {
              key: "PROVINCE_DISTRICT3",
              name: "Northern Manila District (Camanava)",
              status: "RED",
              severity: "ORANGE",
              members: [
                  {
                      key: "NCR_DISTRICT3_CALOOCAN",
                      name: "Caloocan",
                      status: "RED",
                      severity: "ORANGE",
                      population: 2
                  },
                  {
                      key: "NCR_DISTRICT3_MALABON",
                      name: "Malabon",
                      status: "ORANGE",
                      severity: "ORANGE",
                      population: 1
                  },
                  {
                      key: "NCR_DISTRICT3_NAVOTAS",
                      name: "Navotas",
                      status: "GREEN",
                      severity: "ORANGE",
                      population: 0
                  },
                  {
                      key: "NCR_DISTRICT3_VALENZUELA",
                      name: "Valenzuela",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 3
                  }
              ]
          },
          {
              key: "PROVINCE_DISTRICT4",
              name: "Southern Manila District",
              status: "GREEN",
              severity: "GREEN",
              members: [
                  {
                      key: "NCR_DISTRICT4_LASPINAS",
                      name: "Las Piñas",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 2
                  },
                  {
                      key: "NCR_DISTRICT4_MAKATI",
                      name: "Makati",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 8
                  },
                  {
                      key: "NCR_DISTRICT4_MUNTINLUPA",
                      name: "Muntinlupa",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 0
                  },
                  {
                      key: "NCR_DISTRICT4_PARANAQUE",
                      name: "Parañaque",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 5
                  },
                  {
                      key: "NCR_DISTRICT4_PASAY",
                      name: "Pasay",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 1
                  },
                  {
                      key: "NCR_DISTRICT4_PATEROS",
                      name: "Pateros",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 0
                  },
                  {
                      key: "NCR_DISTRICT4_TAGUIG",
                      name: "Taguig",
                      status: "GREEN",
                      severity: "GREEN",
                      population: 2
                  },
              ]
          }
      ]
    } : {};

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
            <div className="w-[600px] h-[100%] flex flex-col relative">
              <AdminGroupSection groupDetails={groupDetails} setViewId={setViewId}/>
            </div>
        </div>
    );
};

export default AdminView;