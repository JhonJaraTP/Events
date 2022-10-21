import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterResultEventComponent } from './register-result-event/register-result-event.component';
import { RegisterComponent } from './register/register.component';
import { ResultEventComponent } from './result-event/result-event.component';


const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'prefix' },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'RegisterResultEvent',
    component: RegisterResultEventComponent,
  },
  {
    path: 'ResultEvent',
    component: ResultEventComponent,
  },
  { path: '**', redirectTo: 'register' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }