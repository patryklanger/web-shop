import { Component, ElementRef, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddTagsDialogData } from './add-tags-dialog-data.model';
import { Subject, tap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-tags-dialog',
  templateUrl: './add-tags-dialog.component.html',
  styleUrls: ['./add-tags-dialog.component.scss']
})
export class AddTagsDialogComponent implements OnDestroy {
  addOnBlur = true;
  tagCtrl = new FormControl();
  tags: Set<string>;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  private readonly _destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<AddTagsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddTagsDialogData,
  ) {
    this.tags = new Set(data.currentTags);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.add(value);
    }

    this.tagCtrl.setValue(null);
  }

  onSubmit() {
    this.data.service.setTags$([...this.tags], this.data.id).pipe(
      tap(object => this.data.objectChanged$.next(object)),
      tap(() => this.dialogRef.close()),
      takeUntil(this._destroy$)
    ).subscribe()
  }
}
