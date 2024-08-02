import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    constructor(private fb: FormBuilder) { }

    createEmployeeForm(): FormGroup {
        return this.fb.group({
            firstName: ['', [Validators.required, this.noNumbersValidator()]],
            lastName: ['', [Validators.required, this.noNumbersValidator()]],
            dateOfBirth: ['', Validators.required],
            jobTitle: ['', Validators.required]
        });
    }


    noNumbersValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const hasNumbers = /\d/.test(control.value);
            return hasNumbers ? { hasNumbers: true } : null;
        };
    }
}
