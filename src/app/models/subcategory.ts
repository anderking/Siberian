import { Equipinfras } from "./equipinfras";

export class Subcategory{
	id:string;
  	name: string;
  	description:string;
  	CategoryId:string;
  	status:string;
	equipinfras: Array < Equipinfras > = new Array < Equipinfras >();
	createdAt:Date;
	updateAt:Date;

}
