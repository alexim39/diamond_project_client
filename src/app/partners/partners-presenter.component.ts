import {Component, Input, OnInit} from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AboutWhyYouShouldJoinComponent } from '../index/why-you-should-join/why-you-should-join.component';
import {MatButtonModule} from '@angular/material/button';
import { BrandsComponent } from './brands.component';
import { WhyWeExistComponent } from './why-we-exist/why-we-exist.component';
import { PartnerInterface } from '../_common/interface/partner.interface';
import { CommonModule } from '@angular/common';

/**
 * @title Partners
 */
@Component({
    selector: 'async-partners-presentation',
    imports: [CommonModule, RouterModule, AboutWhyYouShouldJoinComponent, MatButtonModule, BrandsComponent, WhyWeExistComponent],
    templateUrl: 'partners-presenter.component.html',
    styleUrls: ['partners-presenter.component.scss', 'partners-presenter.mobile.scss']
})
export class PartnersPresenterComponent implements OnInit {

    @Input() partner!: PartnerInterface;


    constructor(
      
    ) { }

    ngOnInit() {
        //console.log('partner ',this.partner)      
    }

     // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}