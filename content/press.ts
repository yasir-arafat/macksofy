export type PressKind = "article" | "video" | "social" | "broadcast";

export interface PressRelease {
  slug: string;
  title: string;
  outlet: string;
  date: string;
  href: string;
  summary: string;
  kind: PressKind;
  featured?: boolean;
}

export const PRESS_RELEASES: PressRelease[] = [
  {
    slug: "midday-2024-ai-assisted-cybercriminals",
    title: "Beating AI-assisted cyber criminals at their own game",
    outlet: "Mid-day",
    date: "2024-07-26",
    href: "https://www.mid-day.com/mumbai/mumbai-crime-news/article/mid-day-45th-anniversary-special-beating-ai-assisted-cyber-criminals-at-their-own-game-23368072",
    summary:
      "Macksofy Technologies featured in Mid-day's 45th anniversary special on how Indian cybersecurity firms are countering AI-augmented attackers.",
    kind: "article",
    featured: true,
  },
  {
    slug: "entrepreneur-ethics-2024-top-10-researchers",
    title: "Top 10 renowned cyber security researchers of India",
    outlet: "Entrepreneur Ethics",
    date: "2024-01-01",
    href: "https://entrepreneurethics.com/top-10-renowned-cyber-security-researchers-of-india-you-must-know-about-in-2023/?amp=1",
    summary:
      "Macksofy founder named among the most influential cyber security researchers in India for contributions to offensive security training and vulnerability research.",
    kind: "article",
    featured: true,
  },
  {
    slug: "midday-2023-loan-app-sharks-pakistan",
    title: "After crackdown in Nepal, loan app sharks move to Pakistan",
    outlet: "Mid-day",
    date: "2023-11-21",
    href: "https://www.mid-day.com/mumbai/mumbai-crime-news/article/after-crackdown-in-nepal-loan-app-sharks-move-to-pakistan-23320931",
    summary:
      "Expert commentary from Macksofy on the cross-border evolution of predatory loan-app rackets and the digital forensics trail investigators follow.",
    kind: "article",
  },
  {
    slug: "abp-news-2022-security-feature",
    title: "ABP News feature on Macksofy Technologies",
    outlet: "ABP News",
    date: "2022-01-12",
    href: "https://twitter.com/abpnews/status/1481314557620781061?s=24&t=zPZe1ke9EKlpvD98OM-Mlg",
    summary:
      "ABP News broadcast highlighting Macksofy's cybersecurity capabilities and incident response work for Indian enterprises.",
    kind: "social",
  },
  {
    slug: "midday-2021-finest-it-company",
    title: "Macksofy Technologies emerges as one of the finest IT companies",
    outlet: "Mid-day",
    date: "2021-09-22",
    href: "https://www.mid-day.com/lifestyle/infotainment/article/macksofy-technologies-emerges-as-one-of-the-finest-information-technology-companies-23193428",
    summary:
      "Profile of Macksofy Technologies' growth in offensive security services and cybersecurity training across India.",
    kind: "article",
  },
  {
    slug: "entrepreneur-stories-2021-online-business",
    title: "Secure your online business with top-notch cybersecurity services",
    outlet: "Entrepreneur Stories",
    date: "2021-08-21",
    href: "https://entrepenuerstories.com/latest/secure-your-online-business-with-macksofy-technologys-top-notch-cyber-security-services-along-with-new-gen-digital-marketing-services/",
    summary:
      "Editorial coverage of Macksofy's full-stack cybersecurity offering aimed at SMB and online-first businesses.",
    kind: "article",
  },
  {
    slug: "cnn-news18-2021-feature",
    title: "CNN News 18 segment on Macksofy Technologies",
    outlet: "CNN News 18",
    date: "2021-06-30",
    href: "https://youtu.be/DUVIs2Mr1Po",
    summary:
      "Televised feature spotlighting Macksofy's cybersecurity services and the founder's work in digital forensics and incident response.",
    kind: "video",
  },
  {
    slug: "dailyhunt-2020-cybersecurity-services",
    title: "Secure your online business with cybersecurity services",
    outlet: "Daily Hunt",
    date: "2020-12-30",
    href: "https://m.dailyhunt.in/news/india/english/the+daily+beat-epaper-dh6ae7922f205548bc994645e1b7a6d8d9/secure+your+online+business+with+macksofy+technology+s+top+notch+cyber+security+services+along+with+new+gen+digital+marketing+services-newsid-dh6ae7922f205548bc994645e1b7a6d8d9_b3ef30f0029611ecb7edd8e73f70285e",
    summary:
      "Daily Hunt coverage of Macksofy's combined cybersecurity and digital marketing services portfolio.",
    kind: "article",
  },
  {
    slug: "midday-2019-sakinaka-software-hack",
    title: "Mumbai crime — software company in Sakinaka hacked",
    outlet: "Mid-day",
    date: "2019-08-07",
    href: "https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-crime--software-company-in-sakinaka-hacked-21494158",
    summary:
      "Expert commentary from Macksofy on a high-profile Mumbai software-company breach and the response playbook for SMB victims.",
    kind: "article",
  },
];

export const PRESS_OUTLETS = Array.from(
  new Set(PRESS_RELEASES.map((p) => p.outlet))
).sort();

export const featuredPress = () => PRESS_RELEASES.filter((p) => p.featured);
