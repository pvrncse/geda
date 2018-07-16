import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './app.route';
//import { ɵROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from "@angular/router";
import { ChartsModule } from 'ng2-charts';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { TreeviewModule } from 'ngx-treeview';
import {
  
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatFormFieldModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/mainpage/dashboard/dashboard.component';
import { DeviceComponent ,DeviceComponentDialog, DeviceComponentModelDialog} from './components/mainpage/device/device.component';
import { TestComponent ,TestComponentDialog, TestProgressComponent} from './components/mainpage/test/test.component';
import { LoginComponent } from './components/login/login.component';
//import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { UsermanagementComponent, UsermanagementComponentDialog } from './components/mainpage/usermanagement/usermanagement.component';
import { UsersettingComponent } from './components/mainpage/usersetting/usersetting.component';
import {AuthService} from './service/auth.service';
//import {TestService} from './service/test.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DeviceComponent,
    TestComponent,
    DeviceComponentDialog,
    TestComponentDialog,
    TestProgressComponent,
    DeviceComponentModelDialog,
    LoginComponent,
    MainpageComponent,
    UsermanagementComponent,
    UsermanagementComponentDialog,
    UsersettingComponent
  ],
  imports: [
    //HttpModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    routing,
    ChartsModule,
    NgSelectModule,
    MatFormFieldModule,
    AngularMultiSelectModule,
    TreeviewModule.forRoot()
    
  ],
 
  entryComponents: [
    DeviceComponentDialog,TestComponentDialog, TestProgressComponent,DeviceComponentModelDialog,UsermanagementComponentDialog
],                                                                                                                                                                                    
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
