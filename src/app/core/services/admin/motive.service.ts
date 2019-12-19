import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Motive } from '../../../models/motive';


@Injectable()
export class MotiveService extends HeaderService{

	url: string = environment.api + 'motive';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(motive: Motive): Observable<any>{
		let params = JSON.stringify(motive);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(motive:any): Observable<any>{
		let params = JSON.stringify(motive);
		return this.http.put(this.url+'/'+motive.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
