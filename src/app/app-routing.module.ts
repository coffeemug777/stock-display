import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NewTickerDisplayComponent } from './components/new-ticker-display/new-ticker-display.component';
import { NewTickerInputComponent } from './components/new-ticker-input/new-ticker-input.component';
import { NewTickerGuard } from './guards/new-ticker.guard';
import { NewTickerResolver } from './resolvers/new-ticker.resolver';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'new-ticker-input', component: NewTickerInputComponent },
  {
    path: 'new-ticker-display',
    component: NewTickerDisplayComponent,
    resolve: { newData: NewTickerResolver },
    //canActivate: [NewTickerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
