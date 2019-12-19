import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Subcategory } from '../../../models/subcategory';


@Injectable()
export class SubcategoryService extends HeaderService{

	url: string = environment.api + 'subcategory';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(subcategory: Subcategory): Observable<any>{
		let params = JSON.stringify(subcategory);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(subcategory:any): Observable<any>{
		let params = JSON.stringify(subcategory);
		return this.http.put(this.url+'/'+subcategory.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
