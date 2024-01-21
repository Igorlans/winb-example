'use client'

import {useEffect, useState} from "react";
import {apiRequest} from "@/utils/apiRequest";
import {NotificationType} from "@/app/(admin)/adminpanel/(components)/notifications/Notifications";
import { ClientNotification, FullNotification } from "@/types/notifications";

export const useNotifications = (type: NotificationType) => {
    const [notifications, setNotifications] = useState<ClientNotification[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const loadNotifications = async () => {
        setLoading(true);
        try {
            const data: ClientNotification[] | undefined = await apiRequest({
                url: `/api/notifications?page=${page}&type=${type}`,
                method: 'GET'
            })


            if (data && data.length) {
                setNotifications((prevNotifications) => [...prevNotifications, ...data]);
                setPage(page + 1);
            }

        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    return {
        notifications,
        loading,
        loadMore: loadNotifications,
    }
}