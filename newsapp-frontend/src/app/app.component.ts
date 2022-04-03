import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { getAuth, onAuthStateChanged, User} from '@firebase/auth';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'newsapp-frontend';
  public q?: string;
  isLoggedIn: boolean = false;
  email?: string


  constructor(private auth: AuthService, private router: Router, private snackbar: SnackbarComponent) {
    this.authStatusListener();
  }

  authStatusListener() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
        this.email = user.email || " ";
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.auth.logout()
  }


  search() {
    if (this.q != "" && this.q != null) {
      this.router.navigate(["results/"+this.q])
    } else {
      this.snackbar.openSnackBar("Bitte geben Sie einen gültigen Suchbegriff ein", "red-snackbar")
    }

  }

}
