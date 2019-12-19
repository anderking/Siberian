import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Company } from '../../../models/company';

@Injectable()
export class CompanyService extends HeaderService{

	url: string = environment.api + 'company';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(company: Company): Observable<any>{
		let params = JSON.stringify(company);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

    update(company:any): Observable<any>{
		let params = JSON.stringify(company);
		return this.http.put(this.url, params, {headers: this.header});
	}



}