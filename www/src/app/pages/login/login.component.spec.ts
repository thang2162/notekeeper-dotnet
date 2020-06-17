import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { HttpClientModule }    from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SignupComponent } from '../signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../app-routing.module';
import { ChangepasswordComponent } from '../changepassword/changepassword.component';
import { HomeComponent } from '../home/home.component'
import { ContactComponent } from '../contact/contact.component';
import { NotebookComponent } from '../notebook/notebook.component';

import { AccountService } from '../../account.service';

import { By } from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        SignupComponent,
        ChangepasswordComponent,
        HomeComponent,
        ContactComponent,
        NotebookComponent
      ],
      imports: [
        FormsModule,
        FontAwesomeModule,
        HttpClientModule,
        AppRoutingModule
      ],
      providers: [
        AccountService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should enter a email and login user.",
  inject([ AccountService ], ( accountService: AccountService ) => {
   const submitEl = fixture.debugElement.query(By.css('button'));
   const emailEl = fixture.debugElement.query(By.css('input[type=email]'));
   const passwordEl = fixture.debugElement.query(By.css('input[type=password]'));

   spy = spyOn(component, 'loginUser').and.callThrough();

   emailEl.nativeElement.value = "netguy87@gmail.com";
   passwordEl.nativeElement.value = "123456";

   emailEl.nativeElement.dispatchEvent(new Event('input'));
   passwordEl.nativeElement.dispatchEvent(new Event('input'));

   fixture.detectChanges();

   expect(component.email).toBe('netguy87@gmail.com');
   expect(component.password).toBe('123456');

   submitEl.triggerEventHandler('click', null);

   fixture.detectChanges();

   expect(component.loginUser()).toHaveBeenCalled;

   accountService.loginUser("netguy87@gmail.com", "123456").subscribe(
     (res) => {
       expect(res.status).toEqual('success')
     }
   )

})
 );
});
