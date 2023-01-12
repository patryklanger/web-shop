import { Component, Input, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subject, switchMap, tap, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user/user.model';
import { FormControl } from '@angular/forms';
import { UserGatewayService } from 'src/app/core/gateways/user/user-gateway.service';

@Component({
  selector: 'app-toggle-admin',
  templateUrl: './toggle-admin.component.html',
  styleUrls: ['./toggle-admin.component.scss']
})
export class ToggleAdminComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Output() userChange = new EventEmitter<User>();

  toggleCtrl = new FormControl(null);

  private readonly _destroy$ = new Subject<void>();

  constructor(private userGateway: UserGatewayService) {}

  ngOnInit() {
    this.toggleCtrl.setValue(this.user.roles.includes("admin"));
    this.toggleCtrl.valueChanges.pipe(
      switchMap(() => this.userGateway.toggleAdmin$(this.user.id)),
      tap((user) => this.userChange.emit(user)),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }


}
