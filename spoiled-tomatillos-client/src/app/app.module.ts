import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { HelloComponent } from './hello/hello.component';
import { HelloService } from './hello.service';
import { UsersService } from './users.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeComponent } from './home/home.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { LoginComponent } from './login/login.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { RegisterComponent } from './register/register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { SearchComponent } from './search/search.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReviewsListComponent } from './reviews-list/reviews-list.component';
import { MovieComponent } from './movie/movie.component';
import { AdminSearchComponent } from './admin-search/admin-search.component';
import { AdminUserDetailComponent } from './admin-user-detail/admin-user-detail.component';
import { AdminCaseReviewComponent } from './admin-case-review/admin-case-review.component';
import { ReviewComponent } from './review/review.component';


@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    NotificationsComponent,
    HomeComponent,
    AccountSettingsComponent,
    LoginComponent,
    PlaylistComponent,
    AdminRegisterComponent,
    RegisterComponent,
    AdminLoginComponent,
    AddMovieComponent,
    EditMovieComponent,
    SearchComponent,
    AdminHomeComponent,
    UsersListComponent,
    UserProfileComponent,
    ReviewsListComponent,
    MovieComponent,
    AdminSearchComponent,
    AdminUserDetailComponent,
    AdminCaseReviewComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [HelloService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
