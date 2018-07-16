import { Component, OnInit,ViewChild, Inject, ChangeDetectionStrategy } from '@angular/core';
import {MatTableDataSource,MatSort,MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {TreeviewItem } from '../../../vendor/tree-view-lib/treeview-item'
import { TreeviewConfig } from '../../../vendor/tree-view-lib/treeview-config'
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./test.component.css']
})
export class TestComponent  {
  title=  "Test Execution";
  displayedColumns = ['testRunName', 'testCaseCount', 'deviceCount','id'];
  dataSource = new MatTableDataSource();
  //selection = new SelectionModel(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
constructor(private router: Router,public dialog: MatDialog, private http :HttpClient, private authservice:AuthService){
 
}


  ngAfterViewInit() {
    
  }
  ngOnInit(){
    this.getTestRun();
    //this.loadDialog();
  }
 
  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  getTestRun() {
    this.authservice.getTestRun().subscribe((value) => {
      console.log(value);
       let data:any = value;
       if(data.status){
        console.log(data.data);
        this.dataSource.data = data.data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       }else{
         alert(data.message);
       }
      });
    
  }

testdata;
openDialog(): any {

  let dialogRef = this.dialog.open(TestComponentDialog, {
    height: '500px',
    width: '600px',
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.getTestRun();
  });
}
loadProgressDialog(){
  let dialogReference = this.dialog.open(TestProgressComponent, {
    height: '500px',
    width: '600px',
  });

  dialogReference.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}



}

// export interface Element {
//   testName: string;
//   test: string;
//   device: string;
//   status:string;
// }
  

// const Data: Element[] = [
//   { testName: 'device1', test: '',  device: '',status:" "},
// ];

@Component({
  selector: 'test-component-dialog',
  templateUrl: './test.component.dialog.html',
  styleUrls: ['./test.component.css']
})
export class TestComponentDialog implements OnInit {

  //getBooks();
  myData:any;
  enableButton = true;
  listOfTestCases: TreeviewItem[];
  testCaseIds: number[];
  config = TreeviewConfig.create({    
    decoupleChildFromParent: false,
    maxHeight: 200,
    hasFilter:false,
    hasAllCheckBox:true,
    hasCollapseExpand:true
  });
  buttonClasses = [
    'btn-outline-primary',
];
buttonClass = this.buttonClasses[0];
caretDom:any ;
  itemList = [];
    settings = {};
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  testName:string;
  
  constructor(
    
    public dialogRef: MatDialogRef<TestComponentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder, private authservice: AuthService, private http: HttpClient) {
      
DOMImplementation
     }
     
     ngOnInit() {         
      this.firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required]
      });
      this.Devices();
      this.Projects();
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
       });

    this.loadStaticCases();
    this.destroyTree();
    }
    onFilterChange(value: string) {
      console.log('filter:', value);      
  }
  selectedRow(data:any){
    console.log(data);
  }

  Device = [];
  ProjectList = [];
  selectedDevice: any;
  selectedDeviceIds: string[];
  selectedDeviceId: number;
  selectedUserIds: number[];
  selectedTestId: string[];
  currentProId:number;
  testCase:object={};
  allCasesIncluded:boolean=false;
  totalChecks:number = 0;

  closeDialog() {
    this.dialogRef.close();
  }

  createTest(){
console.log(this.listOfTestCases);

// for (let index = 0; index < this.listOfTestCases.length; index++) {
//   this.totalChecks = this.totalChecks + this.listOfTestCases[index].internalChildren.length;
  
// }
// if(this.totalChecks == this.testCaseIds.length){
//   this.allCasesIncluded = true;
// }
console.log(this.testCaseIds);
      this.testCase = {"name" : this.testName,
                        //"assignedto_id":1,
                        "include_all":this.allCasesIncluded, 
                        "device_ids" :this.selectedDeviceId,
                        "case_ids":this.testCaseIds,
                        "project_id":this.currentProId
                      };
      console.log(this.testCase);
      this.authservice.addTestRunsByProId(this.testCase).subscribe((value) => {
        console.log(value);
        let data:any = value;
        if(data.status){
          this.closeDialog();
        }else{
          alert(data.message);
        }
        });
    
    
  }

  Devices() {
    this.authservice.deviceList().subscribe((value) => {
      console.log(value);
      let Data = value;
      let DeviceObj = [];
      for(var index=0;index<Data.length;index++){
        DeviceObj.push({name:Data[index].deviceName,id:Data[index].id});
      }
      this.Device = DeviceObj;
      console.log(this.Device);
      });
    
  }
  Projects() {
    this.authservice.projectList().subscribe((value) => {
      console.log(value);
      let Data = value;
      let ProjectObj = [];
      for(var index=0;index<Data.length;index++){
        ProjectObj.push({name:Data[index].name,id:Data[index].id})
      }
      this.ProjectList = ProjectObj;
      console.log(this.ProjectList);
      });
    
  }
  
  loadStaticCases() {    
  //   this.listOfTestCases = [new TreeviewItem(
  //   //   {
  //   //     // title: 'Case',
  //   //     // value: 123456
  //   // }
  // )];
}
loadTestCasesByProject(data:any) {  
  this.currentProId = data;
  this.authservice.loadTestCasesByProject(data).subscribe((value) => {
    console.log(value);
             let data:any = value;
             let objArray = [];
            for (let index = 0; index < data.length; index++) {
                 objArray.push(new TreeviewItem(data[index]));               
               }
            
               this.listOfTestCases = objArray;
});
}
onChange($event){
  console.log($event);
  this.loadTestCasesByProject($event.id);
    }
    onChangeDevices($event){
      console.log(this.selectedDeviceId);
//this.selectedDeviceId = $event;
    }
destroyTree(){
  this.listOfTestCases = [];
}

}


@Component({
  selector: 'test-progress-dialog',
  templateUrl: './test.progress.dialog.html',
  styleUrls: ['./test.component.css']
})
export class TestProgressComponent implements OnInit {

  
  constructor(
    
    public dialogReference: MatDialogRef<TestProgressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private _formBuilder: FormBuilder, private authservice: AuthService, private http: HttpClient) {
      
DOMImplementation
     }
     
     ngOnInit() {   
    }



}
