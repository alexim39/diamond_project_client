import { CommonModule } from '@angular/common';
import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

/**
 * @title Brands Logo
 */
@Component({
  selector: 'async-brands-logos',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],

  template: `

    <div class="brand-display-container" (mouseover)="stopScroll()" (mouseleave)="startScroll()">
        <button mat-icon-button class="nav-button" (click)="scrollLeft()">
            <mat-icon>chevron_left</mat-icon>
        </button>

    
        <div class="brand-display-wrapper" #brandWrapper>

            <div class="brand-logo" *ngFor="let brand of brands">
            <img [src]="brand.logo" [alt]="brand.name" />
            </div>
        </div>
    
        <button mat-icon-button class="nav-button" (click)="scrollRight()">
            <mat-icon>chevron_right</mat-icon>
        </button>
    </div>


  `,

  styles: `
  
  .brand-display-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;

  .nav-button {
    position: absolute;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;

    &:first-of-type {
      left: 0;
    }

    &:last-of-type {
      right: 0;
    }
  }

  .brand-display-wrapper {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 10px 0;
    animation: scroll 20s linear infinite;
    &:hover {
        animation-play-state: paused;
    }

    .brand-logo {
      flex: 0 0 auto;
      margin: 0 10px;
      img {
        max-width: 16em;
        max-height: 6em;
        display: block;
      }
    }
  }
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

  `
})
export class BrandsComponent implements AfterViewInit {
    @ViewChild('brandWrapper') brandWrapper!: ElementRef;

    brands = [
      { name: 'DSM', logo: 'assets/img/partner1.png' },
      { name: 'Empowered Consumerism', logo: 'assets/img/partner2.png' },
      { name: 'Weider Global Nutrition', logo: 'assets/img/partner3.png' },
      { name: 'Natures Way', logo: 'assets/img/partner4.png' },
      { name: 'Access Bank PLC', logo: 'assets/img/partner5.png' },
      /* { name: 'Brand 4', logo: 'assets/img/access.png' },
      { name: 'Brand 4', logo: 'assets/img/access.png' }, */



      // Add more brands as needed
    ];
  
    scrollLeft() {
      this.brandWrapper.nativeElement.scrollBy({
        left: -600,
        behavior: 'smooth'
      });
    }
  
    scrollRight() {
      this.brandWrapper.nativeElement.scrollBy({
        left: 600,
        behavior: 'smooth'
      });
    }

    ngAfterViewInit() {
        this.startScroll();
    }
    
    startScroll() {
        this.brandWrapper.nativeElement.style.animationPlayState = 'running';
    }

    stopScroll() {
        this.brandWrapper.nativeElement.style.animationPlayState = 'paused';
    }
}