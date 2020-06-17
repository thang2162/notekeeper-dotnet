import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NotebookComponent } from './pages/notebook/notebook.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    NotebookComponent,
    ChangepasswordComponent,
    LoaderComponent,
    ClickOutsideDirective,
    ResetpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
