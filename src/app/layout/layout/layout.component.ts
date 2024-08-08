import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { LanguageService } from '../../i18n-utils/translate-service';
import { MenubarModule } from 'primeng/menubar'
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, TranslateModule, CommonModule, ButtonModule, MenubarModule, ToggleButtonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent{
  constructor( private ls: LanguageService) {
   }

   @ViewChild('langbtn') languageButton!: ElementRef;

  switchLanguage() {
    const currentLanguage=this.languageButton.nativeElement.querySelector('.p-button-label').textContent.toLowerCase()
    const newLanguage = currentLanguage === 'en' ? 'hr' : 'en';
    this.ls.switchLanguage(newLanguage)
  }

}
