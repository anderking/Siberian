import { Parametro } from "./parametro";

export class Promotion{
	id:string;
	name:string;
	description:string;
	type:string;
	EquipinfraId:string;
	SubcategoryId:string;
	percentDiscount:number;
	dateStart:string;
	dateEnd:string;
  	status:string;
	parameters: Array < Parametro > = new Array < Parametro >();
	createdAt:Date;
	updateAt:Date;

}
