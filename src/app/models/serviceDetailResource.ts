import { Resource } from "./resource";
import { ServiceOrderDetail } from "./serviceOrderDetail";
import { Activity } from "./activity";

export class ServiceDetailResource {
	id:string;
    ServiceDetailId: string;
    ResourceId: string;
    quantity: number;
    activities: Array < Activity > = new Array < Activity >();
    resources: Array < Resource > = new Array < Resource >();
}
