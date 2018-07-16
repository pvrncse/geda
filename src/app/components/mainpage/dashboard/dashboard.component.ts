
import { Observable } from 'rxjs';
import { Component,ViewChild,Inject, OnDestroy,OnInit,HostListener } from '@angular/core';
import {Subscription} from "rxjs";
import 'rxjs/add/operator/filter';
import {routing} from '../../../app.route';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  innerWidth:number;
  visible:boolean;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
   this.innerWidth = window.innerWidth;
   //console.log(this.innerWidth);
   if(this.innerWidth>600){
     this.visible = false;
   }
   else{
     this.visible=true;
   }
  }
  



 // Area Chart
 public lineChartData:Array<any> = [
  {data: [65, 59, 80, 81, 56, 55, 40], label: 'Today'},
  {data: [28, 48, 40, 19, 86, 27, 90], label: 'Yesterday'},
  
];
public lineChartLabels:Array<any> = ['0', '03.00', '06.00', '09.00', '12.00', '15.00', '18.00'];
public lineChartOptions:any = {
  responsive: true
};
public lineChartColors:Array<any> = [
  { 
    backgroundColor: 'rgba(51, 153, 255,0.5)',
    borderColor: '#fff',
    pointBackgroundColor: '51, 153, 255,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(51, 153, 255)',
   
  },
  { 
    backgroundColor: 'rgba(230, 138, 0,0.5)',
    borderColor: '#fff',
    pointBackgroundColor: 'rgba(230, 138, 0,0.1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(230, 138, 0)',
  
  },
];
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';

public randomize():void {
  let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  for (let i = 0; i < this.lineChartData.length; i++) {
    _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    for (let j = 0; j < this.lineChartData[i].data.length; j++) {
      _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    }
  }
  this.lineChartData = _lineChartData;
}
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}
constructor() {
  this.innerWidth = window.innerWidth;
  if(this.innerWidth>600){
    this.visible = false;
  }
  else{
    this.visible=true;
  }
 }
title="Dashboard";
  ngOnInit() {
    //this.isLoggedIn$ = this.authService.isLoggedIn;
  }

}
