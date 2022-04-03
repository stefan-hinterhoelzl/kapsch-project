import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {getAuth, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private snackbar: SnackbarComponent, private router: Router) { }


  loginWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password).then((result) => {
      let snackbarRef = this.snackbar.openSnackBar("Eingeloggt!", "green-snackbar");
      this.router.navigate(["/search"]);
    }).catch((error) => {
      let snackbarRef = this.snackbar.openSnackBar("Fehler beim Anmelden!", "red-snackbar");
    })
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    signInWithPopup(auth, provider).then((result) => {
      let snackbarRef = this.snackbar.openSnackBar("Eingeloggt!", "green-snackbar");
      this.router.navigate(["/search"]);
    }).catch((error) => {
      let snackbarRef = this.snackbar.openSnackBar("Fehler beim Anmelden!", "red-snackbar");
    })
  }

  logout() {
    const auth = getAuth();

    signOut(auth).then(() => {
      this.snackbar.openSnackBar("Abgemeldet!", "green-snackbar");
      this.router.navigate(["/login"])
    }).catch((error) => {
      this.snackbar.openSnackBar("Ausloggen fehlgeschlagen", "red-snackbar")
    })
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      let snackbarRef = this.snackbar.openSnackBar("Benutzer wurde angelegt!", "green-snackbar");
      this.router.navigate(["/search"]);
    }).catch((error) => {
      console.log(error.code)
      if (error.code == "auth/account-exists-with-different-credential" || error.code == "auth/email-already-exists") {
        this.snackbar.openSnackBar("Email existiert bereits.", "red-snackbar");
      }
      this.snackbar.openSnackBar("Fehler beim Anlegen des Benutzers!", "red-snackbar");
    });
  }
}
