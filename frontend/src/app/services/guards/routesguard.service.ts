import { Injectable } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root' // Esto lo hace un servicio singleton disponible en toda la aplicación
})
export class RoutesguardService {
  constructor(private location: Location) { }

  getRoute() {
    return this.location.path();
  }
}
