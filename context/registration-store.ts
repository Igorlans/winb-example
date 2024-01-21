import { create } from 'zustand'



type State = {
    isOpen: boolean
}

type Actions = {
    setIsOpen: (newValue: boolean) => void
}

export const useRegistraion = create<State & Actions>((set) => ({
    isOpen: false,
    setIsOpen: (newValue: boolean) => set((state) => ({ isOpen: newValue })),
}))
