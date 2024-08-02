import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button, ButtonModule } from 'primeng/button'
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TranslateConfigModule } from '../../i18n-utils/translate-config.module';
import { LanguageService } from '../../i18n-utils/translate-service';
import { FormService } from '../../form-utils/form-service';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule, Button, DropdownModule, InputTextModule, ButtonModule, CalendarModule, TranslateConfigModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {
  employee: Employee = {
    id: 0,
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    jobTitle: ''
  };

  jobTitleOptions = [
    { label: 'Consultant', value: 'Consultant' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Engineer', value: 'Engineer' },
    { label: 'Analyst', value: 'Analyst' },
    { label: 'Developer', value: 'Developer' },
    { label: 'Designer', value: 'Designer' }
  ];

  employeeForm: FormGroup;
  firstNameCtrl: AbstractControl;
  lastNameCtrl: AbstractControl;
  dateOfBirthCtrl: AbstractControl;
  jobTitleCtrl: AbstractControl;

  maxDate: Date = new Date();

  constructor(private translate: TranslateService, formService: FormService, private ls: LanguageService) {

    this.employeeForm = formService.createEmployeeForm();

    this.firstNameCtrl = this.employeeForm.get('firstName') || new FormControl()
    this.lastNameCtrl = this.employeeForm.get('lastName') || new FormControl()
    this.dateOfBirthCtrl = this.employeeForm.get('dateOfBirth') || new FormControl()
    this.jobTitleCtrl = this.employeeForm.get('jobTitle') || new FormControl()

  }


  onSubmit = () => {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value, "Ime: " + this.firstNameCtrl.value + ", prezime: " + this.lastNameCtrl.value);
    } else {
      this.employeeForm.markAllAsTouched(); // Trigger validation for all fields
    }
  }

  ngOnInit() {
    this.ls.onLangChange.subscribe((event) => {
      this.switchLanguage(event.lang);
    })
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }


}
