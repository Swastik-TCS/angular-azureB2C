import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private readonly _destroying$ = new Subject<void>();
  public changePwdForm! : FormGroup
  isAuthenticated!: boolean;
  iDtoken: string | undefined;
  token!: string;
  constructor(private msalService: MsalService, private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit(): void {

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setDisplay();
      })

  }

  onSubmit(){
    console.log(this.changePwdForm.value);
    
  }
  setDisplay() {
    this.isAuthenticated = this.msalService.instance.getAllAccounts().length > 0;
    this.msalService.instance.acquireTokenSilent({scopes: ["https://identifenceb2cdev.onmicrosoft.com/11f03740-209c-48d4-961a-415cd8ceec70/tasks.read"], account: this.msalService.instance.getAllAccounts()[0]})
   .then((result) => {
     this.iDtoken = result.idToken; 
     this.token = result.accessToken;
    console.log(this.iDtoken);
    
     this.changePwdForm = new FormGroup({
      currentPwd: new FormControl(),
      newPwd: new FormControl(),
      confirmPwd: new FormControl(),
      token: new FormControl(this.iDtoken)
    })

   }).catch((err) => {
     this.iDtoken = this.msalService.instance.getAllAccounts()[0].idToken

     this.changePwdForm = new FormGroup({
      currentPwd: new FormControl(),
      newPwd: new FormControl(),
      confirmPwd: new FormControl(),
      token: new FormControl(this.iDtoken)
    })
   })
   
   }

}
