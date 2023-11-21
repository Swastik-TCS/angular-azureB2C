import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { b2cPolicies } from 'src/app/auth-config';

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.css']
})
export class ForgetUsernameComponent implements OnInit {

  private readonly _destroying$ = new Subject<void>();
  constructor(private msalService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router) { }

  ngOnInit(): void {
    this.triggerPolicy();
    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.router.navigate(['/'])
      })
  }
  triggerPolicy(){
    let forgetPasswordrequest = {
      scopes: ["openid"],
      authority: b2cPolicies.authorities.forgotUsername.authority,
      
    }
    this.msalService.loginRedirect(forgetPasswordrequest);
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
