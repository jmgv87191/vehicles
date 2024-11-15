import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { MonitorVehicle } from '../../interfaces/vehicle';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-todas-revisiones',
  standalone: true,
  imports: [ RouterLink, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule  ],
  templateUrl: './todas-revisiones.component.html',
  styleUrl: './todas-revisiones.component.css'
})
export class TodasRevisionesComponent implements OnInit {

  id:number = 0;
  todasLasRevisiones: MonitorVehicle [] = []
  form: FormGroup


  constructor(
    private aRoute: ActivatedRoute,
    private _vehicleService: VehicleService,
    private fb: FormBuilder

  ){

    this.form = fb.group({
      marca: [ "" ],
      modelo:[""],
      asignado:[""],
      noEconomico:[""],
      ubicacion:[""],
      descripcion:[""],
    })

  }

  ngOnInit(): void {


    this.id = Number(this.aRoute.snapshot.paramMap.get('id'))

    this._vehicleService.getVehicleMonitoreo( this.id ).subscribe((data)=>{
      console.log(data)
      this.todasLasRevisiones = data;
    })

  this._vehicleService.getVehicle(this.id).subscribe((data)=>{
    this.form.setValue({
      marca: data.marca,
      modelo: data.modelo,
      asignado: data.asignado,
      noEconomico: data.noeconomico,
      ubicacion: data.ubicacion,
      descripcion: data.descripcion
    })
  })




  }

}
