import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeparametreComponent } from './homeparametre.component';

describe('HomeparametreComponent', () => {
  let component: HomeparametreComponent;
  let fixture: ComponentFixture<HomeparametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeparametreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeparametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
