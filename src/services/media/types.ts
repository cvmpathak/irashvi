/**
 * Future-facing media storage interface.
 *
 * The current implementation simply returns local asset paths verbatim. A future
 * S3-compatible storage adapter can be plugged in without changing any UI.
 */
export interface MediaStorage {
  resolve(src: string): string;
  // Reserved for future implementations — not used in the demo phase.
  upload?: (file: File) => Promise<{ url: string }>;
  delete?: (url: string) => Promise<void>;
  getPublicUrl?: (key: string) => string;
}