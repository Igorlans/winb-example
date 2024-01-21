export const API_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_API_URL as string : 'http://localhost:3000' || 'http://localhost:3000' as string
export const mainCurrency = 'UAH'
export const notificationPageSize = Number(process.env.NEXT_PUBLIC_NOTIFICATION_PAGE_SIZE) || 10