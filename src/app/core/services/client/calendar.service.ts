import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Calendar } from '../../../models/calendar';

@Injectable()
export class CalendarService extends HeaderService{

	url: string = environment.api + 'calendar';

	constructor(
		private http: HttpClient
	){
		super();
	}

	All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	AllBetweenDates(sDate:any,eDate:any): Observable<any>{
		return this.http.get(this.url+'/'+sDate+'/'+eDate, {headers: this.header});
	}

	AllLenderBetweenDates(lenderId:any,sDate:any,eDate:any): Observable<any>{
		return this.http.get(this.url+'/'+lenderId+'/'+sDate+'/'+eDate, {headers: this.header});
	}

	getAllSerivceLender(lenderId:any): Observable<any>{
		return this.http.get(this.url+"/lender/"+lenderId, {headers: this.header});
	}

	getAllLenderFreeRevision(date:any,turn:any): Observable<any>{
		return this.http.get(this.url+"/lendersFree/"+date+"/"+turn, {headers: this.header});
	}

	create(calendar: Calendar): Observable<any>{
		let params = JSON.stringify(calendar);
		return this.http.post(this.url, params, {headers: this.header});
	}

	execute(id): Observable<any>{
		return this.http.put(this.url+'/'+id+'/execute', {}, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
