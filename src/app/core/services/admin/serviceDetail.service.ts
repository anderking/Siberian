import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { ServiceDetail } from '../../../models/serviceDetail';


@Injectable()
export class ServiceDetailService extends HeaderService{

	url: string = environment.api + 'serviceDetail';

	url2: string = environment.api + 'report/serviceDetails?';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(serviceDetail: ServiceDetail): Observable<any>{
		let params = JSON.stringify(serviceDetail);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getAll(): Observable<any>{
		return this.http.get(this.url2, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(serviceDetail:any): Observable<any>{
		console.log(serviceDetail);
		let params = JSON.stringify(serviceDetail);
		console.log(params);
		return this.http.put(this.url+'/'+serviceDetail.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

	addActivity(serviceId:any,activities:any): Observable<any>{
		return this.http.put(this.url+'/'+serviceId, {activities: activities}, {headers: this.header});
	}

	addPolicy(serviceId:any,policies:any): Observable<any>{
		return this.http.put(this.url+'/'+serviceId, {policies: policies}, {headers: this.header});
	}

	addResource(serviceId:any,resources:any): Observable<any>{
		return this.http.put(this.url+'/'+serviceId, {resources: resources}, {headers: this.header});
	}

	addSkill(serviceId:any,skills:any): Observable<any>{
		return this.http.put(this.url+'/'+serviceId, {skills: skills}, {headers: this.header});
	}

}
