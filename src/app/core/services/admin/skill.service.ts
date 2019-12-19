import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Skill } from '../../../models/skill';


@Injectable()
export class SkillService extends HeaderService{

	url: string = environment.api + 'skill';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(skill: Skill): Observable<any>{
		let params = JSON.stringify(skill);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(skill:any): Observable<any>{
		let params = JSON.stringify(skill);
		return this.http.put(this.url+'/'+skill.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
    }
    
    //El metodo en definido recibe un id por parametro, no se de donde lo recibe.
	/*
	getUsersbyVarietyDetail(id): Observable<any>{
        return this.http.get(this.url+'/users/service', {headers: this.header});
	}
	*/
}
