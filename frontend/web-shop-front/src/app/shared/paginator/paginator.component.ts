import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {
  @Input() page$?: BehaviorSubject<number>;
  @Input() pageSize$?: BehaviorSubject<number>;
  @Input() totalCount: number = 1;

  initialPage = 1;
  initialPageSize = 10;

  private readonly _destroy$ = new Subject<void>()

  constructor() {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit() {
    this.initialPage = this.page$!.getValue();
    this.initialPageSize = this.pageSize$!.getValue();
  }

  onPageEvent(event: PageEvent) {
    this.page$!.next(event.pageIndex);
    this.pageSize$!.next(event.pageSize);
  }
}
