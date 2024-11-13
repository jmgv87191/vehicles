import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { MonitorVehicle } from '../../interfaces/vehicle';

@Component({
  selector: 'app-todas-revisiones',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './todas-revisiones.component.html',
  styleUrl: './todas-revisiones.component.css'
})
export class TodasRevisionesComponent implements OnInit {

  id:number = 0;
  todasLasRevisiones: MonitorVehicle [] = []
  @Input() marca: string = 'asdasd';


  constructor(
    private aRoute: ActivatedRoute,
    private _vehicleService: VehicleService

  ){

  }

  ngOnInit(): void {


    this.id = Number(this.aRoute.snapshot.paramMap.get('id'))

    this._vehicleService.getVehicleMonitoreo( this.id ).subscribe((data)=>{
      this.todasLasRevisiones = data;
    })

  


  }

}
