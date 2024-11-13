import { Injectable } from '@angular/core';
import { LoginReq, LoginRes, MonitorVehicle, RevisionMonitor, TablaMonitor, VehicleRes, vehicleResp, VehiclesRes } from '../interfaces/vehicle';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  
  private apiUrl: string = '/api/inventarios'
  private loginUrl: string = '/api/auth/login'
  private apiUrlVehiculos: string = '/api/vehiculos'
  private apiUrlVehiculosDetalles: string = '/api/vehiculos/detalles/'


  constructor(
    private http: HttpClient
  ) { }


  loginByEmail(form:LoginReq):Observable<LoginRes>{
    return this.http.post<LoginRes>((environment.endpoint + this.loginUrl),form);
  } 

  getVehicles():Observable<VehiclesRes[]>{

    let myStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${myStorage}`
      }
    }

    return this.http.get<VehiclesRes[]>(   (environment.endpoint + this.apiUrl), options )
  }

  getVehicle(  id:number ):Observable<VehicleRes>{

    let myStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${myStorage}`
      }
    }

    return this.http.get<VehicleRes>( (environment.endpoint + this.apiUrl+ "/" + id),options );

  }

  addInspection( form: vehicleResp ):Observable<void>{

    let miStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.post<void>( (environment.endpoint + this.apiUrl), form, options  )
  }

  /* api de la tabla de monitoreo */


  getVehiclesMonitoreo():Observable<TablaMonitor[]>{

    let miStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${miStorage}`
      }
    }

    return this.http.get<TablaMonitor[]>( (environment.endpoint + this.apiUrlVehiculos), options  )



  }

  
  getVehicleMonitoreo(  id:number ):Observable<MonitorVehicle[]>{

    let myStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${myStorage}`
      }
    }

    return this.http.get<MonitorVehicle[]>( (environment.endpoint + this.apiUrlVehiculos+ "/" + id),options );

  }

  getDetalles(id:number):Observable<RevisionMonitor[]> {

    let myStorage = window.localStorage['token'];

    const options = {
      method: 'GET',
      headers:{
        Authorization: `Bearer ${myStorage}`
      }
    }
    return this.http.get<RevisionMonitor[]>( (environment.endpoint + this.apiUrlVehiculosDetalles + id),options );

  }


}
