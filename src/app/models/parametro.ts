import { User } from "./user";
import { Promotion } from "./promotion";

export class Parametro{
	id:string;
  	name: string;
  	description:string;
  	GroupId:string;
  	status:string;
  	users: Array < User > = new Array < User >();
	promotions: Array < Promotion > = new Array < Promotion >();
	createdAt:Date;
  	updatedAt:Date;
}
