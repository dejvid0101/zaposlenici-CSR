import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem('language') || 'en';
    this.translate.use(lang);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }

  // Expose the TranslateService instance
  get translateService(): TranslateService {
    return this.translate;
  }

  // Expose the observable for language changes
  get onLangChange(): Observable<{ lang: string }> {
    return this.translate.onLangChange;
  }
}
