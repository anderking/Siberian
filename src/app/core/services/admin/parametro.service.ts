import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Parametro } from '../../../models/parametro';


@Injectable()
export class ParametroService extends HeaderService{

	url: string = environment.api + 'parameter';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(parametro: Parametro): Observable<any>{
		let params = JSON.stringify(parametro);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(parametro:any): Observable<any>{
		let params = JSON.stringify(parametro);
		return this.http.put(this.url+'/'+parametro.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
