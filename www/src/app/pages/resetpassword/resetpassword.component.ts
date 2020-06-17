import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../components/loader/loader.service'
import { faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  email: string;
  key: string;

  faLock = faLock;
  faCheck = faCheck;

  isActive: string = '';
  modalBody: string;
  modalTitle: string;
  password: string = null;
  confirmPassword: string = null;

  validateConfirmPassword: string = '';
  validatePassword: string = '';

  disableSubmit: boolean = true;

  pwResetSuccess: boolean = false;

  validateForm () {


        if (this.password !== '' && this.password !== null
            && this.confirmPassword !== '' && this.confirmPassword !== null
            && this.password === this.confirmPassword ) {

              this.validateConfirmPassword = 'is-success';
              this.validatePassword = 'is-success';

          this.disableSubmit = false;
        } else {
          this.validateConfirmPassword = 'is-danger';
          this.validatePassword = 'is-danger';
          this.disableSubmit = true;
        }
  }

  closeModal () {
    this.isActive = '';

    if (this.pwResetSuccess === true) {
      this.router.navigateByUrl('/login');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  toggleLoader (show: boolean) {
    this.loaderService.toggleLoader(show);
  }

  submitResetPw(): void {
    this.toggleLoader(true);
    this.accountService.resetPw(this.email, this.key, this.password)
      .subscribe(res => {
        this.toggleLoader(false);
        // alert(JSON.stringify(res))
        if (res.status === 'success') {
          this.pwResetSuccess = true;
          this.modalTitle = 'Password Reset Successful';
          this.modalBody = res.msg;
          this.isActive = 'is-active';
        } else {
          this.modalTitle = 'Error';
          this.modalBody = res.msg;
          this.isActive = 'is-active';
        }
      });
  }


  constructor(private loaderService: LoaderService,
  private accountService: AccountService,
  private activatedRoute: ActivatedRoute,
  private router: Router) { }

  ngOnInit() {

    this.email = this.activatedRoute.snapshot.queryParamMap.get('email');
    this.key = this.activatedRoute.snapshot.queryParamMap.get('key');

    // this.modalTitle = 'Params';
    // this.modalBody = this.email + "\n\n" + this.key;
    // this.isActive = 'is-active';

    if (this.email === null || this.key === null) {
      this.router.navigateByUrl('/');
    }

  }

}
