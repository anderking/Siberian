import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { ServiceDetail } from 'src/app/models/serviceDetail';
import { ServiceDetailService } from 'src/app/core/services/admin/serviceDetail.service';
import { Componentt } from 'src/app/models/componentt';
import { ComponentService } from 'src/app/core/services/admin/component.service';
import { CategoryService } from 'src/app/core/services/admin/category.service';
import { SubcategoryService } from 'src/app/core/services/admin/subcategory.service';
import { EquipinfrasService } from 'src/app/core/services/admin/equipinfras.service';
import { VarietyService } from 'src/app/core/services/admin/variety.service';
import { VarietyDetailService } from 'src/app/core/services/admin/varietyDetail.service';

import { ActivityService } from 'src/app/core/services/admin/activity.service';
import { ResourceService } from 'src/app/core/services/admin/resource.service';
import { PolicyService } from 'src/app/core/services/admin/policy.service';
import { SkillService } from 'src/app/core/services/admin/skill.service';

import { SnackBarService } from 'src/app/core/services/snack-bar.service';


@Component({
	selector: 'sib-service-detail-create',
	templateUrl: './service-detail-create.component.html',
	styleUrls: ['./service-detail-create.component.scss']
})
export class ServiceDetailCreateComponent implements OnInit
{

	public serviceDetail:ServiceDetail;
	public serviceDetailOne:any;
	
	public serviceDetailCreate:any;
	
	public activities: any;
	public resources:any;
	public policies:any;
	public skills:any;

	public activitiesSelected:any;
	public resourcesSelected:any;
	public policiesSelected:any;
	public skillsSelected:any;


	public components:Componentt;
	public ComponentId:string;

	
	public types:any[];
	public typeSelected:string="";
	
	public total:Number;
	
	public failedConect:string;
	public message:string;

	public IdEquipinfras:any;

	public categorySelected:string = "";
	public subcategorySelected:string = "";
	public equipinfrasSelected:string = "";
	public varietySelected:string = "";
  	public varietyDetailSelected:string = "";

	public categories:any;
	public category:any;
	public subcategories:any;
	public subcategory:any;
	public equipinfras:any;
	public equipinfrasOne:any;
	public varieties:any;
	public variety:any;
	public varietiesForEquipinfras:any;
	public equipinfrasForVariety:any;
	public varietyDetails:any;
	public varietyDetail:any;
	public varietyDetailId:any;
	public serviceDetailsV:any;

	public serviceDetailSelected:any;

	public isCategory:boolean=false;
	public isSubcategory:boolean=false;
	public isEquipinfras:boolean=false;
	public isVariety:boolean=false;


	constructor
	(
		private _serviceDetailService: ServiceDetailService,
		private _componentService: ComponentService,
		private _categoryService: CategoryService,
		private _subcategoryService: SubcategoryService,
    	private _equipinfrasService: EquipinfrasService,
    	private _varietyService: VarietyService,
    	private _varietyDetailService: VarietyDetailService,
		private _activityService: ActivityService,
		private _resourceService: ResourceService,
		private _policyService: PolicyService,
		private _skillService: SkillService,
		private _router: Router,
		private _location: Location,
		private snackBar: SnackBarService
		) 
	{
		this.serviceDetail = new ServiceDetail();
		this.types =
		[
			{id:"Reparación",name:"Reparación"},
			{id:"Mantenimiento",name:"Mantenimiento"},
			{id:"Construcción",name:"Construcción"},
			{id:"Otros",name:"Otros"},
		];
	}

	ngOnInit()
	{
		this.getComponents();
		this.getCategories();
		this.getActivities();
		this.getResources();
		this.getPolicies();
		this.getSkills();

	}

