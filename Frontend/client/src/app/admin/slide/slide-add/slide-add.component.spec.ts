import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideAddComponent } from './slide-add.component';

describe('SlideAddComponent', () => {
  let component: SlideAddComponent;
  let fixture: ComponentFixture<SlideAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideAddComponent]
    });
    fixture = TestBed.createComponent(SlideAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
