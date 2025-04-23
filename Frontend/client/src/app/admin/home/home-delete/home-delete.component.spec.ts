import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDeleteComponent } from './home-delete.component';

describe('HomeDeleteComponent', () => {
  let component: HomeDeleteComponent;
  let fixture: ComponentFixture<HomeDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeDeleteComponent]
    });
    fixture = TestBed.createComponent(HomeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
