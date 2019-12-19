import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Activity } from '../../../models/activity';


@Injectable()
export class ActivityService extends HeaderService{

	url: string = environment.api + 'activity';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(activity: Activity): Observable<any>{
		let params = JSON.stringify(activity);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(activity:any): Observable<any>{
		let params = JSON.stringify(activity);
		return this.http.put(this.url+'/'+activity.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
