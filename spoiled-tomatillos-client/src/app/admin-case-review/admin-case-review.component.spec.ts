import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCaseReviewComponent } from './admin-case-review.component';

describe('AdminCaseReviewComponent', () => {
  let component: AdminCaseReviewComponent;
  let fixture: ComponentFixture<AdminCaseReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCaseReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCaseReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
