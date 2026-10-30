import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BannerComponent } from './banner/banner.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { LoadingSpinnerService } from '../_common/services/loader/spinner.service';
import { FourPillarsnComponent } from './four-pillars/four-pillars.component';
import { AboutComponent } from './about/about.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { BrandsComponent } from '../partners/brands.component';
import { SeoService } from '../_common/services/seo.service';


@Component({
    selector: 'async-index',
    imports: [MatToolbarModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatInputModule, BannerComponent,
        TestimonialsComponent, FourPillarsnComponent, AboutComponent, HowItWorksComponent, BrandsComponent
    ],
    template: `
    <async-index-banner/>
    <async-about/>
    <async-four-pillars/>
    <async-how-it-works/>
    <async-index-testimonials/>
    <async-brands-logos/>
  `,
    styles: [`
  `]
})
export class IndexComponent { 
  constructor(
    public loadingSpinnerService: LoadingSpinnerService,
    private seo: SeoService
  ) {}
  
  ngOnInit(): void {
    this.loadingSpinnerService.hide();
    this.seo.setPage({
      title: 'Diamond Project | Online Business in Nigeria — Financial Freedom',
      description: 'Diamond Project is a transformative platform that empowers you to elevate your financial success through mentorship, training and a leverage-based online business.',
      path: '/'
    });
  }
}
