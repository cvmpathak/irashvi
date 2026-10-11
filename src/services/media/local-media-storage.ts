import type { MediaStorage } from './types';

/**
 * LocalMediaStorage returns asset paths verbatim. All images are served
 * from /public/images. No network calls are made for image delivery.
 */
export class LocalMediaStorage implements MediaStorage {
  resolve(src: string): string {
    if (!src) return '/images/placeholder.svg';
    // Allow absolute URLs to pass through unchanged so that future
    // CDNs can be mixed in without modifying product records.
    if (/^https?:\/\//i.test(src)) return src;
    return src.startsWith('/') ? src : `/${src}`;
  }
}

export const mediaStorage: MediaStorage = new LocalMediaStorage();