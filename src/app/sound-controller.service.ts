import { Injectable } from '@angular/core';
import { SoundControl } from './models/sound-control';

@Injectable({
  providedIn: 'root'
})
export class SoundControllerService {
  soundControl = new SoundControl();
  constructor() {
    console.log('init');
  }
}
