import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { Detallerevision, Subcategoria, VehicleRes, vehicleResp, VehiclesRes } from '../../interfaces/vehicle';
import {FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const detallesRevision: Detallerevision[] = [
  { subcategoria: "LUZ DELANTERA", subcategoriaId: 1, estado: 1, observacion: "Observacion por defecto" },
  { subcategoria: "LUZ TRASERA", subcategoriaId: 2, estado: 1, observacion: "Observacion por defecto" },
  { subcategoria: "LUZ DE CUARTOS DELANTERO", subcategoriaId: 3, estado: 1, observacion: "Observacion por defecto" },
  { subcategoria: "LUZ DE CUARTOS TRASERO", subcategoriaId: 4, estado: 1, observacion: "Observacion por defecto" },
  { subcategoria: "LUZ DIRECCIONAL DERECHA DELANTERA", subcategoriaId: 5, estado: 1, observacion: "Observacion por defecto" },
  { subcategoria: "LUZ DIRECCIONAL IZQUIERDA DELANTERA", subcategoriaId: 6, estado: 1, observacion: "Observacion por defecto" },
  { subcategoria: "LUZ DIRECCIONAL DERECHA TRASERA", subcategoriaId: 7, estado: 1, observacion: "Observacion por defecto" },
  { subcategoria: "LUZ DIRECCIONAL IZQUIERDA TRASERA", subcategoriaId: 8, estado: 1, observacion: "Observacion por defecto" },
  { subcategoria: "LUCES PREVENTIVAS", subcategoriaId: 9, estado: 1, observacion: "Observacion por defecto" },
  { subcategoriaId: 10, subcategoria: "ASIENTOS DELANTEROS", estado: 1, observacion: "Observacion por defecto" },
  { subcategoriaId: 11, subcategoria: "ASIENTOS TRASEROS", estado: 1, observacion: "Observacion por defecto" },
  { subcategoriaId: 12, subcategoria: "VIDRIO FRENTE", estado: 1, observacion: "Observacion por defecto" },
  { subcategoriaId: 13, subcategoria: "VIDRIO TRASERO", estado: 1, observacion: "Observacion por defecto" },
  { subcategoriaId: 14, subcategoria: "ESPEJO LATERAL DERECHO", estado: 1, observacion: "Observacion por defecto" },
  { subcategoriaId: 15, subcategoria: "ESPEJO LATERAL IZQUIERDO", estado: 1, observacion: "Observacion por defecto" },
  { subcategoriaId: 16, subcategoria: "ESPEJO RETROVISOR", estado: 1, observacion: "Observacion por defecto" }
];


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule,
    AsyncPipe, ReactiveFormsModule, CommonModule, MatTableModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  myControl = new FormControl('');
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
  successMsj: string = 'Revision agregada';
  errorStatus: boolean = false;
  errorMsj: string = 'No se pudo agregar la revision';



  datosAEnviar!:vehicleResp;

  constructor(
    private _vehicleService: VehicleService,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      estado: this.fb.array( detallesRevision.map((item)=> this._createFormGroup(item)) ),
      nombre_asignado: [""],
      marca:[""],
      modelo:[""],
      date: [''],

    })
  }

  ngOnInit(): void {
    this.getVehicles();

    this.today = new Date().toISOString().split('T')[0]; 
    this.form.controls['date'].setValue(this.today);

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

    return this.idVehiculos.filter(option => String(option.id).includes(filterValue));
  }

  onOptionSelected(event: any) {

    this.selectedVehicleId = event.option.value; 
    console.log('ID seleccionado:', this.selectedVehicleId);

    this._vehicleService.getVehicle( Number(this.selectedVehicleId) ).subscribe((data)=>{

      this.vehicleReq = data
      console.log(this.vehicleReq)

      for (let i = 0; i < detallesRevision.length; i++) {

        if (data.revision[data.revision.length-1].detalles[i].estado !==null  && data.revision[data.revision.length-1].detalles[i].observacion !==null) {
          detallesRevision[i].estado = data.revision[data.revision.length-1].detalles[i].estado
          detallesRevision[i].observacion = data.revision[data.revision.length-1].detalles[i].observacion 
        }
        else{
          detallesRevision[i].estado = 2
          detallesRevision[i].observacion = "Observacion por defecto"
        }
        
      }
      
      this.form = this.fb.group({
        estado: this.fb.array( detallesRevision.map((item)=> this._createFormGroup(item)) ),
        nombre_asignado: [data.asignado],
        marca: [data.marca],
        modelo: [data.modelo]
      });
      
    })
    
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

  sumar(valor: number, index: number) {
    const formArray = this.productFormArray;
  
    if (formArray && formArray.at(index)) {
      const estadoControl = formArray.at(index).get('estado') as FormControl;
  
      if (estadoControl) {
        let nuevoEstado = estadoControl.value + valor;
  
        if (nuevoEstado < 1) {
          nuevoEstado = 1;
        } else if (nuevoEstado > 3) {
          nuevoEstado = 3;
        }
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

  enviar(){
    
    this.agregarRevision ={
      inventarioId: this.vehicleReq.id,
      funcionarioId: Number(this.vehicleReq.revision![0].funcionarioId),
      userId: this.vehicleReq.userId,  
      fecha: this.today,
      detallerevision:this.productFormArray.value
    } 
    
    this._vehicleService.addInspection(this.agregarRevision).subscribe(
      (data) => {
        this.successStatus = true;
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
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
      document.body.style.overflow = "hidden";

      }
    );

  }

  quitar() {
    this.successStatus = false;
    this.errorStatus = false;
    this.form.reset();
    document.body.style.overflow = "auto";

  }


}