import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginReq } from '../../interfaces/vehicle';
import { catchError, map, Observable, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user?: LoginReq;
  private apiUrl: string = '/api/inventarios'


  constructor(private http:HttpClient) {  }


  get CurrentUser(): LoginReq | undefined{
    if( !this.user ) return undefined;

    console.log(this.user)

    return structuredClone(this.user);
  }

  checkAuthentication(): Observable<boolean> {
    if( !localStorage.getItem('token') )return of (false)

      const token = localStorage.getItem('token');


      return this.http.get<LoginReq>((environment.endpoint + this.apiUrl))
        .pipe(
          tap( user =>this.user = user ),
          map( user => !!user ),
          catchError( err => of(false) )
        )
  } 

  logOut(){
    this.user = undefined;
    localStorage.clear();
  }
}
