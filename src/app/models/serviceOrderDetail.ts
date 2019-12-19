import { Calendar } from './calendar';
import { ServiceDetailResource } from './serviceDetailResource';



export class ServiceOrderDetail {
    id: string;
    ServiceDetailId: string;
    ServiceOrderId: string;
    duration: string;
    numberWorkers: number;
    amount: number; 
    status: string;
    calendars: Array < Calendar > = new Array < Calendar >();
    serviceDetailResource: Array < ServiceDetailResource > = new Array < ServiceDetailResource >();

}
