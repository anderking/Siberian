import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Promotion } from '../../../models/promotion';


@Injectable()
export class PromotionService extends HeaderService{

	url: string = environment.api + 'promotion';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(promotion: Promotion): Observable<any>{
		let params = JSON.stringify(promotion);
		return this.http.post(this.url, params, {headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(promotion:any): Observable<any>{
		let params = JSON.stringify(promotion);
		return this.http.put(this.url+'/'+promotion.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

	addParameters(promotionId:any,parameters:any): Observable<any>{
		return this.http.put(this.url+'/'+promotionId, {parameters: parameters}, {headers: this.header});
	}

	getPromotionsBySubcategory(subcategoryId:any): Observable<any>{
		return this.http.get(this.url+"/subcategory/"+subcategoryId, {headers: this.header});
	}

	getPromotionsByEquipInfras(equipinfrasId:any): Observable<any>{
		return this.http.get(this.url+"/equipinfras/"+equipinfrasId, {headers: this.header});
	}

	getPromotionsByEquipInfrasByUser(equipinfrasId:any,userId:any): Observable<any>{
		return this.http.get(this.url+"/equipinfras/"+equipinfrasId+"/user/"+userId, {headers: this.header});
	}

}
