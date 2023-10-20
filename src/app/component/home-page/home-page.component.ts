import { Component, OnInit } from "@angular/core";
import { MsalBroadcastService, MsalService } from "@azure/msal-angular";
import { InteractionStatus } from "@azure/msal-browser";
import { filter } from "rxjs";
// import { AuthClientService } from "src/app/authCustomer.service";
// import { AuthEmployeeService } from "src/app/authEmployee.service";
// import { AuthPartnerService } from "src/app/authPartner.service";
// import { GenericService } from "src/app/services/genericSerivces.service";
// import { AuthOIDC } from "../../../../../pingone-angular-sdk";


@Component({
  selector: 'home-module',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit{
  title = "IdentiFence Logistics"
  userId: string | undefined;
  isAuthenticated = false;
  userType = ""
  loading: boolean | undefined;
  constructor(private msalBroadcastService: MsalBroadcastService, private msalService: MsalService){}
  onExplore(){}
  ngOnInit(): void {
    this.msalBroadcastService.inProgress$
    .pipe(
      filter((status: InteractionStatus) => status === InteractionStatus.None)
    )
    .subscribe(() => {
      this.setLoginDisplay();
    })
  }

  setLoginDisplay() {
    this.isAuthenticated = this.msalService.instance.getAllAccounts().length > 0;
    this.loading = false;
    this.userType = "consumer"
    console.log("Information loaded");
    
  }
}
  // userGreetings: String = "";

  // constructor(
  //   private genericService : GenericService,
  //   private partnerAuthService : AuthPartnerService,
  //   private employeeAuthService : AuthEmployeeService,
  //   private customerAuthService : AuthClientService
  //   ) {}

  // isAuthenticated = false;
  // _service: AuthOIDC;
  // userType: string;

  // ngOnInit(): void {
  //   this.loading = true;
  //   this.customerAuthService.auth.init()
  //       .then(data => {
  //         this.isAuthenticated = this.customerAuthService.auth.isAuthenticated();
  //         this.userId=data["sub"];
  //         if(this.isAuthenticated) {

  //           this.userType = this.genericService.parseJwtToken()["userType"];
            // this.userType="employee";
            // console.log
            // if(this.userType === "consumer"){
        //       this._service = this.customerAuthService.auth;
        //       // console.log("true");
        //     // }

        //     if(this.userType === "employee"){
        //       this._service = this.employeeAuthService.auth;
        //     }


        //     if(this.userType === "partner")
        //       this._service = this.partnerAuthService.auth;

        //     // console.log(this.userType)

        //   } else {
        //     //redirect to unauthenticated homepage
        //     this.isAuthenticated=false;
        //     // window.location.replace(window.location.host);
        //   }
        //   this.loading = false;
        // })
        // .catch(error => {
        //   this.isAuthenticated = false;
        //   this.loading = false;
          // window.location.replace(window.location.host);
          // console.log(error);
        // })

        // this.isAuthenticated = true;
        // this.userType = "employee";
  // }

   // if(this.pingAuthService.auth.isAuthenticated()) {
    //   this.isAuthenticated = true;
    //     //  console.log("done")
    //     this.pingAuthService.auth.init()
    //     .then(data => {
    //       this.userGreetings = "Hi " + data["given_name"];
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // } else {
    // this.isAuthenticated = false;
    // // console.log("test")
    // }

  // logInWidget() {
  //   onWidget();
  // }

//   public onExplore(){
//     history.pushState('', '', window.location.href);
//     this.customerAuthService.auth.signIn({
//       scope: `openid profile email address p1:delete:userLinkedAccounts
//       p1:validate:userPassword
//       p1:read:sessions
//       p1:read:pairingKey
//       p1:read:userLinkedAccounts
//       p1:delete:device
//       p1:create:pairingKey
//       p1:read:device
//       p1:read:user
//       p1:update:userMfaEnabled
//       p1:update:user
//       p1:delete:pairingKey
//       p1:read:userPassword
//       p1:update:device
//       p1:verify:user
//       p1:delete:sessions
//       p1:create:device
//       p1:read:userConsent
//       p1:reset:userPassword`,
//       response_type: 'token id_token'
//     });
//   }
// }
