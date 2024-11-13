import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { RevisionMonitor } from '../../interfaces/vehicle';

@Component({
  selector: 'app-ver-detalles',
  standalone: true,
  imports:   [ RouterLink ],
  templateUrl: './ver-detalles.component.html',
  styleUrl: './ver-detalles.component.css'
})
export class VerDetallesComponent implements OnInit {

  contDetalles: RevisionMonitor[] = []

  constructor(
    private aRoute:ActivatedRoute,
    private _vehicleService:VehicleService
  ){

  }

  ngOnInit(): void {
    console.log( this.aRoute.snapshot.paramMap.get('id') )


    this._vehicleService.getDetalles(Number(this.aRoute.snapshot.paramMap.get('id'))).subscribe((data)=>{
      console.log(data)
      this.contDetalles = data
    })

  }

}
