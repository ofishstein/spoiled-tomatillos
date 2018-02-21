import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HelloComponent } from './hello/hello.component';
import { HelloService } from './hello.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginComponent } from './login/login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddMovieComponent } from './add-movie/add-movie.component';


@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    NotificationsComponent,
    HomeComponent,
    AccountSettingsComponent,
    LoginComponent,
    AdminRegisterComponent,
    RegisterComponent,
    AdminLoginComponent,
    AddMovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HelloService],
  bootstrap: [AppComponent]
})
export class AppModule { }
