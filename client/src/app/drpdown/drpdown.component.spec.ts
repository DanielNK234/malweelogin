import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrpdownComponent } from './drpdown.component';

describe('DrpdownComponent', () => {
  let component: DrpdownComponent;
  let fixture: ComponentFixture<DrpdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrpdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrpdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
