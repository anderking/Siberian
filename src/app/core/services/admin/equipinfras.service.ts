import { Injectable } from '@angular/core';
import { HeaderService } from '../header.service';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'src/environments/environment';
import { Equipinfras } from '../../../models/equipinfras';


@Injectable()
export class EquipinfrasService extends HeaderService{

	url: string = environment.api + 'equipinfras';
	url2: string = environment.api + 'equipinfras/variety';


	constructor(
		private http: HttpClient
	){
		super();
	}

	create(equipinfras: Equipinfras): Observable<any>{
		let params = JSON.stringify(equipinfras);
		return this.http.post(this.url, params, {headers: this.header});
	}

	addVariety(VarietyId:any,EquipinfraId:any): Observable<any>{
		return this.http.post(this.url2, { VarietyId: VarietyId, EquipinfraId: EquipinfraId} ,{headers: this.header});
	}

    All(): Observable<any>{
		return this.http.get(this.url, {headers: this.header});
	}

	getOne(id:Number): Observable<any>{
		return this.http.get(this.url+"/"+id, {headers: this.header});
	}

    update(equipinfras:any): Observable<any>{
		let params = JSON.stringify(equipinfras);
		return this.http.put(this.url+'/'+equipinfras.id, params, {headers: this.header});
	}

	deleteOne(id): Observable<any>{
		return this.http.delete(this.url+'/'+id, {headers: this.header});
	}

	deleteVariety(EquipinfraId:any, VarietyId:any): Observable<any>{
		return this.http.delete(this.url+"/"+EquipinfraId+"/variety/"+VarietyId, {headers: this.header});
	}

}
