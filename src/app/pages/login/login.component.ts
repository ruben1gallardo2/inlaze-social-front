import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService)
  private route = inject(Router)

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.loginForm = this.fb.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  async register() {
    let res
    if(this.loginForm.valid) {
      try {
        res = await firstValueFrom(this.loginService.register(this.loginForm.getRawValue()))
      } catch (error) {
        console.log(error, "we can show toast here")
      }

      if (res) {
        console.log(res)
        // this.route.navigate(["/users"])
        
        //podriamos pasar en el local o session storage el jwt y en la ruta users decodificarlo para obtener la info para mostrar
      }
    }
  }
}
