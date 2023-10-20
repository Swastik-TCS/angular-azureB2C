import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { Subject, filter, takeUntil } from 'rxjs';
import { InteractionStatus } from '@azure/msal-browser';
import { b2cPolicies } from 'src/app/auth-config';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponnent implements OnInit {

  //userDetails: string;
  tokenClaims: any;

  userName: string | undefined;
  userEmail: string | undefined;
  userFirstName: string | undefined;
  userFamilyName: string | undefined;
  userNumber: string | undefined;
  userCountry: string | undefined;
  userId: any;
  userAddress: string | undefined;
  isAuthenticated: Boolean = false;

  private readonly _destroying$ = new Subject<void>();

  constructor(
    private msalService: MsalService, 
    private msalBroadcastService: MsalBroadcastService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.userInfoUtil();
      })
  }
  userInfoUtil() {
    this.isAuthenticated = this.msalService.instance.getAllAccounts().length > 0;
    this.userFirstName = this.msalService.instance.getAllAccounts()[0].name; 
    this.tokenClaims = this.msalService.instance.getAllAccounts()[0].idTokenClaims; 
  }

  updateProfile() {
    let editProfileFlowRequest = {
      scopes: ["openid"],
      authority: b2cPolicies.authorities.editProfile.authority,
  };
  this.msalService.loginRedirect(editProfileFlowRequest).subscribe({
    next: data => {
      console.log(data);
      this.router.navigate(['/']);
    }
  })
  }

}

