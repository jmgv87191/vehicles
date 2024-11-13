import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TablaMonitor } from '../../interfaces/vehicle';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})
export class MonitorComponent implements OnInit {

  usuario: string | null = "";
  tablaMonitor: TablaMonitor[] = []
  modelo!:string;

  @Output() marca: EventEmitter<string> = new EventEmitter<string>();

constructor(
  private _authService:AuthService,
  private router: Router,
  private _vehicleService: VehicleService
){

}
  ngOnInit(): void {

    this.usuario = localStorage.getItem('usuario')
    this.getVehicles();

  }

  getVehicles(): void {
    this._vehicleService.getVehiclesMonitoreo().subscribe((data: TablaMonitor[]) => {
      this.tablaMonitor = data;
      
      if (this.tablaMonitor.length > 0) {
        this.marca.emit(this.tablaMonitor[0].marca);
      }
    });
  }

  
  onLogout(){
    this._authService.logOut();
    this.router.navigate(['/'])
  }

  
}
