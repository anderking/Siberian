import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { User } from '../../../models/user';


@Injectable()
export class UserService extends HeaderService {

  url: string = environment.api + 'user';
  url2: string = environment.api + 'lender';


  constructor(
    private http: HttpClient
  ) {
    super();
  }

  create(user: User): Observable < any > {
    let params = JSON.stringify(user);
    return this.http.post(this.url, params, {
      headers: this.header
    });
  }

  All(): Observable < any > {
    return this.http.get(this.url, {
      headers: this.header
    });
  }

  getActives(): Observable < any > {
    return this.http.get(this.url + '/status/active', {
      headers: this.header
    });
  }

  getInactives(): Observable < any > {
    return this.http.get(this.url + '/status/inactive', {
      headers: this.header
    });
  }

  getRoles(id): Observable < any > {
    return this.http.get(this.url + '/roles/' + id, {
      headers: this.header
    });
  }

  getOne(id: Number): Observable < any > {
    return this.http.get(this.url + '/' + id, {
      headers: this.header
    });
  }

  getFunctions(id: number): Observable < any > {
    return this.http.get(this.url + '/' + id + '/function', {
      headers: this.header
    });
  }

  update(user: any): Observable < any > {
    let params = JSON.stringify(user);
    return this.http.put(this.url + '/' + user.id, params, {
      headers: this.header
    });
  }

  delete(id): Observable < any > {
    return this.http.delete(this.url + '/' + id, {
      headers: this.header
    });
  }

  active(id): Observable < any > {
    return this.http.put(this.url + '/' + id + '/activate', {}, {
      headers: this.header
    });
  }

  inactive(id): Observable < any > {
    return this.http.put(this.url + '/' + id + '/inactivate', {}, {
      headers: this.header
    });
  }

  changeRole(uid, rid): Observable < any > {
    return this.http.put(this.url + '/' + uid + '/role/' + rid, {}, {
      headers: this.header
    });
  }

  getAllLender(): Observable < any > {
    return this.http.get(this.url2, {
      headers: this.header
    });
  }

  getOneLender(id: any): Observable < any > {
    return this.http.get(this.url2 + '/' + id, {
      headers: this.header
    });
  }

  setSkillLender(lenderId: any, skills: any): Observable < any > {
    return this.http.put(this.url2 + '/' + lenderId, {
      skills: skills
    }, {
      headers: this.header
    });
  }


}
