import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RoutesguardService } from './services/guards/routesguard.service';

export class RouteGuard {
  ruta: string;

  constructor(private routerguardservice: RoutesguardService) {
    this.ruta = this.routerguardservice.getRoute().split('/')[1];
  }
}

export const pagerouteGuard: CanActivateFn = (route, state) => {
  return true;
};

