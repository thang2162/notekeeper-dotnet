import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotebookComponent } from './notebook.component';

import { LoginComponent } from '../login/login.component';
import { HttpClientModule }    from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from '../signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { HomeComponent } from '../home/home.component'
import { ContactComponent } from '../contact/contact.component';

describe('NotebookComponent', () => {
  let component: NotebookComponent;
  let fixture: ComponentFixture<NotebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotebookComponent,
        LoginComponent,
        SignupComponent,
        ChangepasswordComponent,
        HomeComponent,
        ContactComponent
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
    fixture = TestBed.createComponent(NotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
