import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Phone } from '../../../models/phone';


@Injectable()
export class PhoneService extends HeaderService{

	url: string = environment.api + 'phone';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(phone: Phone): Observable<any>{
		let params = JSON.stringify(phone);
		return this.http.post(this.url+"/"+phone.UserId, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	AllPhoneUser(userID:Number): Observable<any>{
		return this.http.get(this.url+'/'+userID, {headers: this.header});
	}

	One(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(phone:any): Observable<any>{
		let params = JSON.stringify(phone);
		return this.http.put(this.url+"/"+phone.id, params, {headers: this.header});
	}

	deleteAll(): Observable<any>{
		return this.http.delete(this.url, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
