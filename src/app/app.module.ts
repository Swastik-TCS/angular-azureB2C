import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule} from '@angular/material/button';
import { MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select"
import { MatIconModule } from "@angular/material/icon";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from "@angular/material/menu";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { IPublicClientApplication, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { msalConfig, msalGuardConfig, msalInterceptorConfig } from './auth-config';
import { MSAL_INSTANCE, MsalBroadcastService, MsalModule, MsalRedirectComponent, MsalService, MsalGuard, MSAL_GUARD_CONFIG,MsalGuardConfiguration, MsalInterceptor } from '@azure/msal-angular';
import { HomeComponent } from './component/home/home.component';
import { ContactComponent } from './component/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './component/footer/footer.component';
import { HomePageComponent } from './component/home-page/home-page.component';
import { HomePageCustomerLanding } from './component/home-page/home-page-customer-landing/home-page-customer-landing.component';
import { HomePageEmployeeLanding } from './component/home-page/home-page-employee-landing/home-page-employee-landing.component';
import { HomePagePartnerLanding } from './component/home-page/home-page-partner-landing/home-page-partner-landing.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { UserInfoComponnent } from './component/user-info/user-info.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { ForgetUsernameComponent } from './component/forget-username/forget-username.component';

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication(msalConfig);
// }

// export function MSALGaurdInstanceFactory(): MsalGuardConfiguration {
//   return msalGuardConfig;
// }

/**
* Set your default interaction type for MSALGuard here. If you have any
* additional scopes you want the user to consent upon login, add them here as well.
*/

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    HomeComponent,
    UserInfoComponnent,
    ContactComponent,
    HomePageCustomerLanding,
    HomePageEmployeeLanding,
    HomePagePartnerLanding,
    FooterComponent,
    ForgetPasswordComponent,
    ForgetUsernameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication(msalConfig),msalGuardConfig,msalInterceptorConfig),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatSidenavModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [
    
  // {
  //   provide: HTTP_INTERCEPTORS,
  //   useClass: MsalInterceptor,
  //   multi: true,
  // },
  MsalGuard,
  MsalService,
  MsalBroadcastService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
