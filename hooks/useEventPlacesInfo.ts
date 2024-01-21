import {useEffect, useState} from "react";
import {EventPlacesInfo} from "@/types/types";
import {apiRequest} from "@/utils/apiRequest";

const UseEventPlacesInfo = (eventId: string) => {
    const [eventPlacesInfo, setEventPlacesInfo] = useState<EventPlacesInfo | null>(null)


    useEffect(() => {
        (async () => {
            try {
                const placesInfo: EventPlacesInfo | undefined = await apiRequest({url: `/api/events/getPlacesInfo?id=${eventId}`, method: 'GET'})
                if (placesInfo) {
                    setEventPlacesInfo(placesInfo)
                }
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    return eventPlacesInfo
};

export default UseEventPlacesInfo;