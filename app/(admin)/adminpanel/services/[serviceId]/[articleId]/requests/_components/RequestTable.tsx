import React, {FC} from 'react';
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import RefreshOnMount from "@/utils/RefreshOnMount";
import {FullArticleRequest} from "@/types/requests";
import RequestTableItem
    from "@/app/(admin)/adminpanel/services/[serviceId]/[articleId]/requests/_components/RequestTableItem";
import RefreshNotificationCountOnMount from "@/utils/RefreshNotificationCountOnMount";
import { ClientArticle } from "@/types";


interface IEventTableProps {
    requests: ClientArticle["requests"]
}
const RequestTable: FC<IEventTableProps> = ({
                                              requests
                                          }) => {
    return (
        <Table className={'mt-8'}>
            <RefreshOnMount />
            <RefreshNotificationCountOnMount />
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">№</TableHead>
                    <TableHead>Ім`я</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Коментар</TableHead>
                    <TableHead>Членкиня</TableHead>
                    <TableHead>Час</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    requests?.map((item, i) => (
                        <RequestTableItem key={i} request={item as ClientArticle["requests"][number]} number={i+1} />
                    ))
                }
            </TableBody>

        </Table>
    );
};

export default RequestTable;