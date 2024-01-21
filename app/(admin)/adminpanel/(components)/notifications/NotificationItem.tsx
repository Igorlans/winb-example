import {FC, useEffect, useRef} from "react";
import {Card} from "@/components/ui/card";
import dayjs from "dayjs";
import { ClientNotification } from "@/types/notifications";
import Link from "next/link";

interface INotificationItemProps {
    notification: ClientNotification;
    isLast: boolean;
    loadMore: () => void;
    close: () => void
}

const NotificationItem: FC<INotificationItemProps> = ({notification, isLast, loadMore, close}) => {
    const date = dayjs(Number(notification.createdAt)).format('DD/MM/YYYY HH:mm')

    const getType = () => {
        switch (notification.type) {
            case "SERVICE":
                return 'Запит на бізнес-послугу'
            case "REQUEST":
                return 'Запит на реєстрацію'
            case "EVENT":
                return 'Запис на подію'
        }
    }

    const renderNotificationDescription = () => {
        switch (notification.type) {
            case "SERVICE":
                const articleTitle = notification.ServiceNotification?.ArticleRequest.Article.textFields.title;
                const mentorName = notification.ServiceNotification?.ArticleRequest.Member.textFields.name;
                const userName = notification.ServiceNotification?.ArticleRequest.name;
                return (
                    <div className={'max-w-[90%] text-xs opacity-60'}>
                        <div>
                            Оформлено запис на послугу
                        </div>
                        <div>
                            {articleTitle}
                        </div>
                        <div>
                            до членкині "{mentorName}"
                        </div>
                        <div>
                            користувачем "{userName}"
                        </div>
                    </div>
                )
            case "REQUEST":
                const requestUserName = notification.RegistrationRequestNotification?.RegistrationRequest.name;
                return (
                    <div className={'max-w-[90%] text-xs opacity-60'}>
                        <div>
                            Оформлено запит на реєстрацію
                        </div>
                        <div>
                            користувачем "{requestUserName}"
                        </div>
                    </div>
                )
            case "EVENT":
                const isMember = notification.EventTicketNotification?.EventTicket.Member?.id
                const memberName = notification.EventTicketNotification?.EventTicket.Member?.textFields.name;
                const eventUserName = notification.EventTicketNotification?.EventTicket.name;
                const status = notification.EventTicketNotification?.EventTicket.verified;
                const eventName = notification.EventTicketNotification?.EventTicket.Event?.textFields.title;

                return (
                    <div className={'max-w-[90%] text-xs opacity-60'}>
                        <div>
                            Оформлено запис на подію
                        </div>
                        <div>
                            {eventName}
                        </div>
                        <div>
                            {isMember ? "членкинею" : "корисутвачем"} "{isMember ? memberName : eventUserName}"
                        </div>
                        <div>
                            Статус - {status ? "Оплачено" : "Не оплачено"}
                        </div>
                    </div>
                )
        }
    }

    const getNotificationLink = () => {
        switch (notification.type) {
            case "SERVICE":
                const serviceId = notification.ServiceNotification?.ArticleRequest.Article.serviceId;
                const articleId = notification.ServiceNotification?.ArticleRequest.articleId;
                return `/adminpanel/services/${serviceId}/${articleId}/requests`
            case "REQUEST":
                return `/adminpanel/requests`
            case "EVENT":
                const eventId = notification.EventTicketNotification?.EventTicket.eventId;
                return `/adminpanel/events/${eventId}/tickets`
        }
    }

    const type = getType()

    const cardRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (!cardRef?.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                loadMore();
                observer.unobserve(entry.target);
            }
        }, {threshold: 1});

        observer.observe(cardRef.current);
    }, [isLast]);


    return (
        <Link href={getNotificationLink()} onClick={close}>
            <Card ref={cardRef} className={'p-4 flex justify-between items-center'}>
                <div className={'flex flex-col gap-3 w-full'}>
                    <div>
                        {type}
                    </div>
                    {renderNotificationDescription()}
                    <div className={'opacity-30 text-xs'}>
                        {date}
                    </div>
                </div>
                {notification.status === 'UNREAD' &&
                    <div className={'flex justify-center items-center'}>
                        <div className={'bg-pink-500 rounded-full h-2 w-2'}>
                        </div>
                    </div>
                }
            </Card>
        </Link>

    );
};

export default NotificationItem;