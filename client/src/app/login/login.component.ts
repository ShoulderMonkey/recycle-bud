import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'recycle-bud-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: "flex-container flex-center"
  }
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required /* Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) */]],
    });


  }

  ngOnInit() {
    this.form.get('email')?.valueChanges.subscribe(email => {
      if (email === 'sys' ) {
        this.form.get('email')?.clearValidators();
        // this.form.get('password')?.clearValidators();
        this.form.setErrors(null);
        this.form.get('email')?.updateValueAndValidity({emitEvent: false});
        this.form.get('password')?.updateValueAndValidity({emitEvent: false});
        // this.form.clearValidators();
        // this.form.updateValueAndValidity()
      } else {
        this.form.get('email')?.setValidators([Validators.required, Validators.email]);
        this.form.get('password')?.setValidators([Validators.required]);
        // this.form.setErrors(null);
        this.form.get('email')?.updateValueAndValidity({emitEvent: false});
        this.form.get('password')?.updateValueAndValidity({emitEvent: false});
      }
    })
  }

  login() {
    this.manageException()
    console.log("form -> ", this.form.getRawValue());
    if (this.form.valid) {
      const credentials = {
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      }
      this.authService.login((credentials)).subscribe({
        next: (res : any) => {
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error(err.error.message);
        }
      });
  }
  }

  openRegisterForm(){
    this.dialog.open(RegisterComponent).afterClosed().subscribe(res => {
      
    })
  }


  handleError(error: any) {
    this.toastr.error(error);
  }

  manageException() {
    let email = this.form.get('email')?.value
    let pw = this.form.get('password')?.value
    if (email === 'sys' && pw === 'sys') {
      this.form.get('email')?.clearValidators();
      this.form.get('password')?.clearValidators();
      this.form.setErrors(null);
      this.form.get('email')?.updateValueAndValidity();
      this.form.get('password')?.updateValueAndValidity();
    }
  }
}
