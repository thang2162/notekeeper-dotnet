import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../components/loader/loader.service'
import { faLock, faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  faLock = faLock;
  faCheck = faCheck;
  faEnvelope = faEnvelope;

  forgotModal: string = '';

  isActive: string = '';
  modalBody: string;
  modalTitle: string;
  email: string = null;
  password: string = null;

  email2: string = null;

  validateEmail: string = '';
  validatePassword: string = '';

  validateEmail2: string = '';

  disableSubmit: boolean = true;
  disableSubmit2: boolean = true;

  openForgot () {
    this.forgotModal = 'is-active';
  }

  emailIsValid (email:string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  validateForm (field: string) {
    if (field === 'email') {
      if (this.emailIsValid(this.email)) {

        this.validateEmail = 'is-success';

        if (this.password !== '' && this.password !== null) {
          this.disableSubmit = false;
        } else {
          this.disableSubmit = true;
        }

      } else {
        this.validateEmail = 'is-danger';
        this.disableSubmit = true;
      }
    } else if (field === 'password') {
      if (this.password !== '' && this.password !== null) {

        this.validatePassword = 'is-success';

        if (this.emailIsValid(this.email)) {
          this.disableSubmit = false;
        } else {
          this.disableSubmit = true;
        }

      } else {
        this.validatePassword = 'is-danger';
        this.disableSubmit = true;
      }
    } else if (field === 'email2') {
      if (this.emailIsValid(this.email2)) {

        this.validateEmail2 = 'is-success';

        this.disableSubmit2 = false;

      } else {
        this.validateEmail2 = 'is-danger';
        this.disableSubmit2 = true;
      }
    }
  }

  closeModal () {
    this.isActive = '';
    this.forgotModal = '';
    this.email2 = null
  }

  toggleLoader (show: boolean) {
    this.loaderService.toggleLoader(show);
  }

  submitForgotPw(): void {
    this.toggleLoader(true);
    this.accountService.reqResetPw(this.email2)
      .subscribe(res => {
        this.toggleLoader(false);
        // alert(JSON.stringify(res))
        if (res.status === 'success') {
          this.closeModal();

          this.modalTitle = 'Forgot Password?';
          this.modalBody = res.msg;
          this.isActive = 'is-active';
        } else {
          this.modalTitle = 'Error';
          this.modalBody = res.msg;
          this.isActive = 'is-active';
        }
      });
  }


  loginUser(): void {
    this.toggleLoader(true);
    this.accountService.loginUser(this.email, this.password)
      .subscribe(res => {
        this.toggleLoader(false);
        // alert(JSON.stringify(res))
        if (res.status === 'success') {
          this.email = '';
          this.password = '';
          this.router.navigateByUrl('/notebook');
        } else {
          this.modalTitle = 'Error';
          this.modalBody = res.msg;
          this.isActive = 'is-active';
        }
      });
  }

  constructor(private loaderService: LoaderService,
  private accountService: AccountService,
  private router: Router) { }
}
