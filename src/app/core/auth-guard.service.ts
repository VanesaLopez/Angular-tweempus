import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router) { }

  canActivate() {
    if (this.authService.token !== null || this.authService.isLoginInLocal()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
