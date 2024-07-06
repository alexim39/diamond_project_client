import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartnersPresenterComponent } from './partners-presenter.component';

/**
 * @title Partners
 */
@Component({
  selector: 'async-partners-container',
  standalone: true,
  imports: [PartnersPresenterComponent],
  template: `
    <async-partners-presentation [partnerUsername]="partnerUsername"></async-partners-presentation>
  `,
})
export class PartnersContainerComponent implements OnInit {

    partnerUsername!: string | null;

    constructor(
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.partnerUsername = params.get('partnerUsername');
            // Fetch blog details using this ID

            
        });
    }
}