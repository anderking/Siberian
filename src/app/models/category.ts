import { Subcategory } from "./subcategory";

export class Category{
	id:string;
  	name: string;
  	description:string;
  	status:string;
	  subcategories: Array < Subcategory > = new Array < Subcategory >();
	  createdAt:Date;
	  updatedAt:Date;
}
