import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { ImageGatewayService } from 'src/app/core/gateways/abstract-image.service';
import { FormBuilder } from '@angular/forms';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadImageDialogData } from './upload-image-dialog-data.model';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss'],
})
export class UploadImageDialogComponent implements OnDestroy {
  fileCtrl = new FileUploadControl(null, [FileUploadValidators.filesLimit(1), FileUploadValidators.accept(['image/*'])])

  private readonly _destroy$ = new Subject<void>()
  constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UploadImageDialogData,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    if (!this.fileCtrl.valid) {
      return;
    }
    this.data.service.uploadImage$(this.fileCtrl.value[0], this.data.id).pipe(
      tap((object) => this.data.objectChanged$.next(object)),
      tap(() => this.dialogRef.close()),
      takeUntil(this._destroy$)
    ).subscribe();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
