import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PartnerInterface } from '../_common/interface/partner.interface';
import { BrandsComponent } from './brands.component';

/**
 * @title Partner public one-pager — /:partnerUsername.
 *
 * Professional, expensive, mobile-first. Every section is data-driven from
 * Partner → Settings → Landing page with platform fallbacks, so an empty
 * profile still renders a credible page. Join CTAs route to ../get-started
 * (username attribution rides localStorage set by the container).
 */
@Component({
  selector: 'async-partners-presentation',
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, BrandsComponent],
  template: `
  <div class="pp">
    <!-- Sticky nav -->
    <header class="nav">
      <a routerLink="/" class="brand" (click)="scrollToTop()">
        <img src="/assets/images/icon.png" alt="Diamond Project" />
        <span class="brand-text">
          <strong>{{ fullName() }}</strong>
          <small>{{ partner.businessTagline || partner.jobTitle || 'Diamond Project Partner' }}</small>
        </span>
      </a>
      <nav class="links">
        <button type="button" class="link-btn" (click)="scrollTo('mentor')">Mentor</button>
        <button type="button" class="link-btn" (click)="scrollTo('opportunity')">Opportunity</button>
        <button type="button" class="link-btn" (click)="scrollTo('proof')">Results</button>
        <button type="button" class="link-btn" (click)="scrollTo('faq')">FAQ</button>
      </nav>
      <a mat-flat-button class="join-sm" routerLink="../get-started" (click)="scrollToTop()">Join with {{ partner.name }}</a>
    </header>

    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <p class="badge">{{ partner.heroBadge || 'Diamond Project · Partner Page' }}</p>
        <h1>{{ partner.headline || ('Build a flexible income with ' + fullName()) }}</h1>
        <p class="sub">{{ partner.subHeadline || 'I help everyday people start a flexible online business — mentorship, training, community and health products people reorder.' }}</p>
        <div class="cta-row">
          <a mat-flat-button class="cta-gold" routerLink="../get-started" (click)="scrollToTop()">Join with {{ partner.name }} <mat-icon>arrow_forward</mat-icon></a>
          @if (whatsappLink()) {
            <a mat-stroked-button class="cta-wa" [href]="whatsappLink()" target="_blank" rel="noopener"><span class="fa fa-whatsapp"></span> {{ partner.whatsappCtaText || 'Chat on WhatsApp' }}</a>
          }
        </div>
        @if (partner.inviteNote) {
          <p class="invite"><mat-icon>markunread_mailbox</mat-icon> {{ partner.inviteNote }}</p>
        }
        <div class="trust">
          <div class="mentor-chip">
            <span class="avatar">{{ initials() }}</span>
            <span>
              <strong>{{ fullName() }}</strong>
              <small>{{ partner.jobTitle || 'Entrepreneur & Mentor' }}{{ partner.locationDisplay ? ' · ' + partner.locationDisplay : '' }}</small>
            </span>
          </div>
          <div class="points">
            <span><mat-icon>verified</mat-icon> Personal mentorship</span>
            <span><mat-icon>groups</mat-icon> Active community</span>
            <span><mat-icon>school</mat-icon> Step-by-step training</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Logos -->
    <section class="strip">
      <p class="label">BACKED BY ESTABLISHED BRANDS &amp; PRODUCTS</p>
      <async-brands-logos></async-brands-logos>
    </section>

    <!-- Mentor -->
    <section class="section mentor" id="mentor">
      <p class="eyebrow">/ MEET YOUR MENTOR</p>
      <div class="two">
        <div class="mentor-card">
          <span class="avatar lg">{{ initials() }}</span>
          <h2>{{ fullName() }}</h2>
          <p class="role">{{ partner.jobTitle || 'Entrepreneur & Mentor' }}</p>
          @if (partner.locationDisplay) { <p class="loc"><mat-icon>place</mat-icon> {{ partner.locationDisplay }}</p> }
          @if (partner.bio) { <p class="bio">{{ partner.bio }}</p> }
          <div class="contact">
            @if (partner.displayPhone || partner.phone) {
              <a [href]="'tel:' + (partner.displayPhone || partner.phone)"><mat-icon>call</mat-icon> {{ partner.displayPhone || partner.phone }}</a>
            }
            @if (partner.displayEmail || partner.email) {
              <a [href]="'mailto:' + (partner.displayEmail || partner.email)"><mat-icon>mail</mat-icon> {{ partner.displayEmail || partner.email }}</a>
            }
          </div>
          <div class="socials">
            @for (s of socials(); track s.label) {
              <a [href]="s.url" target="_blank" rel="noopener" [title]="s.label" class="soc">{{ s.short }}</a>
            }
          </div>
        </div>
        <div>
          <h3>My story</h3>
          <p class="story">{{ partner.aboutStory || 'I started like most people — working hard with little to show for it. Diamond Project gave me mentorship, structure and a health business I am proud of. Today I guide others to do the same, one honest conversation at a time.' }}</p>
          @if (partner.achievements) {
            <p class="achieve"><mat-icon>emoji_events</mat-icon> {{ partner.achievements }}</p>
          }
          <h3>Why work with me</h3>
          <ul class="ticks">
            <li><mat-icon>check_circle</mat-icon> You speak directly with me — no bots, no pressure.</li>
            <li><mat-icon>check_circle</mat-icon> Weekly online showcase + WhatsApp support.</li>
            <li><mat-icon>check_circle</mat-icon> Clear first steps, even if you are not tech-savvy.</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pillars -->
    <section class="pillars">
      <p class="eyebrow light">/ THE DIAMOND FOUNDATION</p>
      <h2>Four pillars that build the ultimate version of you</h2>
      <div class="cards">
        <div class="pcard"><mat-icon>psychology</mat-icon><h4>Mentorship &amp; Capacity</h4><p>Expert guidance and tailored training from leaders invested in your growth.</p></div>
        <div class="pcard"><mat-icon>how_to_reg</mat-icon><h4>Discipline &amp; Stoicism</h4><p>Structure, resilience and steady execution — the quiet edge of winners.</p></div>
        <div class="pcard"><mat-icon>health_and_safety</mat-icon><h4>Health Optimization</h4><p>Nutrition, supplementation and habits that keep you sharp and radiant.</p></div>
        <div class="pcard"><mat-icon>account_balance</mat-icon><h4>Financial Leverage</h4><p>Learn to amplify effort into sustainable, compounding income.</p></div>
      </div>
    </section>

    <!-- Opportunity -->
    <section class="section" id="opportunity">
      <p class="eyebrow">/ WHAT YOU GET WITH ME</p>
      <h2>Joining through my link means you never walk alone</h2>
      <ul class="ticks big">
        @for (pt of opportunityPoints(); track pt) {
          <li><mat-icon>check_circle</mat-icon> {{ pt }}</li>
        }
      </ul>
      <div class="steps">
        <div class="step"><span>1</span><h4>Tap my Join link</h4><p>It tags your form to me so I can personally welcome you.</p></div>
        <div class="step"><span>2</span><h4>Fill Get Started</h4><p>2 minutes. Mention {{ partner.name }} so my team routes you correctly.</p></div>
        <div class="step"><span>3</span><h4>Chat &amp; attend showcase</h4><p>We talk on WhatsApp and you join a live business showcase.</p></div>
      </div>
      <div class="cta-row">
        <a mat-flat-button class="cta-gold" routerLink="../get-started" (click)="scrollToTop()">Start now — it takes 2 minutes</a>
        @if (whatsappLink()) {
          <a mat-stroked-button [href]="whatsappLink()" target="_blank" rel="noopener">Join WhatsApp community</a>
        }
      </div>
    </section>

    <!-- Proof -->
    <section class="section proof" id="proof">
      <p class="eyebrow">/ RESULTS &amp; PROOF</p>
      <h2>Real people, real progress</h2>
      <div class="proof-grid">
        @if (partner.testimonial) {
          <figure class="quote">
            <blockquote>“{{ partner.testimonial }}”</blockquote>
            <figcaption><strong>{{ fullName() }}</strong><small>{{ partner.jobTitle || 'Diamond Project Partner' }}</small></figcaption>
            @if (partner.videoTestimonialUrl) {
              <a class="vid" [href]="partner.videoTestimonialUrl" target="_blank" rel="noopener"><mat-icon>play_circle</mat-icon> Watch my story</a>
            }
          </figure>
        }
        <figure class="quote">
          <blockquote>“The job market after graduation was brutal. Now I have flexibility for my family while building an income stream.”</blockquote>
          <figcaption><strong>Adeyemi Temitope</strong><small>Entrepreneur &amp; Mentor</small></figcaption>
        </figure>
        <figure class="quote">
          <blockquote>“I was tired of the corporate grind. Diamond Project let me be my own boss and build something meaningful.”</blockquote>
          <figcaption><strong>Imenwo Alex</strong><small>Chief Technology Officer</small></figcaption>
        </figure>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section" id="faq">
      <p class="eyebrow">/ HONEST ANSWERS</p>
      <h2>Questions people ask {{ partner.name }}</h2>
      <div class="faq">
        <details open><summary>Do I need experience or capital to start?</summary><p>No. You need a phone, 5–10 focused hours a week, and willingness to learn. {{ partner.name }} walks you through the first steps on WhatsApp.</p></details>
        <details><summary>How much time does this take weekly?</summary><p>Most partners start with 5–10 hours alongside work or school. Consistency beats intensity.</p></details>
        <details><summary>What exactly do I do?</summary><p>Share vetted health products, invite people to the weekly showcase, and mentor buyers — with scripts and training provided.</p></details>
        <details><summary>Is this available where I live?</summary><p>Diamond Project supports partners across Nigeria and beyond. Tap Join and {{ partner.name }} will confirm the closest support to you.</p></details>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="final">
      <div class="final-card">
        <p class="eyebrow light">/ YOUR INVITATION</p>
        <h2>Ready to start? Join with {{ fullName() }} today.</h2>
        <p>{{ partner.inviteNote || ('Mention ' + partner.name + ' on the form so I can personally welcome you and add you to our WhatsApp community.') }}</p>
        <div class="cta-row center">
          <a mat-flat-button class="cta-gold" routerLink="../get-started" (click)="scrollToTop()">Join with {{ partner.name }}</a>
          @if (whatsappLink()) {
            <a mat-stroked-button class="cta-wa-light" [href]="whatsappLink()" target="_blank" rel="noopener">WhatsApp community</a>
          }
        </div>
        <p class="fine">By joining you agree to be contacted by {{ fullName() }} about Diamond Project. No spam, no pressure — unsubscribe anytime.</p>
      </div>
    </section>

    <footer class="foot">
      <div class="foot-socials">
        @for (s of socials(); track s.label) {
          <a [href]="s.url" target="_blank" rel="noopener" [title]="s.label">{{ s.short }}</a>
        }
      </div>
      <p>© {{ year }} {{ fullName() }} · Diamond Project Partner · diamondproject.c21fg.online/{{ partner.username }}</p>
      <p class="fine">Earnings vary with effort. This page is a personal partner page, not a company income promise.</p>
    </footer>
  </div>
  `,
  styles: [`
    .pp { font-family: Inter, Roboto, "Helvetica Neue", Arial, sans-serif; color: #1c1a15; background: #faf8f3; }
    h1, h2, h3 { font-family: Garamond, Georgia, serif; line-height: 1.15; }
    .eyebrow { color: #a97f2c; font-size: 0.8rem; letter-spacing: 0.15em; font-weight: 700; }
    .eyebrow.light { color: #d4a941; }
    /* nav */
    .nav { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; gap: 1em; padding: 0.7em 1.2em; background: rgba(5,1,17,0.92); color: #fff; backdrop-filter: blur(8px); }
    .brand { display: flex; align-items: center; gap: 0.7em; text-decoration: none; color: #fff; margin-right: auto; }
    .brand img { height: 2.2rem; width: auto; }
    .brand-text { display: flex; flex-direction: column; line-height: 1.1; }
    .brand-text small { color: #d4a941; font-size: 0.72rem; }
    .links { display: flex; gap: 1em; }
    .links a { color: #e8e2d6; text-decoration: none; font-size: 0.9rem; }
    .links a:hover { color: #ffc107; }
    .link-btn { background: none; border: none; color: #e8e2d6; font-size: 0.9rem; cursor: pointer; padding: 0.4em 0.2em; font-family: inherit; }
    .link-btn:hover { color: #ffc107; }
    .join-sm { background: #ffc107 !important; color: #111 !important; font-weight: 700; }
    /* hero */
    .hero { background: radial-gradient(1200px 600px at 20% 0%, #2c2417 0%, #050111 55%, #03010f 100%); color: #fff; padding: 4em 1.5em 3em; }
    .hero-inner { max-width: 1080px; margin: 0 auto; }
    .badge { display: inline-block; color: #111; background: #ffc107; font-weight: 700; font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.4em 0.9em; border-radius: 999px; }
    .hero h1 { font-size: clamp(2rem, 5vw, 3.4rem); margin: 0.5em 0; max-width: 16em; }
    .sub { color: #d9d2c2; font-size: 1.15rem; max-width: 38em; }
    .cta-row { display: flex; gap: 0.8em; flex-wrap: wrap; margin: 1.4em 0; }
    .cta-gold { background: #ffc107 !important; color: #111 !important; font-weight: 800; min-height: 48px; }
    .cta-wa { border-color: #25d366 !important; color: #fff !important; min-height: 48px; }
    .cta-wa-light { border-color: #fff !important; color: #fff !important; }
    .invite { display: flex; gap: 0.5em; align-items: flex-start; background: rgba(255,193,7,0.12); border: 1px solid #d4a941; border-radius: 10px; padding: 0.8em 1em; max-width: 42em; }
    .trust { display: flex; gap: 1.5em; flex-wrap: wrap; align-items: center; margin-top: 1.5em; }
    .mentor-chip { display: flex; gap: 0.7em; align-items: center; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); padding: 0.6em 1em; border-radius: 999px; }
    .avatar { width: 44px; height: 44px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; color: #111; background: linear-gradient(135deg, #ffc107, #a97f2c); flex: none; }
    .avatar.lg { width: 84px; height: 84px; font-size: 1.6rem; }
    .points { display: flex; gap: 1em; flex-wrap: wrap; color: #e8e2d6; font-size: 0.92rem; }
    .points mat-icon { color: #25d366; vertical-align: middle; }
    .strip { background: #fff; border-bottom: 1px solid #e4ddcd; padding: 1em 1.5em; text-align: center; }
    .strip .label { color: #6e6e6e; font-size: 0.75rem; letter-spacing: 0.15em; }
    .section { max-width: 1080px; margin: 0 auto; padding: 3em 1.5em; }
    .two { display: grid; grid-template-columns: 340px 1fr; gap: 2em; }
    .mentor-card { background: #fff; border: 1px solid #e4ddcd; border-radius: 14px; padding: 1.5em; text-align: center; align-self: start; }
    .role { color: #a97f2c; font-weight: 700; margin: 0.2em 0; }
    .loc, .bio, .story { color: #444; }
    .loc mat-icon { vertical-align: middle; }
    .contact { display: flex; flex-direction: column; gap: 0.4em; margin: 1em 0; }
    .contact a { color: #111; text-decoration: none; display: flex; gap: 0.4em; align-items: center; justify-content: center; }
    .socials { display: flex; gap: 0.5em; justify-content: center; flex-wrap: wrap; }
    .soc, .foot-socials a { width: 38px; height: 38px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; background: #111; color: #ffc107; text-decoration: none; font-size: 0.75rem; font-weight: 800; }
    .achieve { background: #f3e8d2; border: 1px solid #d4a941; border-radius: 10px; padding: 0.7em 1em; display: flex; gap: 0.5em; }
    .ticks { list-style: none; padding: 0; display: grid; gap: 0.6em; }
    .ticks li { display: flex; gap: 0.5em; align-items: flex-start; }
    .ticks mat-icon { color: #1b5e20; }
    .ticks.big { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); margin: 1.5em 0; }
    .pillars { background: #03010f; color: #fff; padding: 3em 1.5em; text-align: center; }
    .pillars h2 { max-width: 20em; margin: 0 auto 1.5em; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1em; max-width: 1080px; margin: 0 auto; }
    .pcard { background: #121212; border: 1px solid #2c2c2c; border-radius: 12px; padding: 1.4em; text-align: left; }
    .pcard mat-icon { color: #ffc107; font-size: 2rem; height: 2rem; width: 2rem; }
    .steps { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1em; margin: 1.5em 0; }
    .step { background: #fff; border: 1px solid #e4ddcd; border-radius: 12px; padding: 1.2em; }
    .step span { width: 32px; height: 32px; border-radius: 50%; background: #111; color: #ffc107; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; }
    .proof { background: #fff; border-top: 1px solid #e4ddcd; border-bottom: 1px solid #e4ddcd; max-width: none; }
    .proof > * { max-width: 1080px; margin-left: auto; margin-right: auto; }
    .proof-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1em; }
    .quote { background: #faf8f3; border: 1px solid #e4ddcd; border-left: 4px solid #a97f2c; border-radius: 10px; padding: 1.2em; margin: 0; }
    .quote blockquote { font-style: italic; color: #333; margin: 0 0 1em; }
    .quote figcaption { display: flex; flex-direction: column; }
    .vid { display: inline-flex; gap: 0.3em; align-items: center; margin-top: 0.7em; color: #6e5218; font-weight: 700; text-decoration: none; }
    .faq { display: grid; gap: 0.7em; max-width: 720px; }
    .faq details { background: #fff; border: 1px solid #e4ddcd; border-radius: 10px; padding: 1em 1.2em; }
    .faq summary { font-weight: 700; cursor: pointer; }
    .final { padding: 3em 1.5em; background: linear-gradient(180deg, #faf8f3, #f3e8d2); }
    .final-card { max-width: 860px; margin: 0 auto; background: #050111; color: #fff; border-radius: 18px; padding: 2.5em 2em; text-align: center; border: 1px solid #d4a941; }
    .center { justify-content: center; }
    .fine { color: #a8a094; font-size: 0.85rem; }
    .foot { text-align: center; padding: 2em 1.5em 3em; color: #6e6e6e; font-size: 0.9rem; }
    .foot-socials { display: flex; gap: 0.5em; justify-content: center; margin-bottom: 1em; }
    @media (max-width: 860px) {
      .links { display: none; }
      .two { grid-template-columns: 1fr; }
      .join-sm { font-size: 0.8rem; }
    }
  `]
})
export class PartnersPresenterComponent {
  @Input() partner!: PartnerInterface;
  protected readonly year = new Date().getFullYear();

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * In-page section nav that never leaves /:partnerUsername.
   * Plain href="#faq" resolves against <base href="/"> to "/#faq" (home),
   * which is why FAQ looked "not available". Buttons + scrollIntoView keep
   * the /market path; replaceState mirrors the fragment for shareability
   * without triggering the Angular router.
   */
  protected scrollTo(id: string): void {
    try {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', window.location.pathname + '#' + id);
    } catch {
      document.getElementById(id)?.scrollIntoView();
    }
  }

