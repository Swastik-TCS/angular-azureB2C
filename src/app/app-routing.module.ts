import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ContactComponent } from './component/contact/contact.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { MsalGuard } from '@azure/msal-angular';
import { UserInfoComponnent } from './component/user-info/user-info.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'userinfo', component: UserInfoComponnent, canActivate:[MsalGuard] },
  {path: "home", component: HomeComponent, canActivate: [MsalGuard]},
  {path: "contact", component: ContactComponent, canActivate: [MsalGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }