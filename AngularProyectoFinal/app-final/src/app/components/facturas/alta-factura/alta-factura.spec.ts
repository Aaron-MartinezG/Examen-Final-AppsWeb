import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaFactura } from './alta-factura';

describe('AltaFactura', () => {
  let component: AltaFactura;
  let fixture: ComponentFixture<AltaFactura>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaFactura]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaFactura);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
