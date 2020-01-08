import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from '../services/session.service';
import { SESSION_STORAGE } from '../constants/session.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private _sessionService: SessionService, private _router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggenedIn = this._sessionService.getItem(SESSION_STORAGE.currentUser);
    if (!isLoggenedIn) {
      this._router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggenedIn = this._sessionService.getItem(SESSION_STORAGE.currentUser);
    if (!isLoggenedIn) {
      this._router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggenedIn = this._sessionService.getItem(SESSION_STORAGE.currentUser);
    if (!isLoggenedIn) {
      this._router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
