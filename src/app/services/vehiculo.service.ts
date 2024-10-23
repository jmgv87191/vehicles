import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { VehicleReq, VehiclesReq } from '../interfaces/vehicle-resp';

@Injectable({
  providedIn: 'root'
})

export class VehiculoService {

  private apiUrl: string = '/api/inventarios/'

  constructor( private http: HttpClient ) { }

  getVehicles():Observable<VehiclesReq[]>{
    return this.http.get<VehiclesReq[]>(   environment.endpoint + this.apiUrl )
  }

  getVehicle( id:number ):Observable<VehicleReq>{
    return this.http.get<VehicleReq>(  environment.endpoint + this.apiUrl + id )
  }



}
