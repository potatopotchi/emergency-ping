import { create } from 'zustand';

// Sample user auth store; Update model as necessary
const useUserAuthStore = create((set) => ({
    userAuth: {
        id: null,
        firstName: null,
        lastName: null,
        roles: [],
        token: null,
    },
    setUserAuth: (userAuth) => set((state) => ({ 
        userAuth: {
            ...state.userAuth,
            ...userAuth
        }
    })),
    removeUserAuth: () => set({ 
        userAuth: {
            id: null,
            firstName: null,
            lastName: null,
            roles: [], 
            token: null
        }
    }),
}));

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