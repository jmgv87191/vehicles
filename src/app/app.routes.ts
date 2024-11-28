import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { TodasRevisionesComponent } from './components/todas-revisiones/todas-revisiones.component';
import { VerDetallesComponent } from './components/ver-detalles/ver-detalles.component';
import { authGuard } from './guards/auth.guard';
import { DialogComponent } from './components/dialog/dialog.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
    },
    {
        path:'dialog/:id',
        component:DialogComponent,
    },
    {
        path:'home',
        component: HomeComponent,
        canActivate:[ authGuard ]

    },
    {
        path:'monitor',
        component:MonitorComponent ,
        canActivate:[ authGuard ]

    },
    {
        path:'todasRevisiones/:id',
        component:TodasRevisionesComponent,
        canActivate:[ authGuard ]

    },
    {
        path:'detalles/:id',
        component:VerDetallesComponent,
        canActivate:[ authGuard ]
    },
    {
        path:'**',
        component: HomeComponent,
        canActivate:[ authGuard ]

    }
];
