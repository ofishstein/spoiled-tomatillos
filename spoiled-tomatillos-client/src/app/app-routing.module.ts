import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth-guard';
import { AdminGuard } from './guards/admin-guard';

import { HelloComponent } from './hello/hello.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MovieComponent } from './movie/movie.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';
import { AdminCaseReviewComponent } from './admin-case-review/admin-case-review.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes = [
  { path: 'api/hello/string', component: HelloComponent, data: [{specificPath: 'api/hello/string'}] },
  { path: 'api/hello/object', component: HelloComponent, data: [{specificPath: 'api/hello/object'}] },
  { path: 'api/hello/insert', component: HelloComponent, data: [{specificPath: 'api/hello/insert'}] },
  { path: 'api/hello/insert/:msg', component: HelloComponent, data: [{specificPath: 'api/hello/insert'}] },
  { path: 'api/hello/select/all', component: HelloComponent, data: [{specificPath: 'api/hello/select/all'}] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: AccountSettingsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'user/:uid/playlist', component: PlaylistComponent },
  { path: 'admin/create', component: AdminRegisterComponent, canActivate: [AdminGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/movie/add', component: AddMovieComponent, canActivate: [AdminGuard] },
  { path: 'admin/movie/edit/:id', component: EditMovieComponent, canActivate: [AdminGuard] },
  { path: 'admin/user/:uid', component: AdminUserDetailComponent, canActivate: [AdminGuard] },
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [AdminGuard] },
  { path: 'user/:uid/:listType', component: UsersListComponent },
  { path: 'user/:uid', component: UserProfileComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'movie/:id/reviews', component: ReviewsListComponent },
  { path: 'admin/search', component: AdminSearchComponent, canActivate: [AdminGuard] },
  { path: 'admin/user/:uid/flagged/:caseId', component: AdminCaseReviewComponent, canActivate: [AdminGuard] },
  { path: 'reset', component: ForgotPasswordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [AuthGuard, AdminGuard]
})
export class AppRoutingModule { }
