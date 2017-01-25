import { NgModule }             from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { WelcomeComponent }                 from './about/welcome.component';
import { RegionListComponent }              from './regions/regionlist.component';
import { RegionDetailComponent }            from './regions/regiondetail.component';
import { LoginComponent }                   from './users/login.component';

const appRoutes: Routes = [
  { path: 'users/login', component: LoginComponent },
  { path: 'regions/:uuid', component: RegionDetailComponent },
  { path: 'regions', component: RegionListComponent},
  { path: '', component: WelcomeComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
