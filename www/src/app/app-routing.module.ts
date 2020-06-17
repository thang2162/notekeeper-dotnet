import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { NotebookComponent } from './pages/notebook/notebook.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'notebook', component: NotebookComponent },
  { path: 'changepassword', component: ChangepasswordComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resetpassword', component: ResetpasswordComponent },
  { path: '**', component: HomeComponent } // This ;ine is the 404 Redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
