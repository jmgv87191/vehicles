import { Component, Input, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { MonitorVehicle } from '../../interfaces/vehicle';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { VerDetallesComponent } from '../ver-detalles/ver-detalles.component';

@Component({
  selector: 'app-todas-revisiones',
  standalone: true,
  imports: [ RouterLink, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatTableModule,
    MatPaginatorModule, VerDetallesComponent  ],
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
    localStorage.setItem('idPadre', this.id.toString())

    this._vehicleService.getVehicleMonitoreo( this.id ).subscribe((data)=>{

      this.listaPosts = data
      console.log(data)
      this.dataSource = new MatTableDataSource<MonitorVehicle>(data)
      this.dataSource.paginator = this.paginator;
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


