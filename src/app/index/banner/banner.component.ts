import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'async-index-banner',
  imports: [CommonModule, MatButtonModule, RouterModule],
  template: `
<div class="banner-container">
    <div class="top-nav">
      <a class="logo" routerLink="/">
        <img src="/assets/images/icon.png" alt="Diamond Project Logo" />
      </a>
      <button class="menu-toggle" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen" aria-controls="sidebar-menu" aria-label="Open menu">MENU <span class="hamburger" aria-hidden="true">&#9776;</span></button>
    </div>
  
    <div class="banner-content">
      <h1>Discover Your <br />
        <span class="sliding-words" aria-live="off">
          <span class="sliding-word" *ngFor="let word of words; let i = index" [class.active]="i === wordIndex" [attr.aria-hidden]="i !== wordIndex">{{ word }}</span>
        </span>
      </h1>
      <br />
      <span class="line"></span>

      <p>
        Our transformative platform empowers individuals to elevate lives
        through a multifaceted approach.
      </p>

      <a mat-flat-button class="get-started" [routerLink]="uriLink" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="scrollToTop()">Get Started</a>
    </div>

    <div class="front-menu">
      <ul>
        <li>
          <a href="#about_us" >
          <span class="dot"></span> ABOUT US <br /><small>who we are</small>
          </a>
        </li>
        <li>
          <a  href="#four_pillars">
          <span class="dot"></span> OUR PILLARS <br /><small>what we do</small>
          </a>
        </li>
        <li>
          <a href="#footer">
          <span class="dot"></span> CONTACT US <br /><small>get in touch</small>
          </a>
        </li>
      </ul>
    </div>
  
    <nav class="sidebar-menu" id="sidebar-menu" [class.open]="menuOpen" aria-label="Site menu">
      <button class="close-menu" (click)="closeMenu()" aria-label="Close menu">&#10005;</button>

      <img src="/assets/images/icon.png" alt="Diamond Project Logo" />

      <ul>
        <li>
            <a routerLink="/" (click)="scrollToTop()" (click)="closeMenu()">
                <span class="number">01.</span> Home
            </a>
        </li>
        <li>
            <a href="#about_us" (click)="closeMenu()">
                <span class="number">02.</span> About Us
            </a>
        </li>
        <li>
            <a href="#four_pillars" (click)="closeMenu()">
                <span class="number">03.</span> Our Pillars 
            </a>
        </li>
        <li>
            <a href="#footer" (click)="closeMenu()">
                <span class="number">04.</span> Contact Us
            </a>
        </li>
        <li>
          <a (click)="closeMenu()" href="https://c21fg.online" target="_blank" rel="noopener"><span class="number">05.</span> Partners Platform</a>
        </li>
      </ul>

      <div class="menu-description">
        <p>
          We are dedicated to guiding our partners towards becoming the ultimate versions of themselves.
        </p>
      </div>
    </nav>
</div>
  `,
  styles: [`


.banner-container {
  position: relative;
  height: 100vh;
  background: url('/assets/images/hero-bg2.jpg') center/cover no-repeat;
  color: white;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  .top-nav {
    position: absolute;
    top: 20px;
    left: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    z-index: 2;

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;

      img {
        width: 200px;
        height: auto;
      }
    }

    .menu-toggle {
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      background: transparent;
      border: none;
      color: inherit;
      font-family: inherit;
      min-height: 44px;

      .hamburger {
        font-size: 1.5rem;
      }
    }
  }

  .banner-content {
    position: relative;
    z-index: 2;
    top: 40%;
    transform: translateY(-50%);
    text-align: center;

    h1 {
      font-size: 3.5rem;
      font-weight: bold;
      line-height: 1.2;
      margin-bottom: 1em;
      span {
        display: inline-block;
        min-height: 1.2em; /* Ensures consistent height for the text */
        margin-left: -3em;
      }
    }

    .line {
      display: block;
      width: 100px;
      height: 4px;
      background-color: rgb(106, 81, 4);
      margin: 20px auto;
    }

    p {
      margin-top: 1em;
      font-size: 1.6rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }

    .get-started {
      width: auto;
      min-width: 12em;
      font-size: 1.1em;
      margin-top: 2em;
      background: var(--dp-gold-bright);
    }
  }



.front-menu {
    position: absolute;
    right: 20px;
    top: 40%;
    transform: translateY(-50%);
    z-index: 2;
    width: 20em;

    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 0.85rem;
        border-bottom: 1px solid rgb(43, 43, 43);
        border-top: 1px solid rgb(43, 43, 43);
        padding: 2em;
        transition: background-color 0.3s, color 0.3s;
        border-radius: 20px;

        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--dp-gold-bright);
        }

        &:first-child {
          border-bottom: none;
        }

        &:last-child {
          border-top: none;
        }

        .dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: var(--dp-gold-bright);
          border-radius: 50%;
          margin-right: 8px;
        }

        small {
          display: block;
          font-size: 1rem;
          opacity: 0.7;
          margin-left: 1em;
          padding-top: 0.4em;
          color: rgb(209, 209, 209);
        }
        a {
          text-decoration: none;
          color: white;
          cursor:pointer;
        }
      }
    }
  }



  .sidebar-menu {
    position: fixed;
    right: -100%; /* Hidden off-screen initially */
    top: 0;
    height: 100%;
    width: 20em;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    z-index: 3;
    transition: right 0.3s ease-in-out; /* Smooth slide-in/out animation */
    padding: 20px;

    &.open {
      right: 0; /* Slide into view when the 'open' class is added */
    }

    .close-menu {
      font-size: 1.5rem;
      text-align: right;
      cursor: pointer;
      margin-bottom: 20px;
      background: transparent;
      border: none;
      color: inherit;
      margin-left: auto;
      min-width: 44px;
      min-height: 44px;
    }

    img {
      width: 12em;
      display: block; /* Makes the image a block element */
      margin: 0 auto; /* Centers the image horizontally */
      padding-bottom: 2em;
    }


    ul {
      list-style: none;
      padding: 0;

      li {
        font-size: 0.85rem;
        //border-bottom: 1px solid rgb(43, 43, 43);
        border-top: 1px solid rgb(43, 43, 43);
        padding: 1em;
        transition: background-color 0.3s, color 0.3s;
        border-radius: 10px;
        margin-bottom: 1em;
        &:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--dp-gold-bright);
        }

        &:first-child {
         // border-bottom: none;
        }

        &:last-child {
         //border-top: none;
        }

        .number {
          display: inline-block;
          //width: 6px;
          //height: 6px;
          color:rgb(59, 66, 70);
          //border-radius: 50%;
          margin-right: 2em;
        }

      
        a {
          text-decoration: none;
          color: white;
        }
      }
    }
  }

  .menu-description {
    display: block; /* Makes the image a block element */
    margin: 0 auto; /* Centers the image horizontally */
    
    margin-top: 3em;
    font-size: 0.9rem;
    color: rgb(121, 121, 121);
    line-height: 1.5;
    width: 18em;
    font-weight: bolder;
  }

  .sliding-word {
    display: inline-block;
    position: absolute;
    opacity: 0;
    transform: translateY(100%); /* Start below */
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .sliding-word.active {
    opacity: 1;
    transform: translateY(0); /* Slide into view */
  }

  @media (prefers-reduced-motion: reduce) {
    .sliding-word {
      transition: none;
      transform: none;
    }
  }

  .sliding-word:not(.active) {
    opacity: 0;
    transform: translateY(-100%); /* Slide out above */
  }

}


/* Media Query for Mobile Screens */
@media (max-width: 1400px) {
  .banner-container {

    .banner-content {
      h1 {
        span {
          display: inline-block;
          min-height: 1.2em; /* Ensures consistent height for the text */
          margin-left: -3.5em;
          font-size: 0.8em;
        }
      }
    }

    .front-menu {
      display: none;
    }
    .banner-content {
      .get-started {
        width: auto;
        font-size: 0.8em;
        margin-top: 2em;
        background: var(--dp-gold-bright);
      }
    }

  }
 
 
}

`]
})
export class BannerComponent {

  @Input() isUsernamePage = false;

  uriLink = "/get-started"

  menuOpen = false;

  words = ['True Potential.', 'Greatness Within.', 'Success Path.', 'Ultimate Version.'];
  wordIndex = 0;

  ngOnInit(): void {
    this.startSlidingWords();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  startSlidingWords(): void {
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // Respect reduced motion — keep the first word static.
    }
    setInterval(() => {
      this.wordIndex = (this.wordIndex + 1) % this.words.length; // Cycle through words
    }, 5000); // Each word stays for 5 seconds
  }

  // scroll to top when clicked
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}
