import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Componentt } from '../../../models/componentt';


@Injectable()
export class ComponentService extends HeaderService{

	url: string = environment.api + 'component';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(component: Componentt): Observable<any>{
		let params = JSON.stringify(component);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(component:any): Observable<any>{
		let params = JSON.stringify(component);
		return this.http.put(this.url+'/'+component.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
