import { Routes,RouterModule }  from '@angular/router';
import { DashboardComponent } from './components/mainpage/dashboard/dashboard.component';
import { DeviceComponent } from './components/mainpage/device/device.component';
import { TestComponent } from './components/mainpage/test/test.component';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { UsermanagementComponent } from './components/mainpage/usermanagement/usermanagement.component'
import { UsersettingComponent } from './components/mainpage/usersetting/usersetting.component'

const routes : Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    { 
        path:"login" , component:LoginComponent,
    },
    
    {
        path: "mainpage", component:MainpageComponent,
        children: [
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'test', component: TestComponent },
            { path: 'device', component: DeviceComponent },
            { path: 'usermanagement', component: UsermanagementComponent },
            { path: 'usersettings', component: UsersettingComponent }
        ]
    },
    
        ]
    
export const routing = RouterModule.forRoot(routes);