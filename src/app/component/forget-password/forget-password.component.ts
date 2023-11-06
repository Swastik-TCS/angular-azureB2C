import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';
import { b2cPolicies } from 'src/app/auth-config';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  
  constructor(private msalService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router) { }

  ngOnInit(): void {
    this.triggerPolicy();
  }
  triggerPolicy(){
    let forgetPasswordrequest = {
      scopes: ["openid"],
      authority: b2cPolicies.authorities.forgotPassword.authority,
     
    }
    this.msalService.loginRedirect(forgetPasswordrequest);
  }

}
