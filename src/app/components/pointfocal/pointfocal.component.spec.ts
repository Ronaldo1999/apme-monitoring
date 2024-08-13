import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointfocalComponent } from './pointfocal.component';

describe('PointfocalComponent', () => {
  let component: PointfocalComponent;
  let fixture: ComponentFixture<PointfocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointfocalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointfocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
