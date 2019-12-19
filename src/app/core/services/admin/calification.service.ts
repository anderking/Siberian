import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Calification } from '../../../models/calification';

@Injectable({
  providedIn: 'root'
})
export class CalificationService extends HeaderService {

  url: string = environment.api + 'qualification';

	constructor(
		private http: HttpClient
	){
		super();
	}

	create(calification: Calification): Observable<any>{
		let params = JSON.stringify(calification);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(calification:any): Observable<any>{
		let params = JSON.stringify(calification);
		return this.http.put(this.url+'/'+calification.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}
}
