import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class CatalogueService extends HeaderService{

	url: string = environment.api + 'catalogue';
	url2: string = environment.api + 'catalog';
	url3: string = environment.api + 'category';
	url4: string = environment.api + 'subcategory';
	url5: string = environment.api + 'equipinfras';
	url6: string = environment.api + 'variety';


	constructor(
		private http: HttpClient
	){
		super();
	}

    getCategories(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getEquipinfras(id:Number): Observable<any>{
		return this.http.get(this.url+"/equipinfras/"+id, {headers: this.header});
	}

	getSubcategory(id:Number): Observable<any>{
		return this.http.get(this.url+"/subcategory/"+id, {headers: this.header});
	}

	buscar(n:string,s:string): Observable<any>{
		return this.http.get(this.url2+"/"+n+"/"+s, {headers: this.header});
	}

	getCategory(id:any): Observable<any>{
		return this.http.get(this.url3+"/"+id, {headers: this.header});
	}

	getSubcategoryOne(id:any): Observable<any>{
		return this.http.get(this.url4+"/"+id, {headers: this.header});
	}

	getEquipinfrasOne(id:any): Observable<any>{
		return this.http.get(this.url5+"/"+id, {headers: this.header});
	}

	getVarietyOne(id:any): Observable<any>{
		return this.http.get(this.url6+"/"+id, {headers: this.header});
	}

}
