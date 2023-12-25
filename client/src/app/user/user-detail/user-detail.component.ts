import { Component, OnInit } from '@angular/core';
import { of, tap } from 'rxjs';
import { DatatableColumn, DatatableAction } from '../../shared/data-table/data-table.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'recycle-bud-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  
  form: FormGroup
  matcher = new MyErrorStateMatcher();

  user?: User
  isNew: boolean = false

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ){
    this.form = fb.group({
      email: [null, [Validators.required, Validators.email]],
      firstname: null, 
      lastname: null,
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      isActive: true
    }, { validators: this.checkPasswords})

    route.data.subscribe({
      next: (data => {
        let user = data['user']
        console.log('user', user);
        
        if(user){
          this.isNew = false
          this.form.patchValue({
            ...user,
            password: null,
            confirmPassword: null
          })

          this.form.get('email')?.disable()
        }else{
          this.isNew = true
        }
      })
    })
  }

  save(){
    let saveObs$
      if(this.isNew){
        saveObs$ = this.userService.createOne(this.form.getRawValue())
      }else{
        saveObs$ = this.userService.updateOne(this.form.getRawValue(),this.form.get('email')?.value)
      }
    saveObs$.subscribe({
      next: (res => {

      })
    })
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('confirmPassword')!.value
    return pass === confirmPass ? null : { notSame: true }
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);

    return invalidCtrl || invalidParent;
  }
}
