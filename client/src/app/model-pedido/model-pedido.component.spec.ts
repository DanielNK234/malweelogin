import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPedidoComponent } from './model-pedido.component';

describe('ModelPedidoComponent', () => {
  let component: ModelPedidoComponent;
  let fixture: ComponentFixture<ModelPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelPedidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
