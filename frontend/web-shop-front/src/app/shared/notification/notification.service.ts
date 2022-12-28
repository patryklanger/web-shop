import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {}

  showSuccessNotification(info: string) {
    this._snackBar.open(info, "Close")._dismissAfter(5000)
  }
}
