import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }
  public show(message: string, type: string) {
    const className = type === 'error' ? 'error' : 'success';
    this._snackBar.open(message, '', {
      panelClass: className,
      duration: 2000,
    });
  }
}
