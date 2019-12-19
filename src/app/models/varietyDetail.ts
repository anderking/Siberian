import { ServiceDetail } from "./serviceDetail";

export class VarietyDetail{
	id:string;
	VarietyEquipinfraId:string;
	name: string;
  	description:string;
  	status:string;
    serviceDetail: Array < ServiceDetail > = new Array < ServiceDetail >();

}
