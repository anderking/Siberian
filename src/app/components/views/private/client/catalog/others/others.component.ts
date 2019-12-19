import { Component, OnInit } from '@angular/core';
import { SnackBarService } from '../../../../../../core/services/snack-bar.service';

@Component({
  selector: 'sib-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
	selected = '';

  	constructor(private snackBar: SnackBarService) { }
  

	ngOnInit() {
	}
	onEnviar(){
		this.snackBar.openSnackBar('Datos enviados correctamente. Te notificaremos cuando tu solicitud sea aprobada','').onAction().subscribe(() => {});
	}
}
