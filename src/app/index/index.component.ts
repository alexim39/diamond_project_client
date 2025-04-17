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
import { BrandsComponent } from '../partners/brands.component';


@Component({
    selector: 'async-index',
    imports: [MatToolbarModule, RouterModule, MatIconModule, MatButtonModule, MatTooltipModule, MatFormFieldModule, MatInputModule, BannerComponent,
        TestimonialsComponent, FourPillarsnComponent, AboutComponent, BrandsComponent
    ],
    template: `
    <async-index-banner/>
    <async-about/>
    <async-four-pillars/>
    <async-index-testimonials/>
    <async-brands-logos/>
  `,
    styles: [`
  `]
})
export class IndexComponent { 
  constructor(
    public loadingSpinnerService: LoadingSpinnerService
  ) {}
  
  ngOnInit(): void {
    this.loadingSpinnerService.hide()
  }
}
