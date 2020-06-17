import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from '../../account.service';
import { LoaderService } from '../../components/loader/loader.service'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit, OnDestroy {
  private httpSubs: Subscription[] = [];

  oldPassword: string = null;
  newPassword: string = null;
  confirmNewPassword: string = null;

  redirect: boolean = false;

  confirmModal: string = '';
  notifyModal: string = '';

  notifyTitle: string;
  notifyBody: string;

  validateOldPw: string = '';
  validateNewPw: string = '';
  validateConfirmNewPw: string = '';

  disableSubmit: boolean = true;
  btnLoader: string = '';
  disableForm: boolean = false;

  validateForm (field: string) {
    if (field === 'old') {
      if(this.oldPassword !== '' && this.oldPassword !== null) {
        this.validateOldPw = 'is-success';

        if(this.oldPassword !== '' && this.oldPassword !== null && this.newPassword !== '' && this.newPassword !== null && this.confirmNewPassword !== '' && this.confirmNewPassword !== null) {
          this.disableSubmit = false;
        } else {
          this.disableSubmit = true;
        }
      } else {
        this.validateOldPw = 'is-danger';
        this.disableSubmit = true;
      }
    } else if (field === 'new') {
      if(this.newPassword !== '' && this.newPassword !== null) {
        this.validateNewPw = 'is-success';

        if(this.oldPassword !== '' && this.oldPassword !== null && this.newPassword !== '' && this.newPassword !== null && this.confirmNewPassword !== '' && this.confirmNewPassword !== null) {
          this.disableSubmit = false;
        } else {
          this.disableSubmit = true;
        }
      } else {
        this.validateNewPw = 'is-danger';
        this.disableSubmit = true;
      }
    } else if (field === 'confirm') {
      if(this.confirmNewPassword !== '' && this.confirmNewPassword !== null) {
        this.validateConfirmNewPw = 'is-success';

        if(this.oldPassword !== '' && this.oldPassword !== null && this.newPassword !== '' && this.newPassword !== null && this.confirmNewPassword !== '' && this.confirmNewPassword !== null) {
          this.disableSubmit = false;
        } else {
          this.disableSubmit = true;
        }
      } else {
        this.validateConfirmNewPw = 'is-danger';
        this.disableSubmit = true;
      }
    }
  }

  changePassword (): void {
    if (this.newPassword === this.confirmNewPassword) {
      this.closeModal();
      this.btnLoader = 'is-loading';
      this.disableForm = true;

      this.httpSubs.push(this.accountService.changePassword(this.oldPassword, this.newPassword)
        .subscribe(res => {
          this.btnLoader = '';
          this.disableForm = false;

          if(res.status === 'success') {
            this.oldPassword = null;
            this.newPassword = null;
            this.confirmNewPassword = null;

            this.disableSubmit = true;
            this.validateNewPw = '';
            this.validateOldPw = '';
            this.validateConfirmNewPw = '';

            this.notifyTitle = "Password Changed";
            this.notifyBody = res.msg;
            this.notifyModal = 'is-active';
          } else {
            this.notifyTitle = "Error";
            this.notifyBody = res.msg;
            this.notifyModal = 'is-active';
          }

        }));
    } else {
      this.notifyTitle = "Password Mismatch!";
      this.notifyBody = "New Password and Confirm New Password must match!";
      this.notifyModal = 'is-active';
    }

  }

  deleteUser (): void {
    this.confirmModal = 'is-active';
  }

  confirmDeleteUser (): void {
    this.closeModal();
    this.loaderService.toggleLoader(true);
    this.httpSubs.push(this.accountService.deleteUser()
      .subscribe(res => {
        this.loaderService.toggleLoader(false);

        if(res.status === 'success') {
          this.redirect = true;
          this.notifyTitle = "Account Deleted";
          this.notifyBody = res.msg;
          this.notifyModal = 'is-active';
        } else {
          this.notifyTitle = "Error";
          this.notifyBody = res.msg;
          this.notifyModal = 'is-active';
        }

      }));
  }

  closeModal () {
    this.confirmModal = '';
    this.notifyModal = '';

    if (this.redirect === true) {
      this.redirect = false;
      this.accountService.clearSession();
      this.router.navigateByUrl('/home');
    }
  }

  constructor(
    private accountService: AccountService,
    private loaderService: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    if(!this.accountService.sessionCheck()) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnDestroy() {
    this.httpSubs.forEach(sub => sub.unsubscribe());
  }

}
