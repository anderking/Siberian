import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { VarietyDetail } from '../../../models/varietyDetail';


@Injectable()
export class VarietyDetailService extends HeaderService{

	url: string = environment.api + 'varietyDetail';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(varietyDetail: VarietyDetail): Observable<any>{
		let params = JSON.stringify(varietyDetail);
		return this.http.post(this.url, params, {headers: this.header});
	}

	All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(varietyDetail:any): Observable<any>{
		let params = JSON.stringify(varietyDetail);
		return this.http.put(this.url+'/'+varietyDetail.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

	addService(id,services): Observable<any>{
		return this.http.put(this.url+'/'+id+'/service', {services:services}, {headers: this.header});
	}

	getAllService(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id+"/service", {headers: this.header});
	}

}
