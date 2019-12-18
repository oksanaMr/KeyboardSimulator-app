import { Component } from '@angular/core';
import { SoundControllerService } from './sound-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SoundControllerService]
})
export class AppComponent {
  title = 'KeyboardSimulator-app';

  constructor(
    public sound: SoundControllerService
  ) { }
}
