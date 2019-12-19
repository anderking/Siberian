import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Question } from '../../../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService extends HeaderService {

  url: string = environment.api + 'question';

  constructor(
    private http: HttpClient
  ) { 
    super();
  }

  create(question: Question): Observable<any>{
		let params = JSON.stringify(question);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(question:any): Observable<any>{
		let params = JSON.stringify(question);
		return this.http.put(this.url+'/'+question.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

}
