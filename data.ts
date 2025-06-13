// nav links
interface NavLink {
  name: string;
  href: string;
}
export const navLinks: NavLink[] = [
  {
    name: "Features",
    href: "/features",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "Privacy",
    href: "/privacy",
  },
];

// chat page utils
export const contentTypes: ContentType[] = [
  "Blog Post",
  "Social Media",
  "Product Description",
  "Email",
  "Ad Copy",
];

export const tones: Tone[] = [
  "Professional",
  "Friendly",
  "Casual",
  "Persuasive",
  "Informative",
];
