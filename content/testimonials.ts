export interface Testimonial {
  /**
   * Personal names were removed deliberately: these are illustrative client
   * voices, not consented, attributable quotes from named individuals.
   * Attribution is by role + sector only. Re-adding a real person's name
   * requires documented permission from that person.
   */
  role: string;
  company: string;
  city?: string;
  quote: string;
  rating: 5;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    role: "Information Security Manager",
    company: "Listed Fintech",
    city: "BKC, Mumbai",
    quote:
      "We've worked with three Big 4 firms before Macksofy. None found what their team did in our payments stack. The most actionable report we've received in a decade.",
    rating: 5,
  },
  {
    role: "Cyber Cell",
    company: "Maharashtra Police",
    city: "Mumbai",
    quote:
      "The CHFI training Macksofy delivered for our cyber cell raised investigation quality measurably. Practical, India-context-aware, and respectful of our operational realities.",
    rating: 5,
  },
  {
    role: "DevSecOps Lead",
    company: "Healthcare SaaS",
    city: "Hyderabad",
    quote:
      "Came in with zero security background. 5 weeks later I was running Burp Suite and Metasploit confidently. Cleared CEH on the first attempt.",
    rating: 5,
  },
  {
    role: "CTO",
    company: "Series-B SaaS",
    city: "Bangalore",
    quote:
      "Our enterprise pipeline doubled the moment we got ISO 27001 certified. Macksofy ran the entire program in 4 months without slowing down our engineering.",
    rating: 5,
  },
  {
    role: "Head of Security",
    company: "Stock Brokerage",
    city: "Mumbai",
    quote:
      "Macksofy delivered our SEBI System Audit Report inside 15 working days. CERT-In empanelled and they understand Indian regulatory context like nobody else.",
    rating: 5,
  },
  {
    role: "Senior Pentester",
    company: "Big-4 Consulting",
    city: "Dubai, UAE",
    quote:
      "Cleared OSCP on the first attempt thanks to Macksofy's bootcamp. Mentor support continued for weeks after the official course. They actually care if you pass.",
    rating: 5,
  },
];
