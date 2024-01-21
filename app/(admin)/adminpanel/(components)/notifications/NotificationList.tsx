'use client'
import {NotificationType} from "@/app/(admin)/adminpanel/(components)/notifications/Notifications";
import {FC} from "react";
import NotificationItem from "@/app/(admin)/adminpanel/(components)/notifications/NotificationItem";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Skeleton} from "@/components/ui/skeleton";
import {Card} from "@/components/ui/card";
import {useNotifications} from "@/app/(admin)/adminpanel/(components)/notifications/useNotifications";
import {LuInbox} from "react-icons/lu";

interface INotificationListProps {
    type: NotificationType,
    close: () => void;
}

const NotificationList: FC<INotificationListProps> = ({type, close}) => {

    const {notifications, loading, loadMore} = useNotifications(type)


    return (
        <ScrollArea className={'mt-5 h-[400px]'}>
            <div className={'h-full flex flex-col gap-4'}>
                {notifications.map((notification, index) =>
                    <NotificationItem isLast={index + 1 === notifications.length} loadMore={loadMore} notification={notification} close={close} />
                )}
                {!loading && !notifications.length ?
                    <div className={'w-full min-h-[400px] flex justify-center items-center'}>
                        <div className={'flex flex-col gap-4 items-center'}>
                            <LuInbox size={40} />
                            <div className={'uppercase text-sm'}>
                                Немає повідомлень
                            </div>
                        </div>
                    </div>
                    : null
                }
                {loading &&
                    <>
                        <NotificationItemSkeleton />
                        <NotificationItemSkeleton />
                    </>
                }
                {/*<Button onClick={loadMore}>*/}
                {/*    load more*/}
                {/*</Button>*/}
            </div>

        </ScrollArea>
    );
};

export default NotificationList;

const NotificationItemSkeleton = () => {
    return (
        <Card className={'p-4 flex flex-col gap-4'}>
            <Skeleton className={'h-4 w-1/2'} />
            <Skeleton className={'h-3 w-1/3'} />
            <Skeleton className={'h-3 w-1/2'} />
            <Skeleton className={'h-3 w-1/4'} />
        </Card>
    )
}