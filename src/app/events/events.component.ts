import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SeoService } from '../_common/services/seo.service';
import { environment } from '../../environments/environment';
import { BackHomeComponent } from '../_common/components/back-home.component';

interface EventVideo {
  id: string;
  tag: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
}

@Component({
  selector: 'async-events',
  imports: [MatButtonModule, MatIconModule, RouterModule, BackHomeComponent],
  template: `
    <section class="events-page">
      <async-back-home />
      <div class="events-hero">
        <p class="eyebrow">/ EVENTS &amp; STORIES</p>
        <h1>Inside the room where it happens.</h1>
        <p class="intro">
          Relive the Diamond Project 10th Anniversary — “The Invincibles” — with highlights
          from our Abuja celebration and grand finale.
        </p>
      </div>

      <div class="video-grid">
        @for (video of videos; track video.id) {
          <button type="button" class="video-card" (click)="openVideo(video)" [attr.aria-label]="'Play ' + video.title">
            <span class="thumb">
              <img [src]="video.thumbnail" [alt]="video.title" loading="lazy" />
              <span class="play" aria-hidden="true"><mat-icon>play_arrow</mat-icon></span>
              <span class="tag">{{ video.tag }}</span>
            </span>
            <span class="card-copy">
              <span class="card-title">{{ video.title }}</span>
              <span class="card-desc">{{ video.description }}</span>
            </span>
          </button>
        }
      </div>

      <div class="events-cta">
        <div>
          <h2>Want to experience the next one live?</h2>
          <p>Join a weekly online showcase or speak with a consultant about your next step.</p>
        </div>
        <div class="cta-actions">
          <a mat-flat-button class="cta-gold" routerLink="/get-started">Get started</a>
          <a mat-stroked-button class="cta-outline" routerLink="/contact">Contact us</a>
        </div>
      </div>

      <p class="disclaimer">
        Highlights are shared for context. Earnings vary and are not guaranteed.
      </p>
    </section>

    @if (activeVideo; as video) {
      <div class="video-modal" role="dialog" aria-modal="true" [attr.aria-label]="video.title" (click)="closeVideo()">
        <div class="video-modal-body" (click)="$event.stopPropagation()">
          <button #closeBtn type="button" class="modal-close" (click)="closeVideo()" aria-label="Close video">&#10005;</button>
          <div class="video-frame">
            <iframe
              [src]="embedUrl(video.id)"
              [title]="video.title"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
            </iframe>
          </div>
          <div class="modal-meta">
            <h3>{{ video.title }}</h3>
            <a [href]="video.youtubeUrl" target="_blank" rel="noopener">Watch on YouTube</a>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .events-page {
      background: var(--dp-paper);
      color: var(--dp-text);
      padding: 3em 1.5em 4em;
    }
    .events-hero {
      max-width: 1080px;
      margin: 0 auto 2.5em;
    }
    .eyebrow {
      color: var(--dp-gold-ink);
      font-size: 0.8rem;
      font-weight: 800;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin: 0 0 0.75em;
    }
    h1 {
      font-family: var(--dp-font-display);
      font-size: clamp(2rem, 4vw, 3rem);
      margin: 0 0 0.4em;
    }
    .intro {
      color: var(--dp-muted);
      font-size: 1.05rem;
      max-width: 46em;
      line-height: 1.6;
      margin: 0;
    }
    .video-grid {
      max-width: 1080px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
      gap: 1.25em;
    }
    .video-card {
      display: block;
      width: 100%;
      padding: 0;
      border: 1px solid var(--dp-line);
      border-radius: 14px;
      background: var(--dp-surface);
      color: inherit;
      text-align: left;
      cursor: pointer;
      overflow: hidden;
      font: inherit;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .video-card:hover,
    .video-card:focus-visible {
      transform: translateY(-3px);
      box-shadow: 0 14px 32px rgba(3, 1, 15, 0.14);
    }
    .thumb {
      position: relative;
      display: block;
      aspect-ratio: 16 / 9;
      background: var(--dp-night);
      overflow: hidden;
    }
    .thumb img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .thumb::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(3,1,15,0.05), rgba(3,1,15,0.55));
    }
    .play {
      position: absolute;
      inset: 0;
      margin: auto;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--dp-gold-bright);
      color: #111;
      z-index: 2;
      box-shadow: 0 8px 24px rgba(0,0,0,0.35);
    }
    .play mat-icon {
      font-size: 38px;
      width: 38px;
      height: 38px;
    }
    .tag {
      position: absolute;
      left: 14px;
      top: 14px;
      z-index: 2;
      background: rgba(3, 1, 15, 0.82);
      color: var(--dp-gold-bright);
      border: 1px solid var(--dp-gold);
      border-radius: 999px;
      padding: 0.35em 0.8em;
      font-size: 0.72rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .card-copy {
      display: block;
      padding: 1.1em 1.25em 1.3em;
    }
    .card-title {
      display: block;
      font-family: var(--dp-font-display);
      font-size: 1.35rem;
      font-weight: 700;
      line-height: 1.25;
    }
    .card-desc {
      display: block;
      margin-top: 0.45em;
      color: var(--dp-muted);
      line-height: 1.55;
    }
    .events-cta {
      max-width: 1080px;
      margin: 2.5em auto 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5em;
      flex-wrap: wrap;
      background: var(--dp-night);
      color: #fff;
      border: 1px solid var(--dp-gold);
      border-radius: 14px;
      padding: 1.5em;
    }
    .events-cta h2 {
      color: var(--dp-gold-bright);
      margin: 0 0 0.35em;
      font-size: 1.35rem;
    }
    .events-cta p {
      margin: 0;
      color: rgba(255,255,255,0.74);
    }
    .cta-actions {
      display: flex;
      gap: 0.75em;
      flex-wrap: wrap;
    }
    .cta-actions a {
      min-height: 44px;
    }
    .cta-gold {
      background: var(--dp-gold-bright) !important;
      color: #111 !important;
      font-weight: 800;
    }
    .cta-outline {
      border-color: var(--dp-gold) !important;
      color: var(--dp-gold-bright) !important;
    }
    .disclaimer {
      max-width: 1080px;
      margin: 1.5em auto 0;
      color: var(--dp-muted);
      font-size: 0.82rem;
    }
    .video-modal {
      position: fixed;
      inset: 0;
      z-index: 1300;
      background: rgba(3, 1, 15, 0.92);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5em;
    }
    .video-modal-body {
      width: min(960px, 100%);
      position: relative;
      background: #050111;
      border: 1px solid var(--dp-gold);
      border-radius: 12px;
      overflow: hidden;
    }
    .modal-close {
      position: absolute;
      top: 0.6em;
      right: 0.6em;
      z-index: 2;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 1px solid var(--dp-gold);
      background: rgba(3, 1, 15, 0.85);
      color: var(--dp-gold-bright);
      font-size: 1.25rem;
      cursor: pointer;
    }
    .video-frame {
      position: relative;
      aspect-ratio: 16 / 9;
      background: #000;
    }
    .video-frame iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
    .modal-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1em;
      padding: 0.9em 1.1em;
    }
    .modal-meta h3 {
      margin: 0;
      color: #fff;
      font-size: 1rem;
      font-family: var(--dp-font-body);
    }
    .modal-meta a {
      color: var(--dp-gold-bright);
      font-size: 0.85rem;
      font-weight: 700;
    }
    @media (max-width: 600px) {
      .video-modal {
        padding: 0;
      }
      .video-modal-body {
        border-radius: 0;
      }
      .modal-meta {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class EventsComponent implements OnInit, OnDestroy {
  @ViewChild('closeBtn') closeBtn?: ElementRef<HTMLButtonElement>;

  readonly videos: EventVideo[] = [
    {
      id: 'SYlbk0RmmZk',
      tag: 'Day 1 · Abuja 2026',
      title: 'Day 1 Highlights — Abuja 2026',
      description: 'The opening day of the Diamond Project 10th Anniversary — “The Invincibles” — in Abuja.',
      thumbnail: 'assets/events/SYlbk0RmmZk.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=SYlbk0RmmZk'
    },
    {
      id: 'kUQ-n9mrXkI',
      tag: 'Day 2 · Grand Celebration',
      title: 'Day 2 Highlights — Grand Celebration',
      description: 'The grand finale of the 10th Anniversary celebration, filled with stories, recognition and momentum.',
      thumbnail: 'assets/events/kUQ-n9mrXkI.jpg',
      youtubeUrl: 'https://www.youtube.com/watch?v=kUQ-n9mrXkI'
    }
  ];

  activeVideo: EventVideo | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Events & Stories | Diamond Project',
      description: 'Watch highlights from Diamond Project events, including the 10th Anniversary “The Invincibles” celebrations in Abuja.',
      path: '/events',
      image: 'assets/events/kUQ-n9mrXkI.jpg',
      imageWidth: 1280,
      imageHeight: 720
    });
    this.seo.setJsonLd('dp-events-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: this.videos.map((video, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'VideoObject',
          name: video.title,
          description: video.description,
          thumbnailUrl: `${environment.publicSiteUrl}/${video.thumbnail}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
          url: video.youtubeUrl
        }
      }))
    });
  }

  openVideo(video: EventVideo): void {
    this.activeVideo = video;
    document.body.style.overflow = 'hidden';
    setTimeout(() => this.closeBtn?.nativeElement.focus());
  }

  closeVideo(): void {
    this.activeVideo = null;
    document.body.style.overflow = '';
  }

  embedUrl(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
    );
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.activeVideo) this.closeVideo();
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    this.seo.clearJsonLd('dp-events-schema');
  }
}
