import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FAQS } from './faq-data';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

/**
 * @title Page for FAQ component
 */
@Component({
    selector: 'async-faqs',
    standalone: true,
    imports: [MatButtonModule, MatDividerModule, FormsModule, FilterPipe, CommonModule, RouterModule, MatIconModule, MatExpansionModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule],
    styleUrls: ['faq.component.scss'],
    templateUrl: 'faq.component.html',
})
export class faqsComponent implements OnInit {
  faqs = FAQS;
  searchTerm: string = '';

  constructor() { }

  ngOnInit(): void {}

    // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get filteredFaqs() {
    return this.faqs.filter(faq => faq.question.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

 }