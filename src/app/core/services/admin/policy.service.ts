import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Policy } from '../../../models/policy';


@Injectable()
export class PolicyService extends HeaderService{

	url: string = environment.api + 'policy';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(policy: Policy): Observable<any>{
		let params = JSON.stringify(policy);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(policy:any): Observable<any>{
		let params = JSON.stringify(policy);
		return this.http.put(this.url+'/'+policy.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
