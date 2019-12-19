import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';

@Injectable()
export class FunctionService extends HeaderService{

	url: string = environment.api + 'function';


	constructor(
		private http: HttpClient
	){
		super();
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

}
