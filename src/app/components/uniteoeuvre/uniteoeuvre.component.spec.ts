import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteoeuvreComponent } from './uniteoeuvre.component';

describe('UniteoeuvreComponent', () => {
  let component: UniteoeuvreComponent;
  let fixture: ComponentFixture<UniteoeuvreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniteoeuvreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniteoeuvreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
