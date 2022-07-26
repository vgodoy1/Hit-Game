import { NgModule } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faArrowDown,
  faArrowLeft,
  faArrowUp,
  faCircle,
  faMask,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faMask, faArrowLeft, faCircle, faWindowClose);
  }
}
