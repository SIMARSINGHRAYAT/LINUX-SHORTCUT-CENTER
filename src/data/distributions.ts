export interface Distribution {
  slug: string;
  name: string;
  description: string;
  status: "available" | "coming-soon";
  logo: string;
  color: string;
}

export const distributions: Distribution[] = [
  {
    slug: "ubuntu",
    name: "Ubuntu",
    description: "A popular, enterprise-grade and user-friendly Linux distribution.",
    status: "coming-soon",
    logo: "ubuntu",
    color: "#E95420",
  },
  {
    slug: "debian",
    name: "Debian",
    description: "The universal operating system with unmatched stability and vast repositories.",
    status: "available",
    logo: "debian",
    color: "#D70A53",
  },
  {
    slug: "kali-linux",
    name: "Kali Linux",
    description: "An advanced Linux platform for ethical hacking and penetration testing.",
    status: "coming-soon",
    logo: "kalilinux",
    color: "#557C94",
  },
  {
    slug: "fedora",
    name: "Fedora",
    description: "An innovative, cutting-edge Linux operating system by Red Hat.",
    status: "coming-soon",
    logo: "fedora",
    color: "#51A2DA",
  },
  {
    slug: "linux-mint",
    name: "Linux Mint",
    description: "An elegant, modern, and comfortable desktop operating system.",
    status: "coming-soon",
    logo: "linuxmint",
    color: "#87CF3E",
  },
  {
    slug: "arch-linux",
    name: "Arch Linux",
    description: "A lightweight, flexible, and rolling-release Linux distribution.",
    status: "coming-soon",
    logo: "archlinux",
    color: "#1793D1",
  },
];
