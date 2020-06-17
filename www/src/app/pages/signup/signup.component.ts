import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../components/loader/loader.service'
import { faLock, faCheck, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  {

  faLock = faLock;
  faCheck = faCheck;
  faEnvelope = faEnvelope;

  isActive: string = '';
  modalBody: string;
  modalTitle: string;
  email: string = null;
  password: string = null;
  goToLogin: boolean = false;

  validateEmail: string = '';
  validatePassword: string = '';

  disableSubmit: boolean = true;

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
    }
  }

  closeModal () {
    this.isActive = ''

    if (this.goToLogin === true) {
      this.goToLogin = false;
      this.router.navigateByUrl('/login')
    }
  }

  toggleLoader (show: boolean) {
    this.loaderService.toggleLoader(show);
  }

  emailIsValid (email:string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  submitUser(): void {
    if(this.emailIsValid(this.email) === false) {
      this.modalTitle = 'Invalid Email';
      this.modalBody = 'Please enter a valid email address!';
      this.isActive = 'is-active';
    } else if(this.password === null || this.password === '') {
      this.modalTitle = 'Invalid Password';
      this.modalBody = 'Password cannot be blank!';
      this.isActive = 'is-active';
    }
    else {
    this.toggleLoader(true);
    this.accountService.newUser(this.email, this.password)
      .subscribe(res => {
        this.toggleLoader(false);
        // alert(JSON.stringify(res))
        if (res.status === 'success') {
          this.email = '';
          this.password = '';
          this.modalTitle = 'Account Created!';
          this.modalBody = res.msg;
          this.isActive = 'is-active';
          this.goToLogin = true;
        } else {
          this.modalTitle = 'Error';
          this.modalBody = res.msg;
          this.isActive = 'is-active';
        }
      }); }
  }


  constructor(private loaderService: LoaderService,
  private accountService: AccountService,
  private router: Router) { }

}
