import Image from "next/image";
import Link from "next/link";
import IconInst from "@/components/ui/custom/iconInst";
import IconFacebook from "@/components/ui/custom/iconFacebook";
import IconTwitter from "@/components/ui/custom/iconTwitter";
import { getTranslations } from "next-intl/server";

const Contact = async () => {

    const t = await getTranslations("About")

    return ( 
        <div className="relative w-full h-96 overflow-hidden">
            <Image
                src="/images/contactCover.png"
                alt="LeadMagnet"
                fill={true}
                style={{objectFit: 'cover'}}
            />

            <Image
                src="/images/phone.png"
                width={380}
                height={380}
                className="absolute w-[200px] md:w-[250px] lg:w-[300px] xl:w-[380px] right-[-100px] bottom-0 md:left-0"
                style={{objectFit: 'cover'}}
                alt="Event"
            />

            <div className="absolute w-full top-1/2 left-1/2" style={{transform: 'translate(-50%, -50%)'}}>
                <div className="absotute z-50 text-center flex items-center flex-col">
                    <h2 className="mb-2 md:mb-7 font-title">
                        { t("join") }
                    </h2>
                    <p className="max-w-[838px] mb-4 md:mb-12 font-subtitle">
                        { t("join_desc1") }<br/>
                        { t("join_desc2") }
                    </p>
                    <div className="flex items-center gap-10 md:mt-[20px] w-100 justify-center">
                        <Link href={"https://www.instagram.com/winb.com_ua/?img_index=1"} target="_blank">
                        <div className="cursor-pointer hover:opacity-70 duration-300">
                            <IconInst
                                size="w-[25px] md:w-[30px] lg:w-[40px]"
                                prop="fill-customPink"
                            />
                        </div>
                        </Link>
                        <Link href={"https://www.facebook.com/WomeninBusinessUP/"} target="_blank">
                        <div className="cursor-pointer hover:opacity-70 duration-300">
                            <IconFacebook
                                size="w-[25px] md:w-[30px] lg:w-[40px]"
                                prop="fill-customPink"
                            />
                        </div>
                        </Link>
                        {/* <Link href={"#"}>
                        <div className="cursor-pointer hover:opacity-70 duration-300">
                            <IconTwitter
                                size="w-[25px] md:w-[30px] lg:w-[40px]"
                                prop="fill-customPink"
                            />
                        </div>
                        </Link> */}
                    </div>
                </div>
            </div>

            <Image
                src="/images/handsPhone.png"
                width={700}
                height={700}
                className="absolute md:w-[500px] lg:w-[600px] xl:w-[700px] rotate-180 w-[250px] left-[-80px] top-0 md:bottom-0 md:rotate-0 md:top-auto md:bottom-0 md:left-auto md:right-[-100px]"
                style={{objectFit: 'cover'}}
                alt="Event"
            />
            
        </div>
     );
};

export default Contact;