import { PhilippineMap, AdminGroupSection, AdminNewsSection, AdminNotificationsSection } from '@synergy-project-t/ui-components';
import { useState, useEffect, useRef } from 'react';
import { useMapViewStore } from '@synergy-project-t/utils/stores';
import { RiRefreshLine } from 'react-icons/ri';

const markers = [
    {
      label: 'A',
      name: "Metro Manila (NCR)",
      viewId: 'REGION_NCR',
      status: 'NEED_HELP',
      address: [14.6091, 121.0223],
    },
    {
      label: 'B',
      name: "Cordillera Administrative Region",
      viewId: 'REGION_CAR',
      status: 'SAFE',
      address: [17.3513, 121.1719],
    },
    {
      label: 'C',
      name: "Ilocos",
      viewId: 'REGION_1',
      status: 'SAFE',
      address: [16.0832, 120.6200],
    },
    {
      label: 'D',
      name: "Cagayan Valley",
      viewId: 'REGION_2',
      status: 'SAFE',
      address: [16.9754, 121.8107],
    },
    {
      label: 'E',
      name: "Central Luzon",
      viewId: 'REGION_3',
      status: 'SAFE',
      address: [15.4828, 120.7120],
    },
    {
      label: 'F',
      name: "Calabarzon",
      viewId: 'REGION_4A',
      status: 'SAFE',
      address: [14.1008, 121.0794],
    },
    {
      label: 'G',
      name: "Southwestern Tagalog (Mimaropa)",
      viewId: 'REGION_MIMAROPA',
      status: 'SAFE',
      address: [9.8432, 118.7365],
    },
    {
      label: 'H',
      name: "Bicol",
      viewId: 'REGION_5',
      status: 'SAFE',
      address: [13.4210, 123.4137],
    },
    {
      label: 'I',
      name: "Western Visayas",
      viewId: 'REGION_6',
      status: 'SAFE',
      address: [11.0050, 122.5373],
    },
    {
      label: 'J',
      name: "Negros Island",
      viewId: 'REGION_NIR',
      status: 'SAFE',
      address: [9.7151, 122.8987],
    },
    {
      label: 'K',
      name: "Central Visayas",
      viewId: 'REGION_7',
      status: 'SAFE',
      address: [9.8169, 124.0641],
    },
    {
      label: 'L',
      name: "Eastern Visayas",
      viewId: 'REGION_8',
      status: 'SAFE',
      address: [12.2446, 125.0388],
    },
    {
      label: 'M',
      name: "Zamboanga Peninsula",
      viewId: 'REGION_9',
      status: 'SAFE',
      address: [6.5750, 122.0360],
    },
    {
      label: 'N',
      name: "Northern Mindanao",
      viewId: 'REGION_10',
      status: 'SAFE',
      address: [8.0202, 124.6857],
    },
    {
      label: 'O',
      name: "Davao",
      viewId: 'REGION_11',
      status: 'SAFE',
      address: [7.3042, 126.0893],
    },
    {
      label: 'P',
      name: "Soccsksargen",
      viewId: 'REGION_12',
      status: 'SAFE',
      address: [6.2707, 124.6857],
    },
    {
      label: 'Q',
      name: "Caraga",
      viewId: 'REGION_13',
      status: 'SAFE',
      address: [8.8015, 125.7407],
    },
    {
      label: 'R',
      name: "Bangsamoro (BARMM)",
      viewId: 'REGION_3',
      status: 'SAFE',
      address: [6.9568, 124.2422],
    },
  ];

const regionDetails = {
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
                    population: 5,
                    address: [14.5736, 121.0785]
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
};

