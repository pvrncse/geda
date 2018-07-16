import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from '../../../service/auth.service';
import { MatTabChangeEvent } from '@angular/material';
@Component({
  selector: 'app-usersetting',
  templateUrl: './usersetting.component.html',
  styleUrls: ['./usersetting.component.css']
})
export class UsersettingComponent implements OnInit {

  constructor(private _http:HttpClient, private authservice:AuthService) { }
  title:string = "User Settings"
  ngOnInit() {
    this.getTestRailDetails(); 
    console.log(window.location);
    let urlparam:any = window.location;
    let url = new URL(urlparam);
    let c = url.searchParams.get("tab");
    if(c=='jira'){
      this.selectedIndex = 1;
      this.getJiraAuthorizedDetail();
    }
  }
userName:string;
apiKey:string;
accessToken:string;
requestToken:string;
selectedIndex:number;
oldPassword : string;
newPassword:string;
confirmNewPassword:string;
getTestRailDetails(){
  this.authservice.getTestRailDetails().subscribe((value) => {
    console.log(value);
    let data:any = value;
    if(data.status){      
      this.userName = data.data.username;
      this.apiKey = data.data.api_key;
    }else{
      alert(data.message);
    }
  });
}
tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
  console.log('tabChangeEvent => ', tabChangeEvent);
  console.log('index => ', tabChangeEvent.index);
  //tabChangeEvent.index = 1;
  if(tabChangeEvent.index==1){
    this.getJiraAuthorizedDetail();
  }
}
updateTestRailDetails(){
  let data:object = {username:this.userName,api_key:this.apiKey};
  console.log(data);
  this.authservice.updateTestRailDetails(data).subscribe((value) => {
    console.log(value);
    let test:any = value;
    console.log(test);
    alert(test.message);
    if(test.status){      
      this.clearFields();
    }
  });
}
getAuthorization(){
  this.authservice.getAuthorization().subscribe((value) => {
    console.log(value);
     let data:any = value;
    if(data.status){      
      window.open(data.data.url, '_blank');
    }
  });
}
getJiraAuthorizedDetail(){
  this.authservice.getJiraAuthorizedDetail().subscribe((value) => {
    console.log(value);
    let data:any = value;
    if(data.status){      
      this.accessToken = data.data.access_token;
      this.requestToken = data.data.request_token;
    }else{
      alert(data.message);
    }
  });
}
updatePassword(){
  if(this.oldPassword&&this.newPassword&&this.confirmNewPassword){
  this.authservice.getJiraAuthorizedDetail().subscribe((value) => {
    console.log(value);
    let data:any = value;
    if(data.status){      
      this.accessToken = data.data.access_token;
      this.requestToken = data.data.request_token;
    }else{
      alert(data.message);
    }
  });
}else{
  alert('Please fill the details');
}
}
clearFields(){
  this.apiKey = '';
  this.userName = '';
}
testFun(){
  alert('hey');
}
}
