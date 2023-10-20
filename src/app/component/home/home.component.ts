import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
accessTokenStatus: string | undefined;
token: string | undefined;
data: string | undefined;
userName: string | undefined;
isAuthenticated: Boolean = false;
private readonly _destroying$ = new Subject<void>();

  constructor(private msalBroadcastService: MsalBroadcastService, private msalService: MsalService, private http: HttpClient) { }

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
  setDisplay() {
   this.isAuthenticated = this.msalService.instance.getAllAccounts().length > 0;
   this.msalService.instance.acquireTokenSilent({scopes: ["https://Identifenceaadb2ctraining.onmicrosoft.com/tasks-api/tasks.read"],account: this.msalService.instance.getAllAccounts()[0]})
  //  .subscribe({
  //   next: (result) => {
  //   this.token = result.accessToken;
  //   this.getAPIdata();
  //   },
  //   error: (err) => {
  //     console.log("#######################################AccessTokenError############");
      
  //     this.accessTokenStatus = "failed"
  //   }
  //  })
  .then((result) => {
    this.token = result.accessToken;
  }).catch((err) => {
    this.accessTokenStatus = "failed";
  })
   this.userName = this.msalService.instance.getAllAccounts()[0].name;
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
