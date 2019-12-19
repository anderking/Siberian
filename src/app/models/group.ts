import { Parametro } from "./parametro";

export class Group{
	id:string;
  	name: string;
  	description:string;
  	status:string;
	parameters: Array < Parametro > = new Array < Parametro >();
	createdAt:Date;
  	updatedAt:Date;

}
