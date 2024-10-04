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
    setUserAuth: ({
        userAuth
    }) => set((state) => ({ 
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

export {
    useUserAuthStore
}