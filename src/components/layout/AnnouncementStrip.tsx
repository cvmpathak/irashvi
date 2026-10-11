import { siteSettings } from '@/data/site-settings';

export function AnnouncementStrip() {
  const { announcement } = siteSettings;
  if (!announcement.enabled) return null;
  return (
    <div className="border-b border-forest-700/15 bg-forest-700 text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-[11px] tracking-[0.18em] sm:px-6 lg:px-8">
        <span aria-hidden="true">·</span>
        <span>{announcement.message}</span>
        {announcement.link && (
          <a
            href={announcement.link.href}
            className="underline-offset-4 hover:underline focus-visible:underline"
          >
            {announcement.link.label}
          </a>
        )}
      </div>
    </div>
  );
}