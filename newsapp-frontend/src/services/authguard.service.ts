import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

    constructor(private router: Router, private snackbar: SnackbarComponent) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return new Promise((resolve, reject) => {
        const auth = getAuth();

        onAuthStateChanged(auth, (user: User | null) => {
          if (user) {
            resolve(true);
          } else {
            this.router.navigate(["/login"]);
            this.snackbar.openSnackBar("Sie sind nicht eingeloggt!", "red-snackbar")
            resolve(false);
          }
        });
      });
    }
  }