  protected fullName(): string {
    const p = this.partner ?? ({} as PartnerInterface);
    return `${p.name ?? ''} ${p.surname ?? ''}`.trim() || p.username || 'Your Mentor';
  }

  protected initials(): string {
    const n = this.fullName().split(/\s+/).filter(Boolean);
    if (!n.length) return 'DP';
    return (n[0][0] + (n.length > 1 ? n[n.length - 1][0] : '')).toUpperCase();
  }

  protected whatsappLink(): string | null {
    return this.partner?.whatsappGroupLink || this.partner?.whatsappChatLink || null;
  }

  protected opportunityPoints(): string[] {
    const custom = (this.partner?.opportunityPoints ?? []).map((s) => String(s).trim()).filter(Boolean);
    if (custom.length) return custom.slice(0, 8);
    return [
      'Personal mentorship on WhatsApp — direct access to me',
      'Weekly live business showcase you can invite friends to',
      'Step-by-step training, even if you are not tech-savvy',
      'Health & wellness products people actually reorder',
    ];
  }

  protected socials(): Array<{ label: string; short: string; url: string }> {
    const p = this.partner ?? ({} as PartnerInterface);
    const out: Array<{ label: string; short: string; url: string }> = [];
    const push = (label: string, short: string, url?: string) => {
      if (url?.trim()) out.push({ label, short, url: url.trim() });
    };
    push('Facebook', 'fB', p.facebookPage);
    push('Instagram', 'IG', p.instagramPage);
    push('TikTok', 'TT', p.tiktokPage);
    push('X', 'X', p.twitterPage);
    push('LinkedIn', 'in', p.linkedinPage);
    push('YouTube', 'YT', p.youtubePage);
    return out;
  }
}
