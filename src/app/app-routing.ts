import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', component: IndexComponent },
  { path: 'about-us', loadComponent: () => import('./about/about.component').then(c => c.AboutComponent) },
  { path: 'testimonials', loadComponent: () => import('./testimonials/testimonials.component').then(c => c.TestimonialsComponent) },
  { path: 'contacts', loadComponent: () => import('./contacts/contacts.component').then(c => c.ContactComponent) },
  { path: 'get-started', loadChildren: () => import('./get-started/get-started-routes').then(r => r.getStartedRoutes) },
  { path: 'legal', loadChildren: () => import('./legal/legal-routes').then(r => r.legalRoutes) },
  { path: ':partnerUsername', loadChildren: () => import('./partners/partners-routes').then(r => r.partnersRoutes) },

];
