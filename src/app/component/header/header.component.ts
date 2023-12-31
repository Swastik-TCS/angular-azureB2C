import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { b2cPolicies } from 'src/app/auth-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  
  userName: string | undefined;
  isAuthenticated: Boolean = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(private msalService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      })
  }

  login() {
    //this.msalService.loginRedirect({scopes: ["https://Identifenceaadb2ctraining.onmicrosoft.com/tasks-api/tasks.read"]});
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logoutRedirect();
  }

  changePassword(){
    let forgetPasswordrequest = {
      scopes: ["openid"],
      authority: b2cPolicies.authorities.forgotPassword.authority
    }
    this.msalService.loginRedirect(forgetPasswordrequest)
  }

  setLoginDisplay() {
    this.isAuthenticated = this.msalService.instance.getAllAccounts().length > 0;
    this.userName = this.msalService.instance.getAllAccounts()[0].name; 
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
