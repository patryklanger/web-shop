import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleAdminComponent } from './toggle-admin.component';

describe('ToggleAdminComponent', () => {
  let component: ToggleAdminComponent;
  let fixture: ComponentFixture<ToggleAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
