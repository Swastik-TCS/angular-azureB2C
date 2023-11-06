import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { b2cPolicies } from 'src/app/auth-config';

@Component({
  selector: 'app-forget-username',
  templateUrl: './forget-username.component.html',
  styleUrls: ['./forget-username.component.css']
})
export class ForgetUsernameComponent implements OnInit {

  constructor(private msalService: MsalService, private msalBroadcastService: MsalBroadcastService, private router: Router) { }

  ngOnInit(): void {
    this.triggerPolicy();
  }
  triggerPolicy(){
    let forgetPasswordrequest = {
      scopes: ["openid"],
      authority: b2cPolicies.authorities.forgotUsername.authority,
      
    }
    this.msalService.loginRedirect(forgetPasswordrequest);
  }
}
