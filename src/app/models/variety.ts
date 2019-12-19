import { Equipinfras } from "./equipinfras";

export class Variety{
	id:string;
	VarietyEquipinfras_id:string;
	name: string;
  	description:string;
  	status:string;
	equipinfras: Array < Equipinfras > = new Array < Equipinfras >();
	createdAt:Date;
	updateAt:Date;

}
