import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultViewComponent } from './result-view/result-view.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [

  {path: "search",
  component: SearchComponent
  },
  {path: "results/:q",
  component: ResultViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
