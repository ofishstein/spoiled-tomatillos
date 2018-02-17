import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HelloComponent } from './hello/hello.component';
import { HelloService } from './hello.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    NotificationsComponent,
    AccountSettingsComponent
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
