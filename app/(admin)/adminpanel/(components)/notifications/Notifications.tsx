'use client'
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {LuBell} from "react-icons/lu";
import {Badge} from "@/components/ui/badge";
import {useNotificationCount} from "@/app/(admin)/adminpanel/(components)/notifications/notificationCount-store";
import {useEffect, useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import NotificationList from "@/app/(admin)/adminpanel/(components)/notifications/NotificationList";

export type NotificationType = "ALL" | "READ" | "UNREAD"

const Notifications = () => {
    const [notificationType, setNotificationType] = useState<NotificationType>('ALL')

    const [open, setOpen] = useState(false)

    const {count, refresh} = useNotificationCount()

    useEffect(() => {
        refresh()
    }, [])

    return (
        <Popover open={open} onOpenChange={(newValue) => setOpen(newValue)}>
            <PopoverTrigger>
                <div className={'relative'}>
                    {
                        count > 0 ?
                            <Badge className={'absolute right-[-12px] top-[-12px] text-[10px]'}>
                                {count}
                            </Badge>
                            : null
                    }
                    <Button variant={'outline'}>
                        <LuBell size={15}/>
                    </Button>
                </div>
            </PopoverTrigger>
            <PopoverContent className={'min-w-[500px]'} align={'end'}>
                <Tabs value={notificationType} onValueChange={(newValue) => setNotificationType(newValue as NotificationType)}>
                    <TabsList>
                        <TabsTrigger value={'ALL'}>Усі</TabsTrigger>
                        <TabsTrigger value={'UNREAD'}>Непрочитані</TabsTrigger>
                        <TabsTrigger value={'READ'}>Прочитані</TabsTrigger>
                    </TabsList>
                    <TabsContent value="ALL">
                        <NotificationList type={'ALL'} close={() => setOpen(false)} />
                    </TabsContent>
                    <TabsContent value="UNREAD">
                        <NotificationList type={'UNREAD'} close={() => setOpen(false)} />
                    </TabsContent>
                    <TabsContent value="READ">
                        <NotificationList type={'READ'} close={() => setOpen(false)} />
                    </TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    );
};

export default Notifications;