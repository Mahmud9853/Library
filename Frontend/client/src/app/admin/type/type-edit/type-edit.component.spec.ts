import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeEditComponent } from './type-edit.component';

describe('TypeEditComponent', () => {
  let component: TypeEditComponent;
  let fixture: ComponentFixture<TypeEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeEditComponent]
    });
    fixture = TestBed.createComponent(TypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
