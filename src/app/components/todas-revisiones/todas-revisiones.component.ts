import { Component, Input, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { MonitorVehicle } from '../../interfaces/vehicle';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-todas-revisiones',
  standalone: true,
  imports: [ RouterLink, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatTableModule,
    MatPaginatorModule  ],
  templateUrl: './todas-revisiones.component.html',
  styleUrl: './todas-revisiones.component.css'
})
export class TodasRevisionesComponent implements OnInit {

  id:number = 0;
  todasLasRevisiones: MonitorVehicle [] = []
  listaPosts: MonitorVehicle[] = []

  form: FormGroup

  displayedColumns: string[] = ['norevision', 'fecha', 'detalles'];
  dataSource = new MatTableDataSource<MonitorVehicle>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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
    if (isNaN(this.id)) {
      console.error('El ID de la ruta no es válido.');
      return;
    }else{
      console.log (this.id)
    }

    this._vehicleService.getVehicleMonitoreo( this.id ).subscribe((data)=>{

      this.listaPosts = data.sort((a, b) => b.id - a.id);

      console.log(this.listaPosts);
  
      this.dataSource = new MatTableDataSource<MonitorVehicle>(this.listaPosts);
      this.dataSource.paginator = this.paginator;
      this.todasLasRevisiones = this.listaPosts;
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


