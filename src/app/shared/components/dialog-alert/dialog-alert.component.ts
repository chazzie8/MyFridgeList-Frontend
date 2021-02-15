import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['./dialog-alert.component.scss']
})
export class DialogAlertComponent{

  constructor(
    private dialogRef: MatDialogRef<DialogAlertComponent>
  ) { }

  public handleSubmitClick(): void {
    this.dialogRef.close(true);
  }

  public handleCancelClick(): void {
    this.dialogRef.close(false);
  }

}
