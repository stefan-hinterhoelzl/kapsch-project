import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from 'src/services/authguard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResultViewComponent } from './result-view/result-view.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [

  {path: "", redirectTo: "/search", pathMatch: "full" },

  {path: "login",
  component: LoginComponent},

  {path: "register",
  component: RegisterComponent},

  {path: "search",
  component: SearchComponent,
  canActivate: [AuthguardService]
  },
  {path: "results/:q",
  component: ResultViewComponent,
  canActivate: [AuthguardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
