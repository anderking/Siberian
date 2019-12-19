import { ServiceDetail } from "./serviceDetail";

export class Componentt{
	id:string;
	name: string;
  	description:string;
  	status:string;
    serviceDetails: Array < ServiceDetail > = new Array < ServiceDetail >();

}