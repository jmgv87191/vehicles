import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Detallerevision } from '../../interfaces/vehicle';
import {MatTableModule} from '@angular/material/table';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatTableModule,RouterLink],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})

export class DialogComponent implements OnInit {

  vehicleData: Detallerevision[] = []
  displayedColumns: string[] = ['subcategoria','estado'];
  dataSource = this.vehicleData;
  id: number = 0

  constructor( private _vehicleService:VehicleService,
    aRoute: ActivatedRoute
  ){
    this.id = Number(aRoute.snapshot.paramMap.get('id'))
  }

  ngOnInit(): void {
  
    this._vehicleService.getVehicle(this.id).subscribe((data)=>{
      this.dataSource = data.revision[data.revision.length-1].detalles
    })

  }





}
