import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    constructor(private fb: FormBuilder) { }

    createEmployeeForm(): FormGroup {
        return this.fb.group({
            firstName: ['', [Validators.required, this.lettersOnlyValidator()]],
            lastName: ['', [Validators.required, this.lettersOnlyValidator()]],
            dateOfBirth: ['', Validators.required],
            jobTitle: ['', Validators.required]
        });
    }


    lettersOnlyValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
          const valid = /^[a-zA-ZčćžđšČĆŽĐŠ' -]*$/.test(control.value);
          return valid ? null : { lettersOnly: true };
        };
    }
}
