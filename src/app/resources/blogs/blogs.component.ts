import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';

/**
 * @title blogs component
 */
@Component({
  selector: 'async-blogs',
  templateUrl: 'blogs.component.html',
  styleUrls: ['blogs.component.scss'],
  standalone: true,
  imports: [MatCardModule, RouterModule],
})
export class BlogsComponent {

  constructor(private router: Router) {}

   // scroll to top when clicked
   scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  viewBlogDetail(blog: any) {
    this.router.navigate(['/blogs', blog.url]);
}
  
}