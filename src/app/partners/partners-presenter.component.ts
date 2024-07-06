import {Component, Input, OnInit} from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AboutWhyYouShouldJoinComponent } from '../index/why-you-should-join/why-you-should-join.component';
import {MatButtonModule} from '@angular/material/button';
import { BrandsComponent } from './brands.component';
import { WhyWeExistComponent } from './why-we-exist/why-we-exist.component';

/**
 * @title Partners
 */
@Component({
  selector: 'async-partners-presentation',
  standalone: true,
  imports: [RouterModule, AboutWhyYouShouldJoinComponent, MatButtonModule, BrandsComponent, WhyWeExistComponent],
  templateUrl: 'partners-presenter.component.html',
  styleUrls: ['partners-presenter.component.scss']
})
export class PartnersPresenterComponent implements OnInit {

    @Input() partnerUsername!: string | null;

    constructor(
    ) {}

    ngOnInit() {
        console.log('---',this.partnerUsername)
    }

     // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}