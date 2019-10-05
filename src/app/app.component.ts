import { Component } from '@angular/core';
import { AuthService, SocialUser, GoogleLoginProvider} from 'ng4-social-login';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apitest';
  public api;
  public user: any = SocialUser;
  constructor(private socialAuthService: AuthService, private http: HttpClient){}

  googleLogin(){
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      this.user = userData;
    });
  }

  googleMessage(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.user.token
    });
    this.api = this.http.get("https://www.googleapis.com/gmail/v1/users/jinn3648@gmail.com/messages", {headers:headers}).subscribe((res)=>{
      console.log(res);
    });
    // console.log(this.api);
  }
}
