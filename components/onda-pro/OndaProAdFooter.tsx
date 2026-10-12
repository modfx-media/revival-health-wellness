/** Plain-text footer for the ONDA Pro ad landing — no links. */
export default function OndaProAdFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-revival-gold/15 bg-revival-dark py-8 text-revival-cream/70">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 text-center text-xs sm:px-6">
        <p className="font-heading text-sm text-revival-cream">
          Revival Health &amp; Wellness
        </p>
        <p className="text-revival-cream/55">
          Southwest: 7220 S. Cimarron Rd., Suite 140, Las Vegas, NV 89113
        </p>
        <p className="text-revival-cream/55">
          Northwest: 2585 Box Canyon Dr., Suite 150, Las Vegas, NV 89128
        </p>
        <p className="text-revival-cream/50">
          &copy; {year} Revival Health &amp; Wellness. All rights reserved.
          Results vary by individual.
        </p>
      </div>
    </footer>
  );
}
