import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
import {MatTableDataSource,MatSort,MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';


@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponent implements OnInit {
  title:string = "User Management";
  displayedColumns = ['userName', 'email', 'role.userRole', 'id'];
  //dataSource = new MatTableDataSource<Device>(this.testData);
  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private authservice:AuthService) { }
  

  ngAfterViewInit() {
   
  }

  ngOnInit() {
    this.getUserList();
  }
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }
  getUserList() {
    this.authservice.getUserList().subscribe((value) => {
      console.log(value);
       let data:any = value;
       if(data.status){
        //this.dataSource = data.data;
        this.dataSource.data = data.data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
       }else{
         alert(data.message);
       }
      });
    
  }

  // masterToggle() {
  //   this.isAllSelected() ?
  //       this.selection.clear() :
  //       this.dataSource.data.forEach(row => this.selection.select(row));
  // }

  openDialog(){
    let dialogRef = this.dialog.open(UsermanagementComponentDialog, {
      height: '440px',
      width: '500px',
      disableClose: true,
    });
        
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getUserList();
    });
  }
 
}

@Component({
  selector: 'usermanagement-componentdialog',
  templateUrl: './uesrmanagement.componentdialog.html',
  styleUrls: ['./usermanagement.component.css']
})
export class UsermanagementComponentDialog {
title:string = "Add New User";
RoleList = [];
newUserData:object = {
  appUser:'',
  userName:'',
  role:'',
  password:''

}
  constructor(
    public dialogRef: MatDialogRef<UsermanagementComponentDialog>,public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,private _router: Router, private authservice : AuthService) {

     }
     ngOnInit() {         
      this.getUserRoles();
    }
     onNoClick(): void {
      this.dialogRef.close();
    }
    closeDialog() {
      this.dialogRef.close();
    }
    createUser(data:any){
      console.log(data);
      data.role = {roleId:data.role};
      console.log(data);
      this.authservice.createUser(data).subscribe((value) => {
        console.log(value);
         let data:any = value;
        if(data.status){
          this.closeDialog();
        }else{
          alert(data.message);
        }
         });
    }
    deleteUser(){
      console.log('data');
    }
    getUserRoles(){
      this.authservice.getUserRoles().subscribe((value) => {
        console.log(value);
        let data:any = value;
        if(data.status){
          this.RoleList = data.data;
          console.log(this.RoleList);
        }else{
          alert(data.message);
        }
        });
    }
    
    }
