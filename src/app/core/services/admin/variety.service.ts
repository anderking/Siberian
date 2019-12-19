import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Variety } from '../../../models/variety';


@Injectable()
export class VarietyService extends HeaderService{

	url: string = environment.api + 'variety';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(variety: Variety): Observable<any>{
		let params = JSON.stringify(variety);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(variety:any): Observable<any>{
		let params = JSON.stringify(variety);
		return this.http.put(this.url+'/'+variety.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
