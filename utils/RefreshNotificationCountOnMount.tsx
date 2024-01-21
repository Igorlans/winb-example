'use client'
import {useEffect} from "react";
import {useNotificationCount} from "@/app/(admin)/adminpanel/(components)/notifications/notificationCount-store";

const RefreshNotificationCountOnMount = () => {
    const {refresh} = useNotificationCount()

    useEffect(() => {
        refresh()
    }, []);

    return null
};

export default RefreshNotificationCountOnMount;