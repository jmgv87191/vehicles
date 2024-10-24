import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginReq, LoginRes, VehicleReq, vehicleResp, VehiclesReq } from '../interfaces/vehicle-resp';

@Injectable({
  providedIn: 'root'
})

export class VehiculoService {

  private apiUrl: string = '/api/inventarios'
  private loginUrl: string = '/api/auth/login'

  constructor( private http: HttpClient ) { }

  getVehicles():Observable<VehiclesReq[]>{

    

    return this.http.get<VehiclesReq[]>(   environment.endpoint + this.apiUrl+ "/" )
  }

  getVehicle( id:number ):Observable<VehicleReq>{
    return this.http.get<VehicleReq>(  environment.endpoint + this.apiUrl+ "/" + id )
  }

  addInspection( form: vehicleResp ):Observable<void>{
    return this.http.post<void>( (environment.endpoint + this.apiUrl), form  )
  }

  loginByEmail(form:LoginReq):Observable<LoginRes>{

    return this.http.post<LoginRes>((environment.endpoint + this.loginUrl),form);
  } 

}
