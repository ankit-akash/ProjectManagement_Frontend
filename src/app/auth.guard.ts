//To allow access only by login not using "/URL"

import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanDeactivate } from '@angular/router';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate ,CanDeactivate<AppComponent> {
  constructor(private router: Router) {}    // Inject the Router service

  canActivate(    // Checks if a route can be activated
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem('token')) {
      // If user is authenticated, allow access
      return true;
    } else {
      //If user is not authenticated, redirect to login
      this.router.navigate(['/login']);
      return false;
    }
  }
  
  canDeactivate(    // Checks if a route can be deactivated
    component: AppComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return type of the canActivate or canDeactivate methods within an Angular route guard.
    if (nextState && nextState.url === '/login') {
      return new Observable<boolean>((observer) => {
        const confirmation = confirm('Are you sure you want to log out?');
        if(confirmation){ //Only remove token if confirmed
          localStorage.removeItem('token');
          localStorage.removeItem('uName');
        }
        observer.next(confirmation);
        observer.complete();
        console.log('Logged out.');
      });
    }
    return true;
  }
}