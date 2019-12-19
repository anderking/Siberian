import { ServiceDetail } from "./serviceDetail";

export class Policy{
	id:string;
	name: string;
    description:string;
    actionPlan:string;
  	status:string;
    serviceDetails: Array < ServiceDetail > = new Array < ServiceDetail >();
    createdAt:Date;
  	updatedAt:Date;
}