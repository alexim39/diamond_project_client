import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { PageNotFoundComponent } from './page-not-found.component';

export const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '', component: IndexComponent, title: 'Diamond Project | Online Business in Nigeria — Financial Freedom' },
  { path: 'get-started', loadChildren: () => import('./get-started/get-started-routes').then(r => r.getStartedRoutes) },
  { path: 'legal', loadChildren: () => import('./legal/legal-routes').then(r => r.legalRoutes) },
  { path: 'faq', loadComponent: () => import('./faq/faq.component').then(c => c.FaqComponent), title: 'Frequently Asked Questions | Diamond Project' },
  { path: 'contact', loadComponent: () => import('./contact/contact.component').then(c => c.ContactComponent), title: 'Contact | Diamond Project' },
  { path: 'events', loadComponent: () => import('./events/events.component').then(c => c.EventsComponent), title: 'Events & Stories | Diamond Project' },
  { path: ':partnerUsername', data: { layout: 'partner' }, loadChildren: () => import('./partners/partners-routes').then(r => r.partnersRoutes) },
  { path: '**', component: PageNotFoundComponent, title: 'Page not found | Diamond Project' },

];
