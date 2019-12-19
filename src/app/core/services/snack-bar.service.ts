import { Injectable } from "@angular/core";
import { SnackBarDeleteComponent } from "../../components/shared/snack-bar-delete/snack-bar-delete.component";
import { MatSnackBar } from "@angular/material/snack-bar";
@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(public snackBar: MatSnackBar) {}

  openSnackBar(message, action) {
    return this.snackBar.open(message, action, {
      duration: 4000
    });
  }

  openSnackBarSuccess(message) {
    return this.snackBar.open(message);
  }

  orderByDateAsc(array: any) {
    array.sort(function(a, b) {
      a.updatedAt = new Date(a.updatedAt);
      b.updatedAt = new Date(b.updatedAt);
      return a.updatedAt.getTime() < b.updatedAt.getTime() ? 1 : -1;
    });
    return array;
  }

  orderByDateDesc(array) {
    array.sort(function(a, b) {
      a.updatedAt = new Date(a.updatedAt);
      b.updatedAt = new Date(b.updatedAt);
      return a.updatedAt.getTime() > b.updatedAt.getTime() ? 1 : -1;
    });
    return array;
  }
}
