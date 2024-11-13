import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { TodasRevisionesComponent } from './components/todas-revisiones/todas-revisiones.component';
import { VerDetallesComponent } from './components/ver-detalles/ver-detalles.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
    },
    {
        path:'home',
        component: HomeComponent,
    },
    {
        path:'monitor',
        component:MonitorComponent  
    },
    {
        path:'todasRevisiones/:id',
        component:TodasRevisionesComponent  
    },
    {
        path:'detalles/:id',
        component:VerDetallesComponent  
    },
    {
        path:'**',
        component: HomeComponent,
    }
];
