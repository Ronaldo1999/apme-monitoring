import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModecontractualisationComponent } from './modecontractualisation.component';

describe('ModecontractualisationComponent', () => {
  let component: ModecontractualisationComponent;
  let fixture: ComponentFixture<ModecontractualisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModecontractualisationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModecontractualisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
