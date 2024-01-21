'use client'

import { create } from 'zustand'
import {apiRequest} from "@/utils/apiRequest";

const getUnreadNotificationsCount = async () => {
    try {
        const count = await apiRequest({url: '/api/notifications/unreadCount', method: 'GET'}) as number;
        return count;
    } catch (e) {
        console.log(e)
    }
}

type State = {
    count: number
}

type Actions = {
    refresh: () => void
}

export const useNotificationCount = create<State & Actions>((set) => ({
    count: 0,
    // setCount: (newValue: number) => set((state) => ({ count: newValue })),
    refresh: async () => {
        const newCount = await getUnreadNotificationsCount()
        if (newCount !== undefined) {
            set(() => ({
                count: newCount
            }))
        }
    }
}))

