import { Injectable } from '@angular/core';

import { TranslateService } from 'ng2-translate/ng2-translate';

@Injectable()
export class TranslatorService {
  defaultLanguage: string = 'es';
  availablelangs: any;

  constructor(private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(this.defaultLanguage);

    this.availablelangs = [
        { code: 'es', text: 'Español' }
    ];

    this.useLanguage();
  }

  useLanguage(lang: string = this.defaultLanguage) {
    this.translate.use(lang);
  }

  getAvailableLanguages() {
    return this.availablelangs;
  }
}
