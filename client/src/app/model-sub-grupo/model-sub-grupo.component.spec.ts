import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelSubGrupoComponent } from './model-sub-grupo.component';

describe('ModelSubGrupoComponent', () => {
  let component: ModelSubGrupoComponent;
  let fixture: ComponentFixture<ModelSubGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelSubGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelSubGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
