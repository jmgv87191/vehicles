import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { Detallerevision, VehicleReq, vehicleResp, VehiclesReq } from '../../interfaces/vehicle-resp';
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
  estado: number = 3

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

  })
    
  }


  agregar() {
    // Verificar si el formulario es válido antes de proceder
    if (this.form.valid && this.vehicleReq) {
      // Construir el objeto vehicleRes usando los valores del formulario y detallesRevision
      this.vehicleRes = {
        inventarioId: this.vehicleReq.id,
        funcionarioId: this.form.value.funcionarioId,
        userId: 4343434,  // Puedes cambiar el userId por el correcto si lo necesitas
        fecha: this.form.value.date,
        detallerevision: this.detallesRevision.map((detalle) => ({
          subcategoriaId: detalle.subcategoriaId,   // Asegurarse de que coincide con la interfaz
          subcategoria: detalle.subcategoria,       // Agregar el campo que falta según tu interfaz
          estado: detalle.estado,  
          observacion: "Observación por defecto" // Puedes ajustar esta observación según sea necesario
        }))
      };
  
      // Imprimir el resultado en la consola
      console.log('vehicleRes:', this.vehicleRes);
      
      // Aquí puedes llamar a un servicio para enviar los datos (si es necesario)
      // this._vehicleService.saveVehicle(this.vehicleRes).subscribe(...);
    } else {
      // Si el formulario no es válido, mostrar un mensaje o un log
      console.log('Formulario inválido o vehicleReq no disponible');
    }
  }
  
  sumar(valor:number){
    this.estado = this.estado + valor
  }

}
