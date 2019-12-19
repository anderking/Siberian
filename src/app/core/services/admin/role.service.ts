import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Role } from '../../../models/role';


@Injectable()
export class RoleService extends HeaderService{

	url: string = environment.api + 'role';
	url2: string = environment.api + 'user';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(role: Role): Observable<any>{
		let params = JSON.stringify(role);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(role:any): Observable<any>{
		let params = JSON.stringify(role);
		return this.http.put(this.url+"/"+role.id, params, {headers: this.header});
	}

	deleteAll(): Observable<any>{
		return this.http.delete(this.url, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+"/"+id, {headers: this.header});
	}

	changeRole(uid,rid): Observable<any>{
		return this.http.put(this.url2+'/'+uid+'/role/'+rid, {headers: this.header});
	}

	addFunctions(rid,functions): Observable<any>{
		return this.http.put(this.url+'/'+rid+'/functions',{ functions }, {headers: this.header});
	}

}
