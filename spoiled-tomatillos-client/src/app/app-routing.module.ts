import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelloComponent } from './hello/hello.component';
import { NotificationsComponent } from './notifications/notifications.component';
<<<<<<< HEAD
import { HomeComponent } from './home/home.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginComponent } from './login/login.component';
=======
>>>>>>> d56726bc3d7623a00c2eb1bc09ea2551d8cb86ab
import { RegisterComponent } from './register/register.component';

const routes = [
  { path: 'api/hello/string', component: HelloComponent, data: [{specificPath: 'api/hello/string'}] },
  { path: 'api/hello/object', component: HelloComponent, data: [{specificPath: 'api/hello/object'}] },
  { path: 'api/hello/insert', component: HelloComponent, data: [{specificPath: 'api/hello/insert'}] },
  { path: 'api/hello/insert/:msg', component: HelloComponent, data: [{specificPath: 'api/hello/insert'}] },
  { path: 'api/hello/select/all', component: HelloComponent, data: [{specificPath: 'api/hello/select/all'}] },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'settings', component: AccountSettingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
