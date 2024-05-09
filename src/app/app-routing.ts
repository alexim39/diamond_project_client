import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', component: IndexComponent },
  { path: 'about-us', loadComponent: () => import('./about/about.component').then(c => c.AboutComponent) },
  { path: 'faq', loadComponent: () => import('./faq/faq.component').then(c => c.faqsComponent) },
  { path: 'testimonials', loadComponent: () => import('./testimonials/testimonials.component').then(c => c.TestimonialsComponent) },
  //{ path: 'price-list', loadComponent: () => import('./price-list/price-list.component').then(c => c.PriceListComponent) },
  //{ path: 'booking', loadChildren: () => import('./portal/booking/booking-routes').then(c => c.BookingListRoutes) },
  { path: 'get-started', loadChildren: () => import('./get-started/get-started-routes').then(r => r.getStartedRoutes) },

  // should be the last path on routes
  {path: '**', component: PageNotFoundComponent}

];
