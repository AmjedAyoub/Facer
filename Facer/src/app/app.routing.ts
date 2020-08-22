import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
;
import { AuthGuard } from './_guards/auth.guard';

import { LoggingComponent } from './logging/logging.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';
import { FacersComponent } from './facers/facers.component';

const routes: Routes = [
  { path: '', component: LoggingComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'facers', component: FacersComponent }
  // { path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard] },
  // { path: 'auth', loadChildren: './auth/auth.module#AuthModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
