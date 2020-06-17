import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private accountService: AccountService,
    private router: Router
  ) {}

  mobileMenuClass: string = ""
  isMenuToggled: boolean = false;
  isLoggedIn: boolean = false;

  toggleMenu () {
    if (this.isMenuToggled === false) {
      this.mobileMenuClass = "is-active"
      this.isMenuToggled = true;
    } else {
      this.mobileMenuClass = ""
      this.isMenuToggled = false;
    }
  }

  logout () {
    this.accountService.clearSession();
    this.router.navigateByUrl('/login');
  }

  closeMenu () {
    this.mobileMenuClass = ""
    this.isMenuToggled = false;
  }

  ngOnInit() {
    this.accountService.loggedIn$.subscribe( sub => {
      this.isLoggedIn = sub;
    });
    this.accountService.sessionCheck();
  }

}
