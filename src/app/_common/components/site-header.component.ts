import { Component, HostListener } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-site-header',
  imports: [RouterModule, MatButtonModule, MatIconModule],
  template: `
    <header class="site-header">
      <div class="bar">
        <a routerLink="/" class="brand" aria-label="Diamond Project home">
          <img src="assets/images/icon.png" alt="Diamond Project" />
          <span>Diamond Project</span>
        </a>

        <nav class="desktop-nav" aria-label="Primary navigation">
          <a routerLink="/" fragment="about_us">About</a>
          <a routerLink="/" fragment="how-it-works">How it works</a>
          <a routerLink="/events">Events</a>
          <a routerLink="/faq">FAQ</a>
          <a routerLink="/contact">Contact</a>
          <a href="https://c21fg.online" target="_blank" rel="noopener" class="partner-link">Partner sign in</a>
          <a mat-flat-button routerLink="/get-started" class="cta">Get started</a>
        </nav>

        <button
          type="button"
          class="menu-btn"
          (click)="toggleMenu()"
          [attr.aria-expanded]="menuOpen"
          aria-controls="site-mobile-nav"
          aria-label="Open navigation menu">
          <mat-icon aria-hidden="true">{{ menuOpen ? 'close' : 'menu' }}</mat-icon>
        </button>
      </div>

      @if (menuOpen) {
        <nav id="site-mobile-nav" class="mobile-nav" aria-label="Mobile navigation">
          <a routerLink="/" (click)="closeMenu()">Home</a>
          <a routerLink="/" fragment="about_us" (click)="closeMenu()">About</a>
          <a routerLink="/" fragment="how-it-works" (click)="closeMenu()">How it works</a>
          <a routerLink="/events" (click)="closeMenu()">Events &amp; stories</a>
          <a routerLink="/faq" (click)="closeMenu()">FAQ</a>
          <a routerLink="/contact" (click)="closeMenu()">Contact</a>
          <a href="https://c21fg.online" target="_blank" rel="noopener" (click)="closeMenu()">Partner sign in</a>
          <a mat-flat-button routerLink="/get-started" class="mobile-cta" (click)="closeMenu()">Get started</a>
        </nav>
      }
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background: rgba(3, 1, 15, 0.97);
      color: #fff;
      border-bottom: 1px solid rgba(212, 169, 65, 0.35);
      backdrop-filter: blur(10px);
    }
    .bar {
      max-width: 1200px;
      margin: 0 auto;
      min-height: 68px;
      padding: 0 1.25em;
      display: flex;
      align-items: center;
      gap: 1.25em;
    }
    .brand {
      display: inline-flex;
      align-items: center;
      gap: 0.6em;
      color: #fff;
      text-decoration: none;
      font-weight: 800;
      letter-spacing: 0.02em;
      margin-right: auto;
    }
    .brand img {
      height: 34px;
      width: auto;
    }
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 1.1em;
    }
    .desktop-nav a {
      color: #e8e2d6;
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 600;
      padding: 0.4em 0;
    }
    .desktop-nav a:hover {
      color: var(--dp-gold-bright);
    }
    .desktop-nav .partner-link {
      border: 1px solid rgba(212, 169, 65, 0.55);
      border-radius: 999px;
      padding: 0.45em 0.9em;
    }
    .desktop-nav .cta {
      background: var(--dp-gold-bright);
      color: #111;
      font-weight: 800;
      min-height: 44px;
      padding: 0 1.1em;
    }
    .menu-btn {
      display: none;
      width: 44px;
      height: 44px;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(212, 169, 65, 0.5);
      border-radius: 8px;
      background: transparent;
      color: var(--dp-gold-bright);
      cursor: pointer;
    }
    .mobile-nav {
      display: grid;
      gap: 0.25em;
      padding: 0.5em 1.25em 1.25em;
      border-top: 1px solid rgba(212, 169, 65, 0.2);
    }
    .mobile-nav a {
      display: flex;
      align-items: center;
      min-height: 44px;
      padding: 0 0.25em;
      color: #e8e2d6;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    .mobile-nav a:hover {
      color: var(--dp-gold-bright);
    }
    .mobile-nav .mobile-cta {
      margin-top: 0.75em;
      justify-content: center;
      background: var(--dp-gold-bright);
      color: #111;
      border-bottom: 0;
      font-weight: 800;
    }
    @media (max-width: 900px) {
      .desktop-nav {
        display: none;
      }
      .menu-btn {
        display: inline-flex;
      }
    }
  `]
})
export class SiteHeaderComponent {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen) this.closeMenu();
  }
}
