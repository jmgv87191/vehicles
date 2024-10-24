import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { Detallerevision, VehicleReq, vehicleResp, VehiclesReq } from '../../interfaces/vehicle-resp';
import { CommonModule } from '@angular/common';
import { FormGroup,Validators,FormBuilder,ReactiveFormsModule, FormsModule } from '@angular/forms';
import { __values } from 'tslib';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] 
})
export class DashboardComponent implements OnInit  {

  vehicles: VehiclesReq[] = [];
  vehicleReq!: VehicleReq;
  vehicleRes!: vehicleResp;
  form: FormGroup;
  estado: number = 2

  detallesRevision: Detallerevision[] = [
    {
      subcategoria: "LUZ DELANTERA",
      subcategoriaId : 1,
      estado:this.estado,
      observacion: ""
    },
    {
      subcategoria: "LUZ TRASERA",
      subcategoriaId : 2,
      estado:this.estado,
      observacion: ""
    },
    {
      subcategoria: "LUZ DE CUARTOS DELANTERO",
      subcategoriaId : 3,
      estado:this.estado,
      observacion: ""
    },
    {
      subcategoria: "LUZ DE CUARTOS TRASERO",
      subcategoriaId : 4,
      estado:this.estado,
      observacion: ""
    },
    {
      subcategoria: "LUZ DIRECCIONAL DERECHA DELANTERA",
      subcategoriaId : 5,
      estado:this.estado,
      observacion: ""
    },
    {
      subcategoria: "LUZ DIRECCIONAL IZQUIERDA DELANTERA",
      subcategoriaId : 6,
      estado:this.estado,
      observacion: ""
    },
    {
      subcategoria: "LUZ DIRECCIONAL DERECHA TRASERA",
      subcategoriaId : 7,
      estado:this.estado,
      observacion: ""
    },
    {
      subcategoria: "LUZ DIRECCIONAL IZQUIERDA TRASERA",
      subcategoriaId : 8,
      estado:this.estado,
      observacion: ""
    },
    {
      subcategoria: "LUCES PREVENTIVAS",
      subcategoriaId : 9,
      estado:this.estado,
      observacion: ""
    },
    {
      subcategoriaId: 10,
      subcategoria: "ASIENTOS DELANTEROS",
      estado: this.estado,
      observacion: ""
    },
    {
      subcategoriaId: 11,
      subcategoria: "ASIENTOS TRASEROS",
      estado: this.estado,
      observacion: ""
    },
    {
      subcategoriaId: 12,
      subcategoria: "VIDRIO FRENTE",
      estado: this.estado,
      observacion: ""
    },
    {
      subcategoriaId: 13,
      subcategoria: "VIDRIO TRASERO",
      estado: this.estado,
      observacion: ""
    },
    {
      subcategoriaId: 14,
      subcategoria: "ESPEJO LATERAL DERECHO",
      estado: this.estado,
      observacion: ""
    },
    {
      subcategoriaId: 15,
      subcategoria: "ESPEJO LATERAL IZQUIERDO",
      estado: this.estado,
      observacion: ""
    },
    {
      subcategoriaId: 16,
      subcategoria: "ESPEJO RETROVISOR",
      estado: this.estado,
      observacion: ""
    }
  ]
  
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
      console.log(data)
  })
    
  }


  agregar() {
    if (this.form.valid && this.vehicleReq) {
      this.vehicleRes = {
        inventarioId: this.vehicleReq.id,
        funcionarioId: this.form.value.funcionarioId,
        userId: 5,  
        fecha: this.form.value.date,
        detallerevision: this.detallesRevision.map((detalle) => ({
          subcategoriaId: detalle.subcategoriaId,  
          subcategoria: detalle.subcategoria,     
          estado: detalle.estado,  
          observacion: "Observación por defecto" 
        }))
      };
  
      console.log('vehicleRes:', this.vehicleRes);

      this._vehicleService.addInspection(this.vehicleRes).subscribe((data)=>{
        console.log("revision agregada")
      })
      
      // Aquí puedes llamar a un servicio para enviar los datos (si es necesario)
      // this._vehicleService.saveVehicle(this.vehicleRes).subscribe(...);
    } else {
      // Si el formulario no es válido, mostrar un mensaje o un log
      console.log('Formulario inválido o vehicleReq no disponible');
    }
  }
  
  sumar(valor: number, index: number) {
    let nuevoEstado = this.detallesRevision[index].estado + valor;
  
    if (nuevoEstado < 1) {
      nuevoEstado = 1;
      
    } else if (nuevoEstado > 3) {
      nuevoEstado = 3;
    }
  
    this.detallesRevision[index].estado = nuevoEstado;
  }
  
  

}
