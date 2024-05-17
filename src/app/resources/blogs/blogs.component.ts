import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

/**
 * @title blogs component
 */
@Component({
  selector: 'async-ebooks',
  templateUrl: 'blogs.component.html',
  styleUrls: ['blogs.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class BlogsComponent {}