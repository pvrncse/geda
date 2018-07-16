import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import {AuthService} from '../../../service/auth.service';
// import {Device} from '../app/models/device.model';
import {MatTableDataSource,MatSort,MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent {
  title=  "Device";
  testData:any;
  displayedColumns = ['deviceName', 'deviceModel.deviceModel', 'deviceMacId', 'deviceIp','status'];
  //dataSource = new MatTableDataSource<Device>(this.testData);
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator

  
  ngAfterViewInit() {
   this.deviceData();
  }
  
  deviceData(){
    this.authservice.deviceList().subscribe((value) => {
    //Data = value;
      console.log(value);
      this.testData = value;
      this.dataSource.data = value;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
     console.log(this.testData);
    });
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  constructor(public dialog: MatDialog,private http:HttpClient, private authservice:AuthService){
  }
  
  
  ngOnInit() {
  }
  

  openDialog(){
    let dialogRef = this.dialog.open(DeviceComponentDialog, {
      height: '380px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.deviceData();
    });
  }
 
 
}

@Component({
  selector: 'device-component-dialog',
  templateUrl: './device.component.dialog.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponentDialog {

  constructor(
    public dialogRef: MatDialogRef<DeviceComponentDialog>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,private _router: Router, private http :HttpClient,private authservice:AuthService) {
      this.createDevices();
     }

    deviceName: string;
    deviceModel: string;
    //deviceDescription: string;
    status:string;
    deviceMacId:string;
    
    public Device = [];
    selectedDevice: any;
    selectedDeviceIds: string[];
    selectedUserIds: number[];
    
    //device list//
    public createDevices() {
      this.authservice.deviceModelList().subscribe((value) =>{
        console.log(value);
        this.Device = value;
      })
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openModelDialog(){
    let dialogRef = this.dialog.open(DeviceComponentModelDialog, {
      height: '250px',
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(result);
      this.createDevices();
    });
  }


createData;
createList(){
  // let deviceModel:any;
  // deviceModel = {
  //               id : this.deviceModel
  //             }
  if(this.deviceName && this.deviceModel && this.deviceMacId){    
    this.createData = {'deviceName' : this.deviceName, 'deviceModel' : {id:this.deviceModel}, 'deviceMacId': this.deviceMacId,'status':null,'active':false } ;
    this.authservice.createDevice(this.createData).subscribe((value) => {
    console.log(value);
    console.log(this.createData);
    this.dialogRef.close();
    });
  }
  else{
    alert("please fill the required fields");
  }


}

// private reset() {
//   this.deviceName = ' ';	 
//   this.deviceModel = ' ';
//   this.deviceDescription = ' ';
// }
 }

@Component({
  selector: 'device-component-modeldialog',
  templateUrl: './device.component.modeldialog.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponentModelDialog{
  constructor(
    public dialogRef: MatDialogRef<DeviceComponentDialog>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,private _router: Router, private _http:HttpClient,private authservice:AuthService) {
  
     }
     deviceModel: string;

     onNoClick(): void {
      this.dialogRef.close();
    }
    dataModel;
    createDeviceModel(){
      if(this.deviceModel){
        this.dataModel = {'deviceModel' : this.deviceModel};
        this.authservice.createDeviceModel(this.dataModel).subscribe((value) => {
          console.log(value);
          let data:any = value;
          if(data.status){
            this.dialogRef.close();
          }else{
            alert(data.message);
          }
          });

      }
      else{
        alert('Please fill the field');
      }
     
    }
}