import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';


@Injectable()
export class ChangeRoleService extends HeaderService{

	url: string = environment.api + 'user';


	constructor(
		private http: HttpClient
	){
		super();
	}

	changeRole(uid,rid): Observable<any>{
		return this.http.put(this.url+'/'+uid+'/role/'+rid, {},{headers: this.header});
	}


}
