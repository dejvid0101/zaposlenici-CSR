import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiResponse, Employee } from '../../models/employee.model';
import { Observer } from 'rxjs';
import { CardModule } from 'primeng/card'
import { TableModule } from 'primeng/table'
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from '../../i18n-utils/translate-config.module';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../i18n-utils/translate-service';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { API_CONFIG } from '../../api-utils/api-routes';

@Component({
  selector: 'home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, HttpClientModule, CardModule, TableModule,
    TranslateConfigModule, ButtonModule, IconFieldModule, InputIconModule,
    InputTextModule, MultiSelectModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  title = 'zaposlenici';
  employees: Employee[] = [];
  uiFilterJobTitles: { name: string }[] = [];
  selectedJobTitles: { name: string }[] = [];
  isLoading = true;

  EmployeePropNames = {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    DATE_OF_BIRTH: 'dateOfBirth',
    JOB_TITLE: 'jobTitle'
};

  constructor(private http: HttpClient, private translateService: TranslateService, private languageService: LanguageService) { }

  ngOnInit(): void {
    this.fetchEmployees();

    this.languageService.onLangChange.subscribe((event) => {
      this.switchLanguage(event.lang);
    });

  }

  fetchEmployees(): void {
    this.http.get<ApiResponse>(API_CONFIG.EMPLOYEES_URL).subscribe(this.employeeObserver());
  }

  employeeObserver(): Observer<ApiResponse> {
    return {
      next: (response) => {
        this.employees = response.data;
        this.uiFilterJobTitles = [...new Set(this.employees.map(employee => employee.jobTitle))]
          .map(title => ({ name: title }));
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching employee data:', error);
        this.isLoading = false;
      },
      complete: () => { }
    };
  }

  switchLanguage(language: string) {
    this.translateService.use(language);
  }

  getEventValue(event: Event): string {
    const inputElement = event.target as HTMLInputElement;
    return inputElement.value
  }

  transformToFilteringArr(selectedJobTitles: { name: string }[]): string[] {
    return selectedJobTitles.map(({ name }) => name) as string[];
  }

}
