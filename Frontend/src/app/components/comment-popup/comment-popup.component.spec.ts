import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPopupComponent } from './comment-popup.component';

describe('CommentPopupComponent', () => {
  let component: CommentPopupComponent;
  let fixture: ComponentFixture<CommentPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommentPopupComponent]
    });
    fixture = TestBed.createComponent(CommentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
