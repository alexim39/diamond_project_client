import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';
import { PartnerInterface } from '../interface/partner.interface';

export interface SeoPage {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly defaultImage = `${environment.publicSiteUrl}/assets/images/black-diamond.png`;

  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document
  ) {}

  setPage(page: SeoPage): void {
    const url = this.absoluteUrl(page.path);
    const image = this.absoluteUrl(page.image) || this.defaultImage;

    this.title.setTitle(page.title);
    this.setTag('name', 'description', page.description);
    this.setTag('property', 'og:title', page.title);
    this.setTag('property', 'og:description', page.description);
    this.setTag('property', 'og:url', url);
    this.setTag('property', 'og:type', page.type ?? 'website');
    this.setTag('property', 'og:image', image);
    this.setTag('property', 'og:image:alt', page.title);
    this.setTag('name', 'twitter:card', 'summary_large_image');
    this.setTag('name', 'twitter:title', page.title);
    this.setTag('name', 'twitter:description', page.description);
    this.setTag('name', 'twitter:image', image);
    this.setTag('name', 'robots', page.noindex ? 'noindex, nofollow' : 'index, follow');
    this.setCanonical(url);
  }

  setPartner(partner: PartnerInterface, username: string): void {
    const fullName = `${partner.name ?? ''} ${partner.surname ?? ''}`.trim() || username;
    const description = partner.subHeadline
      || partner.bio
      || `Join ${fullName} on Diamond Project and start building a flexible online business.`;

    this.setPage({
      title: `${fullName} | Diamond Project Partner`,
      description,
      path: `/${username}`,
      image: partner.profileImage,
      type: 'profile',
    });
  }

  setNotFound(title: string, path: string): void {
    this.setPage({
      title: `${title} | Diamond Project`,
      description: 'The page you are looking for is not available.',
      path,
      noindex: true,
    });
  }

  setJsonLd(id: string, data: unknown): void {
    this.clearJsonLd(id);
    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  clearJsonLd(id: string): void {
    this.document.getElementById(id)?.remove();
  }

  private setTag(attribute: 'name' | 'property', key: string, content: string): void {
    const selector = `${attribute}="${key}"`;
    if (this.meta.getTag(selector)) {
      this.meta.updateTag({ [attribute]: key, content });
    } else {
      this.meta.addTag({ [attribute]: key, content });
    }
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private absoluteUrl(path?: string): string {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `${environment.publicSiteUrl}${path.startsWith('/') ? path : `/${path}`}`;
  }
}
