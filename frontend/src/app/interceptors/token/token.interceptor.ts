import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/api/security/logout/logout.service';
import { jwtDecode } from 'jwt-decode';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = window.localStorage.getItem('token')
  let logoutService = inject(LogoutService)
  if (token) {
    let decodedToken = jwtDecode(token)
    const isExpired = decodedToken && decodedToken.exp ? decodedToken.exp < Date.now() / 1000 : false;
    if (isExpired) {
      logoutService.logOut()
    } else {
      req = req.clone({
        setHeaders: {
          authorization: `Bearer ${token}`
        }
      })
    }
  }
  return next(req);
};
