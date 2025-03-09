//(auth.interceptor)=> To create Local Storage System for token
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(' AuthInterceptor is running...');
  
  const token = localStorage.getItem('token');
  console.log('🔍 Token from Local Storage:', token);

  // Check if a token exists
  if (token) {
    req = req.clone({     //clone the request and add an Authorization header
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(' Token added to request:', req);
  } else {
    console.warn("No token found in local storage!");
  }

  return next(req);   //pass the new request to the original request if no token was found
};
