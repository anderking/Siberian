import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Location } from '../../../models/location';


@Injectable()
export class LocationService extends HeaderService{

	url: string = environment.api + 'location';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(location: Location): Observable<any>{
		let params = JSON.stringify(location);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	AllLocationUser(userID:Number): Observable<any>{
		return this.http.get(this.url+'/'+userID, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/one/"+id, {headers: this.header});
	}

    update(location:any): Observable<any>{
		let params = JSON.stringify(location);
		return this.http.put(this.url+"/"+location.id, params, {headers: this.header});
	}

	deleteAll(): Observable<any>{
		return this.http.delete(this.url, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
