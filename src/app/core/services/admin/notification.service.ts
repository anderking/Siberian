import { Injectable } from "@angular/core";
import { HeaderService } from "../header.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "src/environments/environment";
import { Notification } from "../../../models/notification";

@Injectable({
  providedIn: "root"
})
export class NotificationService extends HeaderService {
  url: string = environment.api + "notification";
  url2: string = environment.api + "usernotifications";

  constructor(private http: HttpClient) {
    super();
  }

  create(notification: Notification): Observable<any> {
    let params = JSON.stringify(notification);
    return this.http.post(this.url, params, { headers: this.header });
  }

  All(): Observable<any> {
    return this.http.get(this.url, { headers: this.header });
  }

  getOne(id: Number): Observable<any> {
    return this.http.get(this.url + "/" + id, { headers: this.header });
  }

  update(notification: any): Observable<any> {
    let params = JSON.stringify(notification);
    return this.http.put(this.url + "/" + notification.id, params, {
      headers: this.header
    });
  }

  deleteOne(id): Observable<any> {
    return this.http.delete(this.url + "/" + id, { headers: this.header });
  }

  getUserNotifications(userid:any): Observable<any>{
    return this.http.get(this.url2+"/"+userid, {headers: this.header});
  }

}
