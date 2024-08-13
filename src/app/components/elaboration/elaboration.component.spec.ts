import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElaborationComponent } from './elaboration.component';

describe('ElaborationComponent', () => {
  let component: ElaborationComponent;
  let fixture: ComponentFixture<ElaborationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElaborationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ElaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
