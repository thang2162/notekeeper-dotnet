import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule }    from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from '../../pages/home/home.component'
import { LoginComponent } from '../../pages/login/login.component'
import { ContactComponent } from '../../pages/contact/contact.component';
import { SignupComponent } from '../../pages/signup/signup.component';
import { NotebookComponent } from '../../pages/notebook/notebook.component';
import { ChangepasswordComponent } from '../../pages/changepassword/changepassword.component'

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent,
        HomeComponent,
        LoginComponent,
        ContactComponent,
        SignupComponent,
        NotebookComponent,
        ChangepasswordComponent
       ],
      imports: [
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        FontAwesomeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
