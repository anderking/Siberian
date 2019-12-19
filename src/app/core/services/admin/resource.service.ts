import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Resource } from '../../../models/resource';


@Injectable()
export class ResourceService extends HeaderService{

	url: string = environment.api + 'resource';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(resource: Resource): Observable<any>{
		let params = JSON.stringify(resource);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

	getAllWhere(ids:any): Observable<any>{
		console.log(ids);
		return this.http.get(this.url+"/by/ids?ids=[1, 2]", {headers: this.header} );
	}

    update(resource:any): Observable<any>{
		let params = JSON.stringify(resource);
		return this.http.put(this.url+'/'+resource.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
 