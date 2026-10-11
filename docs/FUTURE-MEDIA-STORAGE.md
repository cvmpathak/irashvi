# Future Media Storage

The current storefront serves images from `public/images/`. There is no
external CDN, no S3, no R2 dependency in the codebase.

## Boundary

`src/services/media/types.ts` defines:

```ts
export interface MediaStorage {
  resolve(src: string): string;
  upload?: (file: File) => Promise<{ url: string }>;
  delete?: (url: string) => Promise<void>;
  getPublicUrl?: (key: string) => string;
}
```

`LocalMediaStorage` is the only implementation today; it simply returns the
asset path verbatim. Product images are referenced by `/images/products/*.svg`
in `src/data/products.ts`.

## Swapping in object storage

When you're ready to use S3, Cloudflare R2, or any S3-compatible service:

1. Add an adapter (e.g. `S3MediaStorage`) that implements `MediaStorage`.
   - `resolve(src)` may keep returning the asset path verbatim for already-
     uploaded images, or rewrite `https://cdn.example.com/...` URLs.
   - `upload(file)` performs a presigned upload or a server-side copy.
   - `delete(url)` removes the object.
2. Re-export the adapter from `src/services/media/index.ts`:

   ```ts
   export const mediaStorage: MediaStorage =
     process.env.MEDIA_DRIVER === 's3' ? new S3MediaStorage() : new LocalMediaStorage();
   ```

3. No UI changes. `ProductCard`, `ProductGallery`, and `recipes.js`/`journal.ts`
   call `mediaStorage.resolve(src)` and continue to work.

## Asset migration

Run a one-time script that uploads every file under `public/images/` to the
storage backend and writes back public URLs into the database (or seed
script). Keep the originals under `public/images/` as a fallback so the
storefront still renders if the CDN is unreachable.

## Performance tips

- Use Next.js `<Image>` with `remotePatterns` configured for the new domain
  (see `next.config.mjs`).
- Generate AVIF/WebP variants at upload time when possible.
- Cache immutable assets for a year (`Cache-Control: public, max-age=31536000,
  immutable`).

## Testing

- Verify that `mediaStorage.resolve(src)` returns the expected URLs for known
  inputs.
- Verify that `upload` + `getPublicUrl` round-trips a small fixture image.