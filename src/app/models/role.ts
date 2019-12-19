import { Function } from "./function";
export class Role{
	id:string;
  	name: string;
  	description:string;
  	status:string;
	  functions: Array < number >;
	createdAt:Date;
  	updatedAt:Date;
}