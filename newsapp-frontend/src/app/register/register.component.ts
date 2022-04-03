import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  passwordRepeat = new FormControl('', [Validators.required])
  form: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private snackbar: SnackbarComponent) {
    this.form = this.fb.group({
      email: this.email,
      password: this.password,
      passwordRepeat: this.passwordRepeat,
    });
  }

  ngOnInit(): void {
  }


  signUpUser() {
    if (this.password.value != this.passwordRepeat.value) {
      this.snackbar.openSnackBar("Passwörter stimmen nicht überein", "red-snackbar")
      this.password.setValue("");
      this.passwordRepeat.setValue("");
    } else {
      let email: string = (this.email.value).toLowerCase();
      let password: string = this.password.value;

      this.auth.createUserWithEmailAndPassword(email, password);
    }
  }







}
