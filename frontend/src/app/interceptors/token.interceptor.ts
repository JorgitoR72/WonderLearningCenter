import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  req = req.clone({
    setHeaders: {
      authorization: `Bearer ${window.localStorage.getItem('token')}`
    }
  })
  return next(req);
};
