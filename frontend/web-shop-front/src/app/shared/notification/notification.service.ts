import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {}

  showSuccessNotification(info: string) {
    this.show(info)
  }

  showWarnNotification(info: string) {
    this.show(info, "warning")
  }

  private show(message: string, status?: string) {
    const options: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
      panelClass: [...(status === "warning" ? ["notification-service-warning"] : [])],
    };

    this._snackBar.open(message, "OK", options);
  }
}
