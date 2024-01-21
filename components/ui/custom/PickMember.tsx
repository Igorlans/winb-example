import {FC, useMemo, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import FormCard from "@/components/ui/custom/FormCard";
import Title from "@/components/adminpanel/Title";
import {ScrollArea} from "@/components/ui/scroll-area";
import { ClientMember } from "@/types";
import { cn } from "@/lib/utils";


export interface IdObject {
    id: string
}
interface IPickMemberProps {
    members: ClientMember[];
    value: IdObject[] | undefined;
    disabled?: boolean;
    setValue: (newValue: IdObject[]) => void
}
const PickMember:FC<IPickMemberProps> = ({members, value, setValue, disabled}) => {

    const [open, setOpen] = useState(false)

    const selectedMembers: ClientMember[] = useMemo(() => {
        const membersArr = value?.map(obj => members.find(member => member.id === obj.id))
        return membersArr?.filter(member => {
            if (!member) {
                return false
            } else {
                return true
            }
        }) as ClientMember[]
    }, [value, members])


    const membersWithoutSelected: ClientMember[] = useMemo(() => {
        return members.filter(member => {
            const isSelected = value?.some(obj => obj.id === member.id)
            if (isSelected) {
                return false
            } else {
                return true
            }
        }) as ClientMember[]
    }, [value, members, selectedMembers])


    const addMember = (memberId: string) => {
        if (value) {
            const newMembers = [...value, {id: memberId}]
            setValue(newMembers)
        }

        // setOpen(false)
    }

    const removeMember = (memberId: string) => {
        if (value) {
            const newMembers = value.filter(member => member.id !== memberId)
            setValue(newMembers)
        }

        // setOpen(false)
    }

    // @ts-ignore
    return (
        <div>
            {selectedMembers?.length ?
                <MemberList disabled={disabled} title={'Вибрані членикині'} members={selectedMembers} onMemberClick={(member) => removeMember(member.id)} />
                : null
            }
            <Dialog open={open} onOpenChange={(newValue) => setOpen(newValue)}>
                <DialogTrigger disabled={disabled}>
                    <Button disabled={disabled} className={'mt-6'}>Вибрати членкинь</Button>
                </DialogTrigger>
                <DialogContent className={'max-w-[900px] w-full'}>
                    <DialogHeader>
                        <DialogTitle>Членкині</DialogTitle>
                        <DialogDescription>Виберіть членкинь, які надають послуги</DialogDescription>
                    </DialogHeader>
                    <div className={'grid grid-cols-1 md:grid-cols-2 gap-5'}>
                        <MemberList disabled={disabled} title={'Всі членикині'} members={membersWithoutSelected} onMemberClick={(member) => addMember(member.id)} />
                        <MemberList disabled={disabled} title={'Вибрані членкині'} members={selectedMembers} onMemberClick={(member) => removeMember(member.id)} />
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PickMember;


interface IMemberListProps {
    members?: ClientMember[];
    title: string;
    disabled?: boolean;
    onMemberClick: (member: ClientMember) => void;
}

const MemberList: FC<IMemberListProps> = ({title, members, onMemberClick, disabled = false}) => {
    return (
        <FormCard className={'p-6'}>
            <Title className={'text-base mb-4'}>{title}</Title>
            <ScrollArea className={'h-[30vh]'}>
                <div className={'flex flex-col gap-3 '}>
                    {members?.map(member =>
                        <FormCard className={cn('p-4', !disabled && "cursor-pointer")} onClick={() => {
                            if(disabled) return;
                            onMemberClick(member)
                        }}>
                            <div>
                                {member.textFields.name }
                            </div>
                            <div className={'text-xs opacity-40'}>
                                {member.textFields.status }
                            </div>
                        </FormCard>
                    )}
                </div>

            </ScrollArea>
        </FormCard>
    )
}