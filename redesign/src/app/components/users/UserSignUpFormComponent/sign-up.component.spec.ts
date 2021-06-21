import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSignUpFormComponent } from './sign-up.component';

describe('UserSignUpFormComponent', () => {
  let component: UserSignUpFormComponent;
  let fixture: ComponentFixture<UserSignUpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSignUpFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
