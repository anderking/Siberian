import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Group } from '../../../models/group';


@Injectable()
export class GroupService extends HeaderService{

	url: string = environment.api + 'group';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(group: Group): Observable<any>{
		let params = JSON.stringify(group);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(group:any): Observable<any>{
		let params = JSON.stringify(group);
		return this.http.put(this.url+'/'+group.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
