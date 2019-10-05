import { Component, OnInit, Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent implements OnInit {


  _url = 'http://localhost:3000/auth/google';
  // constructor( private _http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(){
    // return this._http.post<any>(this._url, '');
  }  
}
