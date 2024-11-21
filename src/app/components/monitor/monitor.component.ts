import { Component, EventEmitter, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TablaMonitor } from '../../interfaces/vehicle';
import { VehicleService } from '../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import {Sort, MatSortModule} from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'app-monitor',
  standalone: true,
  imports: [ RouterLink, CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatDividerModule, 
    MatIconModule ],
  templateUrl: './monitor.component.html',
  styleUrl: './monitor.component.css'
})
export class MonitorComponent implements OnInit, AfterViewInit  {

  usuario: string | null = "";
  tablaMonitor: TablaMonitor[] = []
  modelo!:string;
  
  @Output() marca: EventEmitter<string> = new EventEmitter<string>();
  
  displayedColumns: string[] = ['noeconomico', 'name', 'revision', 'todas_revisiones'];
  dataSource = new MatTableDataSource<TablaMonitor>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  sortedData: TablaMonitor[];

constructor(
  private _authService:AuthService,
  private router: Router,
  private _vehicleService: VehicleService
){
  this.sortedData = this.tablaMonitor.slice();

}
  ngOnInit(): void {

    this.usuario = localStorage.getItem('usuario')
    this.getVehicles();

  }

  getVehicles(): void {
    this._vehicleService.getVehiclesMonitoreo().subscribe((data: TablaMonitor[]) => {
      this.tablaMonitor = data;
      console.log( this.tablaMonitor)
      this.dataSource = new MatTableDataSource<TablaMonitor>(data)
      this.dataSource.paginator = this.paginator;

      if (this.tablaMonitor.length > 0) {
        this.marca.emit(this.tablaMonitor[0].marca);
      }
    });
  }

  
  onLogout(){
    this._authService.logOut();
    this.router.navigate(['/'])
  }

  sortData(sort: Sort) {
    const data = this.tablaMonitor.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      this.dataSource = new MatTableDataSource<TablaMonitor>(data)
      this.dataSource.paginator = this.paginator;

      return;
    }

    const sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'noeconomico':
          return compare(a.noeconomico, b.noeconomico, isAsc);

        default:
          return 0;
      }
    });

    this.dataSource = new MatTableDataSource<TablaMonitor>(data)
    this.dataSource.paginator = this.paginator;

  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}