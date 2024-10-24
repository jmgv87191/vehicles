import { Component } from '@angular/core';
import { VehiculoService } from '../../services/vehiculo.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginRes } from '../../interfaces/vehicle-resp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor( private _vehiculoService:VehiculoService,
    private router: Router
  ){

  }

  errorStatus: boolean = false;
  errorMsj: any = "";
  errorMessageVariable: string = '';


  iniciarSesion(){

    this._vehiculoService.loginByEmail(  { email:"api@gmail.com", password:"12345678" } ).subscribe((data)=>{
      console.log(data)

      let dataResponse: LoginRes = data;

      if (dataResponse.token ) {
        localStorage.setItem("token",dataResponse.token );
        this.router.navigate(['home']);
      }else{
        this.errorStatus = true;
        this.errorMsj = "Error"
      }


    })

    console.log('iniciar sesion')
  }

}
