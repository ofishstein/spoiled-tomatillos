import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HelloComponent } from './hello/hello.component';
import { HelloService } from './hello.service';
import { NotificationsComponent } from './notifications/notifications.component';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginComponent } from './login/login.component';
=======
>>>>>>> d56726bc3d7623a00c2eb1bc09ea2551d8cb86ab
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    NotificationsComponent,
    HomeComponent,
    AccountSettingsComponent,
    LoginComponent,
    RegisterComponent
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
