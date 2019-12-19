import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Category } from '../../../models/category';


@Injectable()
export class CategoryService extends HeaderService{

	url: string = environment.api + 'category';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(category: Category): Observable<any>{
		let params = JSON.stringify(category);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(category:any): Observable<any>{
		let params = JSON.stringify(category);
		return this.http.put(this.url+'/'+category.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

	addSubcategory(categoryId:any,subcategories:any): Observable<any>{
		return this.http.put(this.url+'/'+categoryId, {subcategories: subcategories}, {headers: this.header});
	}
 
	deleteSubcategory(CategoryId:any, SubcategoryId:any): Observable<any>{
		return this.http.delete(this.url+"/"+CategoryId+"/subcategory/"+SubcategoryId, {headers: this.header});
	}

	
}
