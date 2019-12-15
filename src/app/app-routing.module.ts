import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization';
import { RegistrationComponent } from './registration/registration';
import { ProfileComponent } from './user/profile/profile';
import { ExerciseComponent } from './user/exercise/exercise';
import { DataChangeComponent } from './user/dataChange/dataChange';
import { StatisticsComponent } from './user/statistics/statistics';
import { DoExerciseComponent } from './user/doExercise/doExercise';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '', component: AuthorizationComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: 'exercise/:id', component: ExerciseComponent },
  { path: 'do-exercise/:userId/:id', component: DoExerciseComponent },
  { path: 'dataChange/:id', component: DataChangeComponent },
  { path: 'statistics/:id', component: StatisticsComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
