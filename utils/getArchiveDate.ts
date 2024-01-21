export const getArchiveDate = () => {
    const currentDate = new Date();
    const nextDay = new Date();
    nextDay.setDate(currentDate.getDate() - 1);
    return  String(nextDay.getTime())
}