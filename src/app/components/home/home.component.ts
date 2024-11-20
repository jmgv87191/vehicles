import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Detallerevision, Subcategoria, VehicleRes, vehicleResp, VehiclesRes } from '../../interfaces/vehicle';
import {FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const detallesRevision: Detallerevision[] = [
  { subcategoria: "LUZ DELANTERA", subcategoriaId: 1, estado: 1, observacion: "" },
  { subcategoria: "LUZ TRASERA", subcategoriaId: 2, estado: 1, observacion: "" },
  { subcategoria: "LUZ DE CUARTOS DELANTERO", subcategoriaId: 3, estado: 1, observacion: "" },
  { subcategoria: "LUZ DE CUARTOS TRASERO", subcategoriaId: 4, estado: 1, observacion: "" },
  { subcategoria: "LUZ DIRECCIONAL DERECHA DELANTERA", subcategoriaId: 5, estado: 1, observacion: "" },
  { subcategoria: "LUZ DIRECCIONAL IZQUIERDA DELANTERA", subcategoriaId: 6, estado: 1, observacion: "" },
  { subcategoria: "LUZ DIRECCIONAL DERECHA TRASERA", subcategoriaId: 7, estado: 1, observacion: "" },
  { subcategoria: "LUZ DIRECCIONAL IZQUIERDA TRASERA", subcategoriaId: 8, estado: 1, observacion: "" },
  { subcategoria: "LUCES PREVENTIVAS", subcategoriaId: 9, estado: 1, observacion: "" },
  { subcategoriaId: 10, subcategoria: "ASIENTOS DELANTEROS", estado: 1, observacion: "" },
  { subcategoriaId: 11, subcategoria: "ASIENTOS TRASEROS", estado: 1, observacion: "" },
  { subcategoriaId: 12, subcategoria: "VIDRIO FRENTE", estado: 1, observacion: "" },
  { subcategoriaId: 13, subcategoria: "VIDRIO TRASERO", estado: 1, observacion: "" },
  { subcategoriaId: 14, subcategoria: "ESPEJO LATERAL DERECHO", estado: 1, observacion: "" },
  { subcategoriaId: 15, subcategoria: "ESPEJO LATERAL IZQUIERDO", estado: 1, observacion: "" },
  { subcategoriaId: 16, subcategoria: "ESPEJO RETROVISOR", estado: 1, observacion: "" }
];


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule,
    AsyncPipe, ReactiveFormsModule, CommonModule, MatTableModule, MatTableModule, MatPaginatorModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  myControl = new FormControl('',Validators.required);
  filteredOptionsList: Observable<VehiclesRes[]> | undefined;
  idVehiculos: VehiclesRes[] = []
  form: FormGroup;
  revision:Subcategoria[] = [];
  displayedColumns: string[] = [ 'Subcategoria', 'Calificacion', 'Observaciones'];
  dataSource = detallesRevision;
/* ======================================================== */
  selectedVehicleId: string = ''
  vehicleReq!: VehicleRes;
  agregarRevision!: vehicleResp;
  today="";
  successStatus: boolean = false;
  errorStatus: boolean = false;
  nullStatus: boolean = false;
  successMsj: string = 'Revision agregada';
  errorMsj: string = 'No se pudo agregar la revision';
  nullMsj: string = 'No hay ningun vehiculo seleccionado';
  usuario: string | null = "";



  filas = [
    { id: 0, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 1, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 2, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 3, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 4, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },]  },
    { id: 5, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 6, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 7, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 8, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 9, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 10, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 11, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 12, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 13, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
    { id: 14, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },]  },
    { id: 15, boton: [{ id: 1, color: 'grey' },{ id: 2, color: 'grey' },{ id: 3, color: 'grey' },] },
  ];




  datosAEnviar!:vehicleResp;

  constructor(
    private _vehicleService: VehicleService,
    private fb: FormBuilder,
    private router: Router,
    private _authService:AuthService,

  ){
    this.form = this.fb.group({
      estado: this.fb.array( detallesRevision.map((item)=> this._createFormGroup(item)) ),
      nombre_asignado: ["",Validators.required],
      marca:[""],
      modelo:[""],
      date: [''],
      observacionesGen:[""],
      id_vehicle: new FormControl(2, Validators.required)
    })
  }

  ngOnInit(): void {
    this.getVehicles();

    this.today = new Date().toISOString().split('T')[0]; 
    this.form.controls['date'].setValue(this.today);
    this.usuario = localStorage.getItem('usuario')

    this.filteredOptionsList = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._listFilter(value || '')),
    );
  }

  getVehicles(){
    this._vehicleService.getVehicles().subscribe((data)=>{
      this.idVehiculos = data;
    })
  }

  private _listFilter(value: string): VehiclesRes[] {
    const filterValue = value;

    return this.idVehiculos.filter(option => String(option.no_economico).includes(filterValue));
  }

  onOptionSelected(event: any) {
    const selectedOptionValue = event.option.value;  // El valor es no_inventario

    // Buscar el vehículo correspondiente a no_inventario
    const selectedVehicle = this.idVehiculos.find(
      (vehicle) => vehicle.no_economico === selectedOptionValue
    );

    if (selectedVehicle) {
      this.selectedVehicleId = String(selectedVehicle.id);  // Guardar el id

      // Obtener la información del vehículo seleccionado
      this._vehicleService.getVehicle(Number(this.selectedVehicleId)).subscribe((data) => {
        this.vehicleReq = data;

        // Actualizar los detalles de la revisión con los datos del vehículo
        for (let i = 0; i < detallesRevision.length; i++) {
          const lastRevisionDetail = data.revision[data.revision.length - 1]?.detalles[i];

          if (lastRevisionDetail?.estado != null && lastRevisionDetail?.observacion != null) {
            detallesRevision[i].estado = lastRevisionDetail.estado;
            detallesRevision[i].observacion = lastRevisionDetail.observacion;

            if (detallesRevision[i].estado===1) {
              this.filas[i].boton[0].color = 'green';  
              this.filas[i].boton[1].color = 'grey';  
              this.filas[i].boton[2].color = 'grey';  
            }else if( detallesRevision[i].estado===2 ){

              this.filas[i].boton[1].color = 'yellow';  
              this.filas[i].boton[0].color = 'grey';  
              this.filas[i].boton[2].color = 'grey';  
            }else{
              this.filas[i].boton[2].color = 'red';  
              this.filas[i].boton[1].color = 'grey';  
              this.filas[i].boton[0].color = 'grey';  
            }

          } else {
            detallesRevision[i].estado = 2;
            detallesRevision[i].observacion = '.';
            if (detallesRevision[i].estado===1) {
              this.filas[i].boton[0].color = 'green';  
              this.filas[i].boton[1].color = 'grey';  
              this.filas[i].boton[2].color = 'grey';  
            }else if( detallesRevision[i].estado===2 ){

              this.filas[i].boton[1].color = 'yellow';  
              this.filas[i].boton[0].color = 'grey';  
              this.filas[i].boton[2].color = 'grey';  
            }else{
              this.filas[i].boton[2].color = 'red';  
              this.filas[i].boton[1].color = 'grey';  
              this.filas[i].boton[0].color = 'grey';  
            }
          }
        }

        // Actualizar el formulario con los nuevos datos
        this.form = this.fb.group({
          estado: this.fb.array(detallesRevision.map((item) => this._createFormGroup(item))),
          nombre_asignado: [data.asignado],
          marca: [data.marca],
          modelo: [data.modelo],
          observacionesGen:this.vehicleReq.revision[this.vehicleReq.revision.length-1].observaciones
        });
      });
    }
  }

  private _createFormGroup( vehicle: Detallerevision ){

    return this.fb.group(
      {
        subcategoriaId: vehicle.subcategoriaId,
        subcategoria:   vehicle.subcategoria,
        estado:         vehicle.estado,
        observacion: vehicle.observacion,
      }
    )
  }

  get productFormArray() { 
    return this.form.get('estado') as FormArray;
  }

  sumar1(valor: number, index: number) {

    console.log(index)

    if (index===0) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===1) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===2) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===3) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===4) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===5) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===6) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===7) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===8) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===9) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===10) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===11) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===12) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===13) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===14) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===15) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 1;
          this.filas[index].boton[0].color = 'green';  
          this.filas[index].boton[1].color = 'grey';  
          this.filas[index].boton[2].color = 'grey';  
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }





  }

  sumar2(valor: number, index: number) {

    console.log(index)

    if (index===0) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===1) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===2) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===3) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===4) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===5) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===6) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===7) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===8) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===9) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===10) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===11) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===12) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===13) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===14) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===15) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 2;

          this.filas[index].boton[0].color = 'grey';
          this.filas[index].boton[1].color = 'yellow';
          this.filas[index].boton[2].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }


  }

  sumar3(valor: number, index: number) {

    console.log(index)

    if (index===0) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===1) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===2) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===3) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===4) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===5) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===6) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===7) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===8) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===9) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===10) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===11) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===12) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===13) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===14) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }

    if (index===15) {
      
      const formArray = this.productFormArray;
  
      if (formArray && formArray.at(index)) {
        const estadoControl = formArray.at(index).get('estado') as FormControl;
    
        if (estadoControl) {
          let nuevoEstado = 3;
          this.filas[index].boton[2].color = 'red';
          this.filas[index].boton[1].color = 'grey';
          this.filas[index].boton[0].color = 'grey';
        
          estadoControl.setValue(nuevoEstado);
          estadoControl.updateValueAndValidity();
    
          console.log(`Nuevo estado en el índice ${index}:`, nuevoEstado);
        } else {
          console.error('El control "estado" no está definido para el índice', index);
        }
      } else {
        console.error('El índice no existe en el FormArray:', index);
      } 

    }






  }













  enviar(){

    if (this.myControl.valid) {

    
      
      this.agregarRevision ={
        inventarioId: this.vehicleReq.id,
        // funcionarioId: Number(this.vehicleReq.revision![0].funcionarioId),
        funcionarioId: this.vehicleReq.asignadoId,
        userId: this.vehicleReq.userId,  
        fecha: this.today,
        observaciones: this.form.value.observacionesGen,
        detallerevision:this.productFormArray.value
      } 


      
      this._vehicleService.addInspection(this.agregarRevision).subscribe(
        (data) => {
          this.successStatus = true;

          setTimeout(() => {
            this.successStatus = false;
            document.body.style.overflow = "auto";
            this.form.reset();
            this.myControl.reset();
            
            for (let i = 0; i < detallesRevision.length; i++) {
              detallesRevision[i].estado = 0;
              this.filas[i].boton[0].color = 'grey';  
              this.filas[i].boton[1].color = 'grey';  
              this.filas[i].boton[2].color = 'grey';  
            }
        
          }, 1000);

          window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        document.body.style.overflow = "hidden";
        },
        (error) => {
          console.log(this.agregarRevision)
          console.error('Error al agregar la revisión:', error);
          this.errorStatus = true;


          setTimeout(() => {
            this.errorStatus = false;
            document.body.style.overflow = "auto";
            this.form.reset();
            this.myControl.reset();
        
          }, 1000);

          window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        document.body.style.overflow = "hidden";
        }
      );
    }
    else{
      this.nullStatus = true;
      
      setTimeout(() => {
        this.nullStatus = true;
        document.body.style.overflow = "auto";
        this.form.reset();
        this.myControl.reset();
    
      }, 1000);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
      console.log('El campo es obligatorio, no se puede enviar.');
      document.body.style.overflow = "hidden";

    }


  }

  quitar() {
    this.successStatus = false;
    this.errorStatus = false;
    this.nullStatus = false;
    this.form.reset();
    this.myControl.reset();

    document.body.style.overflow = "auto";

  }

  onLogout(){
    this._authService.logOut();
    this.router.navigate(['/'])
  }

}
