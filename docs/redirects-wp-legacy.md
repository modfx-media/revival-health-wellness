# Legacy WordPress redirects

Checked on 30 Oct 2026 against `https://revivalhealthandwellnessgroup.com`.

Sources:

- Wayback CDX `www.revivalhealthandwellnessgroup.com/*` (text/html, status 200), 269 unique paths.
- Rank Math `post-sitemap.xml` snapshot `20260518142742` (30 posts) and `category-sitemap.xml`.
- Google Search Console pages with impressions from 19 Jul 2026 through 16 Oct 2026 (640 URLs). 27 of those still returned 404. Every one of those 27 is in the table below.

Redirects in this map: **108** (40 exact `/blogs/<slug>/` matches, 68 hand maps).

Existing redirects kept in `next.config.ts` and not repeated here:

- `/coolpeel/` and `/coolpeel-laser/` → `/co2-laser-treatments/`
- `/octopro-onda/` → `/onda-pro/`

Legacy sitemaps `/sitemap_index.xml`, `/page-sitemap.xml`, `/wp-sitemap.xml`, and `/post-sitemap.xml` redirect to `/sitemap.xml`.

Rules: one hop to a URL that already returns 200. No catch-all. No source is itself a destination.

| Old path | Destination | Why |
| --- | --- | --- |
| `/aesthetics/emsculpt-neo/` | `/emsculpt-neo/` | Nested aesthetics child |
| `/aesthetics/hair-revival-health-and-wellness/` | `/hair/` | Nested hair hub |
| `/aesthetics/hair/finasteride-hair-loss-treatment/` | `/finasteride/` | Nested finasteride page |
| `/aesthetics/hair/prp-hair-restoration/` | `/prp-hair-restoration/` | Nested PRP hair page |
| `/aesthetics/injectables/botox/` | `/botox/` | Nested Botox page |
| `/aesthetics/injectables/derma-filler/` | `/derma-filler/` | Nested filler page |
| `/aesthetics/injectables/dysport/` | `/dysport/` | Nested Dysport page |
| `/aesthetics/injectables/kybella/` | `/kybella/` | Nested Kybella page |
| `/aesthetics/injectables/sculptra/` | `/sculptra/` | Nested Sculptra page |
| `/aesthetics/skin-revival-health-and-wellness/` | `/skin/` | Nested skin hub |
| `/aesthetics/skin/coolpeel/` | `/co2-laser-treatments/` | CoolPeel now lives on the CO2 page |
| `/aesthetics/skin/microneedling/` | `/microneedling/` | Nested microneedling page |
| `/aesthetics/skin/pdo-thread-lifts/` | `/pdo-thread-lifts/` | Nested thread-lift page |
| `/aesthetics/skin/scar-camouflage/` | `/scar-camouflage/` | Nested scar page |
| `/aesthetics/skin/under-eye-treatment/` | `/under-eye-treatment/` | Nested under-eye page |
| `/areas-we-serve/goodsprings/octopro-onda/` | `/areas-we-serve/goodsprings/onda-pro/` | Renamed ONDA Pro area page |
| `/areas-we-serve/whitney/octopro-onda/` | `/areas-we-serve/whitney/onda-pro/` | Renamed ONDA Pro area page |
| `/beyond-the-pill-why-trimix-is-the-breakthrough-ed-treatment-men-turn-to-when-medications-fail/` | `/blogs/beyond-the-pill-why-trimix-is-the-breakthrough-ed-treatment-men-turn-to-when-medications-fail/` | Exact blog slug |
| `/blog-posts/6-powerful-benefits-of-gainswave-tm-therapy/` | `/gainswave-tm/` | GAINSWave article |
| `/blog-posts/a-non-invasive-solution-for-erectile-dysfunction/` | `/gainswave-tm/` | Non-invasive ED therapy is GAINSWave |
| `/blog-posts/are-you-a-good-candidate-for-womens-bio-identical-hormone-pellets/` | `/womens-hormone-therapy/` | Women's hormone pellets |
| `/blog-posts/common-causes-of-erectile-dysfunction-in-men/` | `/men/` | Men's ED overview |
| `/blog-posts/emsella-treatment-for-ed/` | `/emsella/` | Emsella article |
| `/blog-posts/glp-1-medication-for-effective-weight-loss-management/` | `/glp-1/` | GLP-1 article |
| `/blog-posts/how-does-ed-affect-a-relationship/` | `/men/` | Men's ED overview |
| `/blog-posts/how-emsella-improves-neuromuscular-control-for-ed/` | `/blogs/how-emsella-improves-neuromuscular-control-for-ed/` | Exact blog slug |
| `/blog-posts/how-ozempic-simplifies-weight-loss/` | `/glp-1/` | Ozempic is a GLP-1 medication |
| `/blog-posts/how-to-find-the-right-ed-treatment-for-you/` | `/men/` | Men's ED treatment hub |
| `/blog-posts/naturally-treat-ed/` | `/gainswave-tm/` | Drug-free ED therapy is GAINSWave |
| `/blog-posts/non-invasive-female-sexual-dysfunction-treatment-in-las-vegas-with-gainswave-for-her/` | `/gainswavetm-for-her/` | GAINSWave For Her article |
| `/blog-posts/prp-hair-loss-treatment-for-women-and-men-in-las-vegas---natural-hair-recovery-at-revival-health/` | `/prp-hair-restoration/` | PRP hair article |
| `/blog-posts/revival-health-wellness-reigniting-your-vitality-in-las-vegas-nv/` | `/blogs/revival-health-wellness-reigniting-your-vitality-in-las-vegas-nv/` | Exact blog slug |
| `/blog-posts/reviving-confidence-and-performance-how-gainswave-tm-treats-erectile-dysfunction/` | `/gainswave-tm/` | GAINSWave article |
| `/blog-posts/semaglutide-las-vegas/` | `/glp-1/` | Semaglutide article |
| `/blog-posts/shockwave-therapy-the-secret-to-a-rock-solid-you/` | `/blogs/shockwave-therapy-the-secret-to-a-rock-solid-you/` | Exact blog slug |
| `/blog-posts/testosterone-replacement-therapy-a-solution-for-erectile-dysfunction-symptoms/` | `/mens-hormone-therapy/` | Testosterone therapy article |
| `/blog-posts/the-power-of-emsella-strengthening-your-core-for-better-health/` | `/blogs/the-power-of-emsella-strengthening-your-core-for-better-health/` | Exact blog slug |
| `/blog-posts/vitamin-booster-injection-near-me/` | `/vitamin-injections/` | Vitamin injection article |
| `/blog-posts/weight-loss-clinic-las-vegas/` | `/weight-loss/` | Weight loss clinic article |
| `/blog-posts/what-every-woman-should-know-about-bio-identical-hormone-pellets/` | `/womens-hormone-therapy/` | Women's hormone pellets |
| `/blog-posts/what-to-expect-when-visiting-an-ed-clinic/` | `/men/` | ED clinic visit article |
| `/blog-posts/why-are-many-men-at-risk-of-ed/` | `/blogs/why-are-many-men-at-risk-of-ed/` | Exact blog slug |
| `/blog-posts/why-choose-emsella-tm-reclaim-your-confidence-with-revolutionary-bladder-control-treatment/` | `/emsella/` | Emsella article |
| `/blog/` | `/blogs/` | Legacy blog index |
| `/boost-your-health-and-energy-how-emsculpt-neo-improves-circulation-and-functional-wellness/` | `/blogs/boost-your-health-and-energy-how-emsculpt-neo-improves-circulation-and-functional-wellness/` | Exact blog slug |
| `/category/health-wellness/` | `/blogs/` | WordPress category archive |
| `/category/p-long/` | `/blogs/` | Audit: WordPress category archive |
| `/category/uncategorized/` | `/blogs/` | WordPress category archive |
| `/category/weight-loss/` | `/blogs/` | WordPress category archive |
| `/ed-red-flags-and-medical-causes/` | `/blogs/ed-red-flags-and-medical-causes/` | Exact blog slug |
| `/emsella-the-pelvic-floor-fix-that-could-save-your-sex-life/` | `/blogs/emsella-the-pelvic-floor-fix-that-could-save-your-sex-life/` | Exact blog slug |
| `/from-feeling-inflamed-to-feeling-stuck-why-chronic-inflammation-is-sabotaging-your-weight-energy-and-skin/` | `/blogs/from-feeling-inflamed-to-feeling-stuck-why-chronic-inflammation-is-sabotaging-your-weight-energy-and-skin/` | Exact blog slug |
| `/hormone-imbalance-before-starting-weight-loss/` | `/blogs/signs-of-hormone-imbalance-to-address-before-weight-loss/` | Audit: renamed hormone-imbalance post |
| `/hormone-therapy-in-your-40s-and-50s/` | `/blogs/hormone-therapy-in-your-40s-and-50s/` | Exact blog slug |
| `/hormone-therapy/growth-hormone-optimization/` | `/growth-hormone-optimization/` | Nested hormone child |
| `/hormone-therapy/mens-hormone-therapy/` | `/mens-hormone-therapy/` | Nested men's hormone page |
| `/hormone-therapy/womens-hormone-replacement-therapy/` | `/womens-hormone-therapy/` | Nested women's hormone page |
| `/how-emsella-improves-neuromuscular-control-for-ed/` | `/blogs/how-emsella-improves-neuromuscular-control-for-ed/` | Exact blog slug |
| `/inside-medical-weight-loss-what-actually-happens/` | `/blogs/inside-medical-weight-loss-what-actually-happens/` | Exact blog slug |
| `/medical-weight-loss-in-las-vegas-heat/` | `/blogs/medical-weight-loss-in-las-vegas-heat/` | Exact blog slug |
| `/medical-weight-loss-options-las-vegas/` | `/blogs/medical-weight-loss-options-las-vegas/` | Exact blog slug |
| `/medical-weight-loss-vs-diy-diets/` | `/blogs/medical-weight-loss-vs-diy-diets-in-las-vegas/` | Same article, slug gained -in-las-vegas |
| `/mistakes-avoid-with-medical-weight-loss/` | `/blogs/mistakes-avoid-with-medical-weight-loss/` | Exact blog slug |
| `/performance-anxiety-or-ed-the-hidden-difference-every-man-needs-to-understand-before-choosing-treatment/` | `/blogs/performance-anxiety-or-ed-the-hidden-difference-every-man-needs-to-understand-before-choosing-treatment/` | Exact blog slug |
| `/posts-categories/health/` | `/blogs/` | Legacy post category |
| `/posts-categories/news/` | `/blogs/` | Legacy post category |
| `/prp-hair-restoration-in-las-vegas-natural-results-at-revival-health/` | `/blogs/prp-hair-restoration-in-las-vegas-natural-results-at-revival-health/` | Exact blog slug |
| `/questioning-viagra-consider-ed-alternatives/` | `/blogs/questioning-viagra-consider-ed-alternatives/` | Exact blog slug |
| `/revitalize-your-health-with-vitamin-booster-injections-in-las-vegas/` | `/blogs/revitalize-your-health-with-vitamin-booster-injections-in-las-vegas/` | Exact blog slug |
| `/revival-health-wellness-reigniting-your-vitality-in-las-vegas-nv/` | `/blogs/revival-health-wellness-reigniting-your-vitality-in-las-vegas-nv/` | Exact blog slug |
| `/see-why-the-sexual-medicine-society-of-north-america-advises-avoiding-penile-enhancement-surgery-and-fillers/` | `/blogs/see-why-the-sexual-medicine-society-of-north-america-advises-avoiding-penile-enhancement-surgery-and-fillers/` | Exact blog slug |
| `/self-injection-simplified-a-step-by-step-guide-to-using-trimix-at-home-for-men-in-las-vegas/` | `/blogs/self-injection-simplified-a-step-by-step-guide-to-using-trimix-at-home-for-men-in-las-vegas/` | Exact blog slug |
| `/sexual-wellness-enhancement-services-in-las-vegas/` | `/sexual-wellness/` | Audit: sexual wellness service page |
| `/sexual-wellness-holistic-care/` | `/blogs/sexual-wellness-holistic-care/` | Exact blog slug |
| `/sexual-wellness/men/emsella-for-men/` | `/emsella/` | Nested Emsella page |
| `/sexual-wellness/men/gainswave/` | `/gainswave-tm/` | Nested GAINSWave page |
| `/sexual-wellness/men/p-shot/` | `/p-shot-tm/` | Nested P-Shot page |
| `/sexual-wellness/men/priapus-toxin/` | `/priapus-toxin/` | Nested Priapus Toxin page |
| `/sexual-wellness/men/trimix/` | `/trimix/` | Nested TriMix page |
| `/sexual-wellness/men/viagra-revival-health-and-wellness/` | `/viagra/` | Nested Viagra page |
| `/sexual-wellness/sexual-wellness-for-men/` | `/men/` | Old men's hub |
| `/sexual-wellness/sexual-wellness-for-women/` | `/women/` | Old women's hub |
| `/sexual-wellness/women/emsella-for-women/` | `/emsella/` | Nested Emsella page |
| `/sexual-wellness/women/gainswave-for-her/` | `/gainswavetm-for-her/` | Nested GAINSWave For Her page |
| `/sexual-wellness/women/o-shot/` | `/o-shot-tm/` | Nested O-Shot page |
| `/shockwave-therapy-the-secret-to-a-rock-solid-you/` | `/blogs/shockwave-therapy-the-secret-to-a-rock-solid-you/` | Exact blog slug |
| `/summer-ready-gainswave-for-women/` | `/blogs/summer-ready-gainswave-for-women/` | Exact blog slug |
| `/the-7-signs-its-time-for-medical-weight-loss-support-not-another-diet-that-fails/` | `/blogs/the-7-signs-its-time-for-medical-weight-loss-support-not-another-diet-that-fails/` | Exact blog slug |
| `/the-emotional-triggers-sabotaging-your-weight-loss-and-why-willpower-alone-is-not-the-answer/` | `/blogs/the-emotional-triggers-sabotaging-your-weight-loss-and-why-willpower-alone-is-not-the-answer/` | Exact blog slug |
| `/the-power-of-emsella-strengthening-your-core-for-better-health/` | `/blogs/the-power-of-emsella-strengthening-your-core-for-better-health/` | Exact blog slug |
| `/transform-your-body-fast-how-emsculpt-neo-builds-muscle-and-eliminates-fat-in-30-minutes/` | `/blogs/transform-your-body-fast-how-emsculpt-neo-builds-muscle-and-eliminates-fat-in-30-minutes/` | Exact blog slug |
| `/vitamin-injection-benefits-for-weight-loss/` | `/blogs/vitamin-injection-benefits-for-weight-loss-in-henderson/` | Audit: renamed vitamin-injection post |
| `/weight-loss/glp-1/` | `/glp-1/` | Nested GLP-1 page |
| `/weight-loss/phentermine/` | `/phentermine/` | Nested phentermine page |
| `/weight-loss/semaglutide/` | `/glp-1/` | Semaglutide is the GLP-1 page |
| `/weight-loss/tirzepatide/` | `/glp-1/` | Tirzepatide is covered on the GLP-1 page |
| `/weight-loss/vitamin-booster-injection/` | `/vitamin-injections/` | Nested vitamin injection page |
| `/when-ed-medications-stop-working-why-it-happens-and-what-you-can-do-about-it-in-las-vegas/` | `/blogs/when-ed-medications-stop-working-why-it-happens-and-what-you-can-do-about-it-in-las-vegas/` | Exact blog slug |
| `/why-am-i-always-hungry-even-after-eating/` | `/blogs/why-am-i-always-hungry-even-after-eating/` | Exact blog slug |
| `/why-are-many-men-at-risk-of-ed/` | `/blogs/why-are-many-men-at-risk-of-ed/` | Exact blog slug |
| `/why-men-shouldnt-consider-cosmetic-fillers-for-girth-augmentation/` | `/blogs/why-men-shouldnt-consider-cosmetic-fillers-for-girth-augmentation/` | Exact blog slug |
| `/why-there-are-so-many-horrific-manhood-enlargement-horror-stories/` | `/blogs/why-there-are-so-many-horrific-manhood-enlargement-horror-stories/` | Exact blog slug |
| `/why-your-belly-fat-wont-budge-even-when-you-lose-weight-everywhere-else/` | `/blogs/why-your-belly-fat-wont-budge-even-when-you-lose-weight-everywhere-else/` | Exact blog slug |
| `/youre-working-out-harder-than-ever-so-why-isnt-the-weight-coming-off-the-truth-about-sluggish-metabolism-and-metabolic-resistance/` | `/blogs/youre-working-out-harder-than-ever-so-why-isnt-the-weight-coming-off-the-truth-about-sluggish-metabolism-and-metabolic-resistance/` | Exact blog slug |
| `/zenoti-privacy-policy/` | `/privacy-policy/` | Legacy booking privacy policy |
| `/ed-treatment-roadmap-guide/` | `/blogs/ed-treatment-roadmap-guide/` | Exact blog slug |
| `/iv-hydration-therapy-does-beyond-hangovers/` | `/blogs/iv-hydration-therapy-does-beyond-hangovers/` | Exact blog slug |
| `/unlocking-hormone-therapy-for-stubborn-weight/` | `/blogs/unlocking-hormone-therapy-for-stubborn-weight/` | Exact blog slug |

## Left as 404

These old paths 404 and do not have a single successor. They are not redirected.

- `/author/developer/`
- `/blog-posts/gw-magazine-october-2024/`
- `/sample-page/`
- `/search/`
- `/terms-conditions/`
- `/title/`

