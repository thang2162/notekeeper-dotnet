import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { HomeComponent } from '../home/home.component'
import { LoginComponent } from '../login/login.component'
import { ContactComponent } from '../contact/contact.component';
import { NotebookComponent } from '../notebook/notebook.component';

import { By } from "@angular/platform-browser";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignupComponent,
        ChangepasswordComponent,
        HomeComponent,
        LoginComponent,
        ContactComponent,
        NotebookComponent
      ],
      imports: [
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        AppRoutingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
