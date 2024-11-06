import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Sample user auth store; Update model as necessary
const useUserAuthStore = create(
    persist(
        (set) => ({
            userAuth: {
                id: null,
                firstName: null,
                lastName: null,
                roles: [],
                email: null,
            },
            setUserAuth: (userAuth = {}) => set((state) => ({ 
                userAuth: {
                    ...state.userAuth,
                    id: userAuth.id,
                    firstName: userAuth.firstName,
                    lastName: userAuth.lastName,
                    roles: userAuth.roles,
                    email: userAuth.email,
                }
            })),
            removeUserAuth: () => set({ 
                userAuth: {
                    id: null,
                    firstName: null,
                    lastName: null,
                    roles: [], 
                    email: null
                }
            }),
        }),
        {
            name: 'cepa-storage-userAuth'
        }
    )
);

const useMapViewStore = create((set) => ({
    mapView: {
        key: "GUIDE",
        lat: null,
        long: null,
        zoom: null,
    },
    setMapView: (mapView) => set((state) => ({ 
        mapView: {
            ...state.mapView,
            ...mapView
        }
    })),
    removeMapView: () => set({ 
        mapView: {
            key: "GUIDE",
            lat: null,
            long: null,
            zoom: null,
        }
    }),
}));

export {
    useUserAuthStore,
    useMapViewStore
}