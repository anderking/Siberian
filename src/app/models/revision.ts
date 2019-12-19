import { Calendar } from "./calendar";

export class Revision{
	  id:string;
  	UserId: number;
  	VarietyDetailId:number;
  	LocationId:number;
  	description:string;
  	imageRequestUrl:string;
  	status:string;
	  calendars: Array < Calendar > = new Array < Calendar >();
	  createdAt:Date;
	  updatedAt:Date;
}