const residentsDetails = {
    key: "NCR_DISTRICT2_PASIG",
    name: "Pasig",
    status: "GREEN",
    severity: "ORANGE",
    members: [
    {
        email: "richiet@codev.com",
        name: "Richie Tamagotchi",
        imgUrl: "https://internalcodev.blob.core.windows.net/internal-public/employees/282/photo/fb7d6ae2-6406-4851-9dba-b73262fb173f.jpeg",
        status: "GREEN",
        location: "123, Saaming Subdivision, Pasig City, Manila",
        contactNumber: "09123456789",
    },
    {
        email: "julieb@codev.com",
        name: "Julie Batumbakal",
        imgUrl: "https://lh3.googleusercontent.com/a/ALm5wu3kg-jPqaYiRCYcWiYnrgWoLkRO4CjhgPZqO4cc=s96-c",
        status: "GREEN",
        location: "456, Samay Street, Pasig City, Manila",
        contactNumber: "09987654321"
    },
    {
        email: "jasminer@codev.com",
        name: "Jasmine Rice",
        imgUrl: "https://internalcodev.blob.core.windows.net/internal-public/employees/20/photo/fc067dcf-cf8c-4138-82a5-751315cb27f5.jpeg",
        status: "GREEN",
        location: "2319, Aisle 12, SM Pasig Mall, Pasig City, Manila",
        contactNumber: "(55) 123-4567"
    },
    {
        email: "nggyu@codev.com",
        name: "Rick Astley",
        imgUrl: "https://internalcodev.blob.core.windows.net/internal-public/employees/282/photo/fb7d6ae2-6406-4851-9dba-b73262fb173f.jpeg",
        status: "GREEN",
        location: "#742, Your Rd., Pasig, Manila",
        contactNumber: "-",
    },
    {
        email: "nglyd@codev.com",
        name: "Rick Astley Jr.",
        imgUrl: "https://internalcodev.blob.core.windows.net/internal-public/employees/282/photo/fb7d6ae2-6406-4851-9dba-b73262fb173f.jpeg",
        status: "GREEN",
        location: "#742, Your Rd., Pasig, Manila",
        contactNumber: "-",
    },
    ],
};

const AdminView = () => {

    const mapRef = useRef(null);

    const { mapView = {}, setMapView, removeMapView } = useMapViewStore((state) => state);
    const { key, long, lat, zoom } = mapView;

    useEffect(() => {     
        if (key !== "GUIDE") {
            mapRef.current?.flyTo({ 
                center: [long, lat],
                zoom: zoom,
                duration: 4000,
                essential: true 
            });
        }
        else {
            mapRef.current?.flyTo({ 
                center: [121.7740, 10.8797],
                zoom: 5,
                duration: 2000,
                essential: true 
            });
        }
    },[
        JSON.stringify(mapView)
    ]);

    //TODO Replace with SWR call to the backend
    const groupDetails = key === "REGION_NCR" ? regionDetails : key === "NCR_DISTRICT2_PASIG" ? residentsDetails : {};

    const handleMarkerClick = (lat, long) => (e) => {
        const clickedViewId = e.target.getAttribute('view-id');
        if (clickedViewId !== key) {
            setMapView({
                key: clickedViewId,
                lat,
                long,
                zoom: 10
            });
        }
    };

    const handleReloadView = (e) => {
        removeMapView();
    }

    return (
        <div class="flex h-full gap-4">
            <div class="w-[600px] h-[100%] flex flex-col relative border rounded-[0.22rem]">
                <div class="flex w-[100%] bg-[rgb(244,247,247)] px-7 py-4 font-medium">
                    <div>{"MAP"}</div>
                    <div class="ml-auto hover:cursor-pointer" onClick={handleReloadView}><RiRefreshLine size="1.5em"/></div>
                </div>
                <div class="p-1 w-[100%] flex-1">
                    <PhilippineMap mapRef={mapRef} zoomLevel={5} markers={key === "GUIDE" && markers} onMarkerClick={handleMarkerClick}/>
                </div>
            </div>
            <div class="w-[600px] h-[100%] flex flex-col relative">
              <AdminGroupSection groupDetails={groupDetails}/>
            </div>
            <div class="flex-1 h-[100%] flex flex-col gap-4 relative">
                <AdminNotificationsSection/>
                <AdminNewsSection/>
            </div>
        </div>
    );
};

export default AdminView;