import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from '../../app-routing.module';
import { ChangepasswordComponent } from './changepassword.component';
import { HomeComponent } from '../home/home.component'
import { LoginComponent } from '../login/login.component'
import { ContactComponent } from '../contact/contact.component';
import { SignupComponent } from '../signup/signup.component';
import { NotebookComponent } from '../notebook/notebook.component';

describe('ChangepasswordComponent', () => {
  let component: ChangepasswordComponent;
  let fixture: ComponentFixture<ChangepasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChangepasswordComponent,
        HomeComponent,
        LoginComponent,
        ContactComponent,
        SignupComponent,
        NotebookComponent
       ],
      imports: [
        FormsModule,
        HttpClientModule,
        AppRoutingModule,
        FontAwesomeModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
