import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecycledItem } from '../../models/recycled-item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { GarbageType } from '../../models/enums/garbage-type';
import { RecycledItemService } from '../../services/recycled-item.service';
@Component({
  selector: 'recycle-bud-recycled-item-detail-modal',
  templateUrl: './recycled-item-detail-modal.component.html',
  styleUrl: './recycled-item-detail-modal.component.scss'
})
export class RecycledItemDetailModalComponent {

  form: FormGroup;
  types: string[] = Object.values(GarbageType)
  isNew: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: RecycledItem|undefined,
    public dialogRef: MatDialogRef<RecycledItemDetailModalComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private recycledItemService: RecycledItemService
    ){
      this.form = fb.group({
        id: null,
        quantity: 0,
        description: null,
        type: [null, Validators.required],
        user: null
      })

      if(data){
        this.form.patchValue(data)

        if(!data.user){
          this.form.get('user')?.setValue(this.authService.getLoggedUser())
        }
        if(data.id){
          this.isNew = false
        }else{
          this.isNew = true
        }

      }else{
        this.form.get('user')?.setValue(this.authService.getLoggedUser())
        this.isNew = true
      }
    }

    save(){
      let saveObs$
      if(this.isNew){
        saveObs$ = this.recycledItemService.createOne(this.form.getRawValue())
      }else{
        saveObs$ = this.recycledItemService.updateOne(this.form.getRawValue(),this.form.get('id')?.value)
      }
      
      saveObs$.subscribe(res => {
        //TODO: handle error or success message
        this.dialogRef.close({saved: true})
      })
    }
}
