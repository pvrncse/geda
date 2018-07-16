import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Router} from '@angular/router';
//import {Http} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import {AuthService} from '../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  constructor(private _router: Router, private _http:HttpClient, private authservice:AuthService) {
  
  }
  userName : string
  password : string

  ngOnInit() {

  }

  test;
submit() {  
  if(this.userName == null){
    alert("please fill required fields");
  }
  else{
    this.test={ 'userName': this.userName, 'password':this.password};
     console.log(this.test);
     this.authservice.login(this.test).subscribe((value) => {
        let data:any = value;
        console.log(data);
        // Check browser support
        if (typeof(Storage) !== "undefined") {
          // Store
          localStorage.setItem("token", data.Token);
          this._router.navigateByUrl('/mainpage/dashboard');
          // Retrieve
          //localStorage.getItem("lastname");
        } else {
          console.log("Sorry, your browser does not support Web Storage...");
        }
      });
  }
  

  }
}

