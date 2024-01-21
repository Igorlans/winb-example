'use client'
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const RefreshOnMount = () => {
    const router= useRouter()

    useEffect(() => {
        router.refresh()
    }, []);

    return null
};

export default RefreshOnMount;