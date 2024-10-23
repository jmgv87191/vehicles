import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { VehicleReq, vehicleResp, VehiclesReq } from '../../interfaces/vehicle-resp';
import { CommonModule } from '@angular/common';
import { FormGroup,Validators,FormBuilder,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit  {

  vehicles: VehiclesReq[] = [];
  vehicleReq!: VehicleReq;
  vehicleRes!: vehicleResp;
  form: FormGroup;

  constructor(private _vehicleService: VehiculoService,
          private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      
      funcionarioId: [null, Validators.required],
      date: [null, Validators.required]
    });
    

  }

  ngOnInit(): void {

    this._vehicleService.getVehicles().subscribe((data) => {
      this.vehicles = data;
    });

  }

  onSelect(event: any): void {
    const selectedVehicleId = parseInt(event.target.value, 10);

    const selectedVehicle = this.vehicles.find(v => v.id === selectedVehicleId);
  
    this._vehicleService.getVehicle( Number(selectedVehicle?.id) ).subscribe( (data) =>{
      this.vehicleReq = data

      this.vehicleRes = {
        inventarioId: data.id,
        funcionarioId: this.form.value.funcionarioId,
        userId: 4343434,
        fecha: this.form.value.date,
        detallerevision: [ 
          { 
            subcategoriaId: 2,
            subcategoria: "string",
            estado: 3,
            observacion: "asdasd"
          }
        ]
      };

  })
    
  }


  agregar(){

  }

}
