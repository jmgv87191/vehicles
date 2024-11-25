import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { LoginRes } from '../../interfaces/vehicle';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  errorStatus: boolean = false;
  errorMsj: string = '';
  form: FormGroup;

  constructor(
    private _vehiculoService: VehicleService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  iniciarSesion() {
    this._vehiculoService.loginByEmail({ email: this.form.value.email, password: this.form.value.password })
      .subscribe({
        next: (data: LoginRes) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", data.data.username);
            this.router.navigate(['home']);
          } else {
            this.mostrarError("Error desconocido");
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.mostrarError("No autorizado. Verifica tus credenciales.");
          }else if (error.status === 400) {
            this.mostrarError("No autorizado. Verifica tus credenciales.");
          }
          else{
            this.mostrarError(`Error ${error.status}: ${error.message}`);
          }
        }
      });
  }

  mostrarError(mensaje: string) {
    this.errorStatus = true;
    this.errorMsj = mensaje;
  }


  quitar() {
    this.errorStatus = false;
  }
}
