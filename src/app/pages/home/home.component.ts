import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiResponse, Employee } from '../../models/employee.model';
import { Observer } from 'rxjs';
import { CardModule } from 'primeng/card'
import { TableModule } from 'primeng/table'
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from '../../i18n-utils/translate-config.module';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../i18n-utils/translate-service';



@Component({
  selector: 'home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, CardModule, TableModule, TranslateConfigModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  title = 'zaposlenici';
  apiRt = 'https://api.test.ulaznice.hr/paganini/api/job-interview/employees';
  employees: Employee[] = [];
  isLoading = true;

  constructor(private http: HttpClient, private translate: TranslateService, private ls: LanguageService) { }

  ngOnInit(): void {
      this.fetchEmployees();
      
      this.ls.onLangChange.subscribe((event) => {
      this.switchLanguage(event.lang);
    });
    
  }
    
   fetchEmployees(): void {
    const employeeObserver: Observer<ApiResponse> = {
      next: (response) => {
        this.employees = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching employee data:', error);
        this.isLoading = false;
      },
      complete: () => {
        //console.log(this.employees);
      }
    };

    this.http.get<ApiResponse>(this.apiRt)
      .subscribe(employeeObserver);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
