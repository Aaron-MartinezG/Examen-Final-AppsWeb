import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaServicio } from './alta-servicio';

describe('AltaServicio', () => {
  let component: AltaServicio;
  let fixture: ComponentFixture<AltaServicio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaServicio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaServicio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