	getComponents()
	{
		this._componentService.All().subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.components = response.components;
					this.ComponentId = "";
				}
				else
				{
					this.total = 0;
					this.message = response.message.text;
					console.log(this.message);
				}

			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	getActivities()
	{
		this._activityService.All().subscribe
		(
			response =>
			{
				if (response.status == true)
				{
					this.activities = response.activities;
					console.log(this.activities);
				}
				else
				{
					this.total = 0;
					this.message = response.message.text;
					console.log(this.message);
				}

			},
			error => 
			{
				console.log(<any>error);
				if (error instanceof HttpErrorResponse)
				{
					if (error.status === 0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	getResources()
	{
		this._resourceService.All().subscribe
		(
			response =>
			{
				if (response.status == true)
				{
					this.resources = response.resources;
					console.log(this.resources);
				}
				else
				{
					this.total = 0;
					this.message = response.message.text;
					console.log(this.message);
				}

			},
			error => 
			{
				console.log(<any>error);
				if (error instanceof HttpErrorResponse)
				{
					if (error.status === 0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	getPolicies()
	{
		this._policyService.All().subscribe
		(
			response =>
			{
				if (response.status == true)
				{
					this.policies = response.policies;
					console.log(this.policies);
				}
				else
				{
					this.total = 0;
					this.message = response.message.text;
					console.log(this.message);
				}

			},
			error => 
			{
				console.log(<any>error);
				if (error instanceof HttpErrorResponse)
				{
					if (error.status === 0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	getSkills()
	{
		this._skillService.All().subscribe
		(
			response =>
			{
				if (response.status == true)
				{
					this.skills = response.skills;
					console.log(this.skills);
				}
				else
				{
					this.total = 0;
					this.message = response.message.text;
					console.log(this.message);
				}

			},
			error => 
			{
				console.log(<any>error);
				if (error instanceof HttpErrorResponse)
				{
					if (error.status === 0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	getCategories()
	{
		this._categoryService.All().subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.categories = response.categories;
				}
				else
				{
					this.message = response.message.text;
					console.log(this.message);
				}

			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	getCategory(id)
	{
		this._categoryService.getOne(id).subscribe
		(
			response =>
			{
				this.category = response.category;
				this.subcategories = this.category.subcategories;
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
		)
	}

	getSubcategory(id)
	{
		this._subcategoryService.getOne(id).subscribe
		(
			response =>
			{
				this.subcategory = response.subcategory;
				this.equipinfras = this.subcategory.equipinfras;
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
		)
	}

	getEquipinfras(id)
	{
		this._equipinfrasService.getOne(id).subscribe
		(
			response =>
			{
				this.equipinfrasOne = response.equipinfras;
				this.varieties = response.equipinfras.varieties;
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	getEquipinfrasForVariety(id,event?)
	{
		this._equipinfrasService.getOne(id).subscribe
		(
			response =>
			{
				if (response.status==true)
				{
					this.equipinfrasForVariety = response.equipinfras;
					this.varietiesForEquipinfras = response.equipinfras.varieties;

					for (var i=0; i<this.varietiesForEquipinfras.length; i++)
					{
						if( this.varietiesForEquipinfras[i].id == event)
						{
							this.variety = response.equipinfras.varieties[i];
							this.varietyDetails = this.variety.varietyDetails;
						}
					}
				}
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	changeCategory(event)
	{
		this.isCategory=true;
		this.getCategory(event);
		this.subcategorySelected = "";
		this.equipinfrasSelected = "";
		this.varietySelected = "";
	  	this.varietyDetailSelected = "";
	}
	changeSubcategory(event)
	{
		this.isSubcategory=true;
		this.getSubcategory(event);
		this.equipinfrasSelected = "";
		this.varietySelected = "";
	  	this.varietyDetailSelected = "";
	}

	changeEquipinfras(event)
	{
		this.isEquipinfras=true;
		this.IdEquipinfras=event;
		this.getEquipinfras(event);
		this.varietySelected = "";
	  	this.varietyDetailSelected = "";
	}

	changeVariety(event)
	{
		this.isVariety=true;
		this.getEquipinfrasForVariety(this.IdEquipinfras,event);
	}

	changeVarietyDetail(event)
	{
		this.varietyDetailId = event;
	}



	register(form: NgForm)
	{
		if(form.valid)
		{
			this.serviceDetail.name = form.value.name;
			this.serviceDetail.note = form.value.note;
			this.serviceDetail.ComponentId= form.value.ComponentId;
			this.serviceDetail.estimatedPrice = form.value.estimatedPrice;
			this.serviceDetail.estimatedWarrantyTime = form.value.estimatedWarrantyTime;
			this.serviceDetail.serviceType = form.value.type;

			this._serviceDetailService.create(this.serviceDetail).subscribe
			(
				response =>
				{
					if (response.status==true)
					{
						this.serviceDetailCreate = response.serviceDetail;
						this.getServiceDetail(this.serviceDetailCreate.id);
						this.message = response.message.text;
						console.log(this.serviceDetailCreate);
						this.messageSnackBar(this.message);

						this.getVarietyDetail(this.varietyDetailId);
					}
					else
					{
						console.log(response);
						this.message = response.message.text;
						this.messageSnackBar(this.message);
					}
				},
				error =>
				{
					console.log(error);

					if(error instanceof HttpErrorResponse)
					{
						if(error.status===404)
						{
							this.message = error.error.message;
							console.log(error);
							this.messageSnackBar(this.message);
						}
					}else
					{
						
						console.log(error);
						
					}
				}
				);
		}
	}

	getServiceDetail(id)
	{
		this._serviceDetailService.getOne(id).subscribe
		(
			response =>
			{
				this.serviceDetailOne = response.serviceDetail;

				if(this.serviceDetailOne.activities)
				{
					this.activitiesSelected = [];
					for(let activity of this.serviceDetailOne.activities)
					{
						this.activitiesSelected.push(activity.id);
					}
				}

				if(this.serviceDetailOne.resources)
				{
					this.resourcesSelected = [];
					for(let resource of this.serviceDetailOne.resources)
					{
						this.resourcesSelected.push(resource.id);
					}
				}

				if(this.serviceDetailOne.policies)
				{
					this.policiesSelected = [];
					for(let policy of this.serviceDetailOne.policies)
					{
						this.policiesSelected.push(policy.id);
					}
				}

				if(this.serviceDetailOne.skills)
				{
					this.skillsSelected = [];
					for(let skill of this.serviceDetailOne.skills)
					{
						this.skillsSelected.push(skill.id);
					}
				}
			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	updateActivities(form: NgForm)
	{

		if(form.valid)
		{
			this._serviceDetailService.addActivity(this.serviceDetailOne.id,form.value.activities).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getServiceDetail(this.serviceDetailOne.id);
					}
					else
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getServiceDetail(this.serviceDetailOne.id);
					}
				},
				error =>
				{
					console.log(error);
					this.message  = error.error.message;
					this.snackBar.openSnackBar(this.message,'');
				}
				);
		}

	}

	updateResources(form: NgForm)
	{

		if(form.valid)
		{
			this._serviceDetailService.addResource(this.serviceDetailOne.id,form.value.resources).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getServiceDetail(this.serviceDetailOne.id);
					}
					else
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getServiceDetail(this.serviceDetailOne.id);
					}
				},
				error =>
				{
					console.log(error);
					this.message  = error.error.message;
					this.snackBar.openSnackBar(this.message,'');
				}
				);
		}

	}

	updatePolicies(form: NgForm)
	{

		if(form.valid)
		{
			this._serviceDetailService.addPolicy(this.serviceDetailOne.id,form.value.policies).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getServiceDetail(this.serviceDetailOne.id);
					}
					else
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getServiceDetail(this.serviceDetailOne.id);
					}
				},
				error =>
				{
					console.log(error);
					this.message  = error.error.message;
					this.snackBar.openSnackBar(this.message,'');
				}
				);
		}

	}

	updateSkills(form: NgForm)
	{

		if(form.valid)
		{
			this._serviceDetailService.addSkill(this.serviceDetailOne.id,form.value.skills).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getServiceDetail(this.serviceDetailOne.id);
					}
					else
					{
						console.log(response);
						this.message  = response.message.text;
						this.messageSnackBar(this.message);
						this.getServiceDetail(this.serviceDetailOne.id);
					}
				},
				error =>
				{
					console.log(error);
					this.message  = error.error.message;
					this.snackBar.openSnackBar(this.message,'');
				}
				);
		}

	}

	getVarietyDetail(id)
	{
		this._varietyDetailService.getAllService(id).subscribe
		(
			response =>
			{
				this.varietyDetail = response.varietyDetail;
				this.serviceDetailsV = this.varietyDetail.serviceDetail;
				this.serviceDetailSelected = [];

				if(this.serviceDetailsV)
				{
					for(let serviceDetailV of this.serviceDetailsV)
					{
						this.serviceDetailSelected.push(serviceDetailV.id);
					}
				}
				
				this.serviceDetailSelected.push(this.serviceDetailCreate.id);
				this.addService(this.varietyDetailId,this.serviceDetailSelected);

			},
			error =>
			{
				console.log(<any>error);
				if(error instanceof HttpErrorResponse)
				{
					if(error.status===0)
					{
						this.failedConect = Global.failed;
					}
				}
			}
			)
	}

	addService(varietyDetail, service)
	{
		this._varietyDetailService.addService(varietyDetail,service).subscribe
			(
				response =>
				{
					if(response.status==true)
					{
						//this.message  = 'Servicio Añadidos Correctamente';
						//this.snackBar.openSnackBar(this.message,'');
					}
					else
					{
						//this.message  = 'Ha ocurrido un error al asociar el servicio con el modelo';
						//this.snackBar.openSnackBar(this.message,'');
					}
				},
				error =>
				{
					console.log(error);
					this.message  = error.error.message;
					this.snackBar.openSnackBar(this.message,'');
				}
			);
	}

	messageSnackBar(message)
	{
		this.snackBar.openSnackBarSuccess(message);
	}
	goBack()
	{
		this._location.back();
	}

}
