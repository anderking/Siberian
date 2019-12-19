import { ServiceDetail } from "./serviceDetail";

export class Activity{
	id:string;
	name: string;
    description:string;
    estimatedTime:string;
    difficultyDegree:string;
  	status:string;
    serviceDetails: Array < ServiceDetail > = new Array < ServiceDetail >();
    createdAt:Date;
  	updatedAt:Date;
}