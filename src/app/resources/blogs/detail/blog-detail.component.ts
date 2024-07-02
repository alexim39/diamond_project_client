import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

/**
 * @title Blog details
 */
@Component({
    selector: 'async-blogs-detail',
    templateUrl: 'blog-detail.component.html',
    styleUrls: ['blog-detail.component.scss'],
    standalone: true,
    imports: [ ],
})
export class BlogDetailComponent implements OnInit {
    blogUrl!: string | null;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.blogUrl = params.get('url');
            // Fetch blog details using this ID

            console.log('---',this.blogUrl)
        });
    }

}
