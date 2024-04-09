import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindRefService {

  constructor() { }

  getNative() {
    return window;
  }
}