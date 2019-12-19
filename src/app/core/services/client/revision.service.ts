import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Revision } from '../../../models/revision';

@Injectable()
export class RevisionService extends HeaderService{

	url: string = environment.api + 'revision';

	constructor(
		private http: HttpClient
	){
		super();
	}

    create(revision: Revision): Observable<any>{
		let params = JSON.stringify(revision);
		return this.http.post(this.url, params, {headers: this.header});
	}

	update(revision:any): Observable<any>{
		let params = JSON.stringify(revision);
		return this.http.put(this.url+'/'+revision.id, params, {headers: this.header});
	}

	approve(id): Observable<any>{
		return this.http.put(this.url+'/'+id+'/approve', {}, {headers: this.header});
	}

	cancelled(id,motiveId,note?): Observable<any>{
		return this.http.put(this.url+'/'+id+'/cancelled/'+motiveId, {nota:note}, {headers: this.header});
	}

	diagnose(id:any, note:any): Observable<any>{
		return this.http.put(this.url+'/'+id+'/diagnose', {nota:note}, {headers: this.header});
	}

	rejected(id,motiveId,note?): Observable<any>{
		return this.http.put(this.url+'/'+id+'/reject/'+motiveId, {nota:note}, {headers: this.header});
	}

	irreparable(id,motiveId,note?): Observable<any>{
		return this.http.put(this.url+'/'+id+'/irreparable/'+motiveId, {nota:note}, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

	All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getRevisionUser(userid:any): Observable<any>{
		return this.http.get(this.url+"/user/"+userid, {headers: this.header});
	}

	getRevisionLender(lenderid:any): Observable<any>{
		return this.http.get(this.url+"/lender/"+lenderid, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}



}
