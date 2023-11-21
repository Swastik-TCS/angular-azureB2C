import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ContactComponent } from './component/contact/contact.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { MsalGuard } from '@azure/msal-angular';
import { UserInfoComponnent } from './component/user-info/user-info.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ForgetUsernameComponent } from './component/forget-username/forget-username.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'forgetpassword&hint', component: ForgetPasswordComponent },
  { path: 'forgetusername', component: ForgetUsernameComponent },
  { path: 'userinfo', component: UserInfoComponnent, canActivate:[MsalGuard] },
  {path: "home", component: HomeComponent, canActivate: [MsalGuard]},
  {path: "contact", component: ContactComponent, canActivate: [MsalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }