import { Injectable } from '@angular/core';
//import {Http, Headers, RequestOptions} from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import {Observable} from 'rxjs/Observable';
import { TreeviewItem} from '../vendor/tree-view-lib/treeview-item';
@Injectable()
export class AuthService {

  constructor(private http:HttpClient) { }
  createAuthorizationHeader(headers: Headers) {
    headers.append('test', 'Token '+localStorage.getItem("token")); 
    console.log(headers);
  }

  apiAddress:string = 'http://192.168.10.82:8080/';

  login(data:any){
     let apiUrl:string = this.apiAddress+'login';
     return this.http.post(apiUrl, data)
  
  } 

createDevice(data:any){
  console.log(data);
  //let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
   let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
   console.log(headers.get('Authorization'));    
   let apiUrl: string = this.apiAddress+'rest/createDevice';
       return this.http.post(apiUrl, data, {headers:headers})
}
createDeviceModel(data:any){
  console.log(data);
  //let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
    let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
    console.log(headers.get('Authorization'));    
    let apiUrl: string = this.apiAddress+'rest/createDeviceModel';
        return this.http.post(apiUrl, data, {headers:headers})
}
      

 deviceList():any{
    let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
    console.log(headers.get('Authorization'));
     let apiUrl:string = this.apiAddress+'rest/deviceList';
     return this.http.get(apiUrl, {headers:headers})

 } 
 getDeviceStatus(data:any){
   console.log(data);
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'rest/getDeviceStatus?macId='+data.deviceMacId;
   return this.http.get(apiUrl, {headers:headers})

} 
getTestRunInfo(data:any){
  console.log(data);
 let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
 console.log(headers.get('Authorization'));
  let apiUrl:string = this.apiAddress+'getTestRunInfo?testRunId='+data.id;
  return this.http.get(apiUrl, {headers:headers})

} 

 
 getJiraAuthorizedDetail():any{
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'rest/getJiraAuthorizedDetail';
   return this.http.get(apiUrl, {headers:headers})

}
 getTestRun(){
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'getTestRun';
   return this.http.get(apiUrl, {headers:headers})

}
 
 updateTestRailDetails(data:any){
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'rest/getAuthorizeByTestRail?username='+data.username+'&api_key='+data.api_key;
   return this.http.post(apiUrl,data, {headers:headers})

}
getAuthorization(){
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'rest/getAuthorization';
   return this.http.get(apiUrl, {headers:headers})

}
getTestRailDetails(){
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'rest/getTestRailAuthorizedDetail';
   return this.http.get(apiUrl, {headers:headers})

}

getUserRoles(){
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'rest/getUserRole';
   return this.http.get(apiUrl, {headers:headers})

}
getUserList(){
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'rest/getUserList';
   return this.http.get(apiUrl, {headers:headers})

}


 addTestRunsByProId(data:any){
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'addTestRunsByProId';
   return this.http.post(apiUrl, data, {headers:headers})

}   
createUser(data:any){
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'rest/createUser';
   return this.http.post(apiUrl, data, {headers:headers})

} 
loadTestCasesByProject(data:any){
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'getAllSectionsByProId?proId='+data;
   return this.http.get(apiUrl, {headers:headers})

}  
 projectList():any{
  let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
  console.log(headers.get('Authorization'));
   let apiUrl:string = this.apiAddress+'getTestrailAllProjects';
   return this.http.get(apiUrl, {headers:headers})

} 
  
 deviceModelList():any{
   let headers = new HttpHeaders().set('Authorization', 'Token '+localStorage.getItem("token"));
   console.log(headers.get('Authorization'));
   let apiUrl :string = this.apiAddress+'rest/deviceModelList';
   return this.http.get(apiUrl, {headers:headers})
 }
 

loadtestdata():any{
    let apiUrl:string = this.apiAddress+'getAllTestRunsByProjectId';
  return this.http.get(apiUrl)
}





}

