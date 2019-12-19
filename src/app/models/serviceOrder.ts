import { Revision } from './revision';
import { ServiceOrderDetail } from './serviceOrderDetail';

export class ServiceOrder {
    id: string;
    warrantyTime: string;
    amount: number;
    status: string;
    RevisionId:string;
    serviceOrderDetails: Array < ServiceOrderDetail > = new Array < ServiceOrderDetail >();
    createdAt:Date;
    updatedAt:Date;
}
