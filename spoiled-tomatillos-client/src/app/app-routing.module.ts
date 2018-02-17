import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HelloComponent } from './hello/hello.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes = [
  { path: 'api/hello/string', component: HelloComponent, data: [{specificPath: 'api/hello/string'}] },
  { path: 'api/hello/object', component: HelloComponent, data: [{specificPath: 'api/hello/object'}] },
  { path: 'api/hello/insert', component: HelloComponent, data: [{specificPath: 'api/hello/insert'}] },
  { path: 'api/hello/insert/:msg', component: HelloComponent, data: [{specificPath: 'api/hello/insert'}] },
  { path: 'api/hello/select/all', component: HelloComponent, data: [{specificPath: 'api/hello/select/all'}] },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'settings', component: AccountSettingsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
