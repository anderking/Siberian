import { Subcategory } from "./subcategory";
import { Variety } from "./variety";

export class Equipinfras{
	id:string;
	name: string;
	image_url:string;
  	description:string;
	status:string;
	type: string;
	SubcategoryId:string;
	subcategory: Array < Subcategory > = new Array < Subcategory >();
	varieties: Array < Variety > = new Array < Variety >();
	createdAt:Date;
	updateAt:Date;

}
