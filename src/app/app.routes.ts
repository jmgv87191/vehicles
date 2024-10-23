import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [

    {
        path:'home',
        component:DashboardComponent
    },
    {
        path:'**',
        component:DashboardComponent
    }

];
