import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {FormBuilder, FormControl, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import { Router, ActivatedRoute, Params } from '@angular/router';
import {Location} from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Global } from 'src/app/core/services/global';
import { SnackBarService } from '../../../../../../core/services/snack-bar.service';
import { DialogService } from '../../../../../../core/services/dialog.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';


import { User } from 'src/app/models/user';
import { UserService } from 'src/app//core/services/admin/user.service';
import { LocationService } from 'src/app/core/services/admin/location.service';
import { Revision } from 'src/app/models/revision';
import { RevisionService } from 'src/app/core/services/client/revision.service';
import { EquipinfrasService } from 'src/app/core/services/admin/equipinfras.service';
import { VarietyDetailService } from 'src/app/core/services/admin/varietyDetail.service';
import { CalendarService } from 'src/app/core/services/client/calendar.service';


@Component({
  selector: 'sib-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class StepperComponent implements OnInit
{

  public isDate:boolean=false;
  public isVariety:boolean=false;
  public isVarietyDetail:boolean=false;
  public isTurn:boolean=false;

  public fecha:Date;
  public minDate= new Date();

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  public user: any;
  public revision:Revision;
  public IdEquipinfras:any;
  public equipinfras:any;
  public varieties:any;
  public variety:any;
  public varietyDetails:any;
  public varietyDetail:any;
  public location:any;
  public locationsUser:any;
  public lenders:any;

  public varietySelected:string = "";
  public varietyDetailSelected:string = "";
  public turns:any[];

  public categoryName:string;
  public subcategoryName:string
  public equipinfrasName:string;
  public varietyName:string;
  public varietyDetailName:string;
  public varietyDetailDescription:string;
  public locationId:string;
  public addressFull:string;
  public descriptionProblem:string;
  public userId:string;
  public VarietyDetailId:string;
  public turnText:string;
  public dateRevision:any;
  public turnSelected:string="";
  public lenderId:any;
  public lenderName:any;
  public typeRevision:string="revision";

  public failedConect:string;
  public message:string;

  public lenderOne : any;
  public lenderSelected:string="";

  public modeloId:any; 

  constructor
  (
    private _userService: UserService,
    public _locationService: LocationService,
    public _revisionService: RevisionService,
    private _equipinfrasService: EquipinfrasService,
    public _varietyDetailService: VarietyDetailService,
    public _calendarService:CalendarService,
    private snackBar: SnackBarService,
    private dialogService: DialogService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    )
  {

    this.revision = new Revision();
    this.turns =
    [
      {id:"morning",name:"Mañana"},
      {id:"afternoon",name:"Tarde"},
    ];
  }

  ngOnInit()
  {
    this._route.params.subscribe
    (
      params =>
      {
        this.userId = localStorage.getItem('resID');
        this.IdEquipinfras = localStorage.getItem('IdEquipinfras');
        this.getUser(this.userId);
        this.getLocationsUser(this.userId)
        this.getEquipinfras(this.IdEquipinfras);
      }
    );

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  getEquipinfras(id,event?)
  {
    this._equipinfrasService.getOne(id).subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.equipinfras = response.equipinfras;
          this.equipinfrasName = this.equipinfras.name;
          this.subcategoryName = this.equipinfras.subcategory.name;
          //this.categoryName = this.equipinfras.category.name;
          this.varieties = response.equipinfras.varieties;

          for (var i=0; i<this.varieties.length; i++)
          {
            if( this.varieties[i].id == event)
            {
              this.variety = response.equipinfras.varieties[i];
              this.varietyName = this.variety.name;
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

  getVarietyDetail(id)
  {
    this._varietyDetailService.getOne(id).subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.varietyDetail = response.varietyDetail;
          this.VarietyDetailId = this.varietyDetail.id;
          this.varietyDetailName = this.varietyDetail.name;
          this.varietyDetailDescription = this.varietyDetail.description;
          console.log(this.varietyDetail);
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

  getLendersFree(date,turn)
  {
    this._calendarService.getAllLenderFreeRevision(date,turn).subscribe
    (
      response =>
      {
        if (response.status==true)
        {
          this.lenders = response.lenders;
          console.log(this.lenders);
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

  getLocation(id)
  {
    this._locationService.getOne(id).subscribe
    (
      response =>
      {
        this.location = response.location;
        this.locationId = this.location.id;
        this.addressFull = this.location.address;
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


  getUser(id)
  {
    this._userService.getOne(id).subscribe
    (
      response =>
      {
        this.user = response.user;
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

  getOneLender(id)
  {
    this._userService.getOneLender(id).subscribe
    (
      response =>
      {
        this.lenderOne = response.lender;
        this.lenderName= this.lenderOne.firstName+" "+this.lenderOne.lastName;
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

  getLocationsUser(id)
  {
    this._locationService.AllLocationUser(id).subscribe
    (
      response =>
      {
        if (response.status == true)
        {
          this.locationsUser = response.locations;
        }
        else
        {
          console.log(response);
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

  changeVariety(event)
  {
    this.isVariety=true;
    this.getEquipinfras(this.IdEquipinfras,event);
  }

  changeVarietyDetail(event)
  {
    this.isVarietyDetail=true;
    this.modeloId = event;
    this.getVarietyDetail(event);
  }

  changeLocation(id)
  {
    this.getLocation(id);
  }

  changeDate(type: string, event: MatDatepickerInputEvent<Date>)
  {
    this.isDate = true;
    this.fecha = event.value;
    this.dateRevision = event.value;
    this.isTurn=false;
    this.turnSelected="";
    this.lenderSelected="";
  }

  changeTurn(event)
  {
    this.isTurn = true;
    this.lenderSelected="";
    this.getLendersFree(this.dateRevision,event);
    if(event=="morning")
    {
      this.turnText = "Mañana"
    }
    else
    {
      this.turnText = "Tarde";
    }
  }

  onAddLocation()
  {
    this.dialogService.openAddLocationDialog().afterClosed().subscribe
    (
      response =>
      {
        this.location = response;
        console.log(response);
        this.createLocation(this.location);
      });

  }

  createLocation(location)
  {
    this._locationService.create(location).subscribe
    (
      response =>
      {
        if(response.status==true)
        {
          this.message  = response.message.text;
          this.snackBar.openSnackBar(this.message,'');
          this.getLocationsUser(this.userId);
        }
      },
      error =>
      {
        console.log(error);
      }
      );
  }

  onConfirm()
  {
    this.dialogService.openConfirmDialog('Recuerde que primero se debe realizar una revision antes de abordar el servicio, ¿Desea continuar con su solicitud?').afterClosed().subscribe(res=>{
      if (res==true)
      {
        this.register();
      }
      else
      {
        console.log(res);
      }
    });
  }

  register()
  {

      this.revision.UserId = parseInt(this.userId);
      this.revision.VarietyDetailId = parseInt(this.VarietyDetailId);
      this.revision.LocationId = parseInt(this.locationId);
      this.revision.description = this.descriptionProblem;
      
      this.revision.calendars = [
        {
          date:this.dateRevision,
          turn:this.turnSelected,
          LenderId:this.lenderId,
          type:this.typeRevision
        }];

      console.log(this.revision);

      this._revisionService.create(this.revision).subscribe
      (
        response =>
        {
          if (response.status==true)
          {
            console.log(response);
            this.message = response.message.text;
            this.messageSnackBar(this.message);
            // setTimeout
            // (
            //   () =>
            //   {
            //     this._router.navigate(['/auth/client/request']);
            //   },
            //   2000
            // );
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


  messageSnackBar(message)
  {
    this.snackBar.openSnackBarSuccess(message);
  }


  goBack()
  { 
    this._location.back(); 
  }

  changeLender(event) {
    this.lenderId = event.value;
    console.log(event);
    this.getOneLender(this.lenderId);
  }

}

