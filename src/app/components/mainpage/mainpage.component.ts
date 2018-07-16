import { Component,ViewChild,Inject, OnDestroy,OnInit,HostListener } from '@angular/core';
import {Subscription} from "rxjs";
import 'rxjs/add/operator/filter';
import {Router} from '@angular/router';
@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
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
  constructor(private _router: Router) {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth>600){
      this.visible = false;
    }
    else{
      this.visible=true;
    }
 }

  ngOnInit() {
  }

}
