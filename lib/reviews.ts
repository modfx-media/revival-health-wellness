/**
 * Per-client Google review types + fallback.
 * Fallback quotes are real 5-star Google reviews for Revival Health and
 * Wellness (SW / Cimarron Rd location), pulled from Places API and kept
 * verbatim - used only when the live Places API call fails or is unavailable.
 */
export const googleReviewsMeta = {
  rating: 5, // FALLBACK_RATING - Google's overall rating for this location
  reviewCount: 357, // FALLBACK_REVIEW_COUNT - Google's total, all stars
  fiveStarCount: 4,
  placeId: "ChIJB9rvWybHyIARy0ejb6b9_64",
  reviewsUrl: "https://maps.google.com/?cid=12610076372940048331",
} as const;

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  placeId: string;
  reviewsUrl: string;
};

export const googleReviews: GoogleReview[] = [
  {
    name: "Michelle G",
    rating: 5,
    relativeTime: "2 months ago",
    quote:
      "Been coming here occasionally a few years now. I gotten Botox, B12 shots, Oshot & discussed other treatments. Staff is really great, personable and very organized. I see many men a women here coming in with all sorts of concerns they'd like to address. I never feel embarrassed. So with the Oshot I have noticed a higher drive, sensitivity and more natural lubrication. I have a high drive but it helped me with other issues like getting to the point sooner, I heard it helps with incontinence but I can't speak up about that. I'm currently addressing my hormones as they said they will go more in depth than some doctors so it's worth to see.",
  },
  {
    name: "Christopher Woodin",
    rating: 5,
    relativeTime: "4 weeks ago",
    quote:
      "Radford and the entire team at Revival are awesome to work with. They're extremely knowledgeable and have always provided clear, reassuring answers to every question I've had. They've helped me balance my hormones, improve my overall health, and stay on track with my bloodwork. As a 37 year-old man, knowing where my hormone levels stand and keeping my health optimized are top priorities. Feeling as good as I did when I was a young buck makes me happy every day and the improvements in the gym are definitely a bonus! Radford has gone far above and beyond for me in ways I never expected from a clinic. He has made things happen for me when I genuinely thought they never would, and that level of care and dedication means a lot. I highly recommend this clinic. They truly listen and will attend to every one of your needs. I sincerely appreciate everyone at Revival. You've made a positive difference in my health and have become a great part of my life. Thank you, guys! One more thing I may add is, if you're ever interested in taking Peptides, this clinic will provide you the purest of compounds. Stop waiting and get after it!",
  },
  {
    name: "Jesenia Corrujedo",
    rating: 5,
    relativeTime: "3 months ago",
    quote:
      "This is my first time seeing a healthcare professional who truly cares and takes the time to go over every comprehensive detail regarding my hormones and overall health. Radford and his team have thoroughly explained everything I'm lacking and created a plan tailored to help me feel my best. Although I've only recently started hormone therapy and haven't seen results yet, I already feel confident in the care I'm receiving. It's refreshing to finally find a provider who genuinely cares about their patients and takes the time to educate them. I'm excited to continue this journey and highly recommend Radford and his team to anyone looking for comprehensive hormone and wellness care.",
  },
  {
    name: "Jayna Alameda Obrero",
    rating: 5,
    relativeTime: "2 months ago",
    quote:
      "I had an amazing experience with Radford at Revival health and Wellness! He was friendly, professional, and took the time to explain everything, making me feel comfortable and confident throughout my Botox appointment. I felt like I was in great hands the entire time, and his attention to detail really shows. I'm so happy with my results, they look natural and exactly what I wanted. If you're looking for someone who is knowledgeable, trustworthy, and provides excellent customer service, I highly recommend going to Revival.",
  },
];

/** The only acceptance test for a card or a JSON-LD review. */
export function isFiveStarReview(review: GoogleReview): boolean {
  return review.rating === 5 && review.quote.trim().length > 0 && review.name.trim().length > 0;
}

export const fiveStarReviews = googleReviews.filter(isFiveStarReview);
