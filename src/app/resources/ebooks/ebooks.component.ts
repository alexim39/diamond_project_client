import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';

/**
 * @title eBooks component
 */
@Component({
  selector: 'async-ebooks',
  templateUrl: 'ebooks.component.html',
  styleUrls: ['ebooks.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class EbooksComponent {}