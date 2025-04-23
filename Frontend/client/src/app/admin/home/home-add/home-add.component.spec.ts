import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAddComponent } from './home-add.component';

describe('HomeAddComponent', () => {
  let component: HomeAddComponent;
  let fixture: ComponentFixture<HomeAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAddComponent]
    });
    fixture = TestBed.createComponent(HomeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
