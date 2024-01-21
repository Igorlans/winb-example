"use client";

import { Drawer } from "vaul";
import { Button } from "@/components/ui/button";
import { LuSettings2 } from "react-icons/lu";
import { FC, useState } from "react";
import { Filter } from "@/app/(main)/[locale]/members/_components/filters/Filter";
import { SelectItem as SelectItemType } from "@/components/ui/custom/FormSelect";

type Props = {
    regionOptions: SelectItemType[],
    businessOptions: SelectItemType[],
    statusOptions: SelectItemType[]
}

export const DrawerFilter: FC<Props> = (props) => {

    const [open, setOpen] = useState(false)

    return (
        <div className='flex md:hidden w-full items-center justify-between mb-9 h-fit'>
            <Drawer.Root open={open} onOpenChange={open => setOpen(open)}>
                <Drawer.Trigger>
                    <Button
                        asChild
                        variant="outline"
                    >
                        <div className='flex items-center gap-x-3'>
                            <LuSettings2/>
                            Фільтри
                        </div>
                    </Button>
                </Drawer.Trigger>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[80%] mt-24 fixed bottom-0 left-0 right-0 z-50">
                        <div className="p-4 bg-white rounded-t-[10px] flex-1">
                            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                            <div>
                                <Filter {...props} closeDrawer={() => setOpen(false)} />
                            </div>
                        </div>
                        <div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
                            <div className="flex gap-6 justify-end max-w-md mx-auto h-4">
                            </div>
                        </div>
                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </div>
    )
}