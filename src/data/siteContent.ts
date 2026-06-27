import { useCallback, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  writeBatch,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";
import clothingPlatformImage from "@/assets/projectimg/portfolio-clothing-platform.png";
import auralisMusicImage from "@/assets/projectimg/portfolio-auralis-music.png";
import housePriceImage from "@/assets/projectimg/portfolio-house-price.png";
import studentPerformanceImage from "@/assets/projectimg/portfolio-student-performance.png";
import manishPhoto from "@/assets/teamimg/team-manish.png";
import krishnuPhoto from "@/assets/teamimg/team-krishnu.png";
import { db } from "@/firebase";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: string;
  photoPublicId?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
};

export type PortfolioProject = {
  id: string;
  title: string;
  category: string;
  description?: string;
  result: string;
  grad: "bg-gradient-flag" | "bg-gradient-sunset";
  image?: string;
  imagePublicId?: string;
  githubUrl?: string;
  liveUrl?: string;
};

export type FooterLink = {
  id: string;
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  id: string;
  title: string;
  links: FooterLink[];
};

export type CompanyLinks = {
  linkedinUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  githubUrl?: string;
};

export type SiteContent = {
  team: TeamMember[];
  portfolioProjects: PortfolioProject[];
  footerGroups: FooterLinkGroup[];
  companyLinks: CompanyLinks;
};

export const SITE_CONTENT_STORAGE_KEY = "luxgen-site-content-v1";
const SITE_CONTENT_UPDATED = "luxgen-site-content-updated";

const TEAM_MEMBERS_PATH = ["siteContent", "teamMembers", "members"] as const;
const PROJECTS_PATH = ["siteContent", "projects", "items"] as const;
const COMPANY_LINKS_PATH = ["siteContent", "companyLinks"] as const;

export const defaultSiteContent: SiteContent = {
  team: [
    {
      id: "manish-sahani",
      name: "Manish Sahani",
      role: "Founder & CEO",
      photo: manishPhoto,
      githubUrl: "https://github.com/ma-nees",
    },
    {
      id: "krishnu-gupta",
      name: "Krishnu Gupta",
      role: "CEO & Lead Developer",
      photo: krishnuPhoto,
    },
  ],
  portfolioProjects: [
    {
      id: "clothing-brand-platform",
      title: "Clothing Brand Platform",
      category: "SaaS Platform",
      result: "3x Faster Onboarding",
      grad: "bg-gradient-flag",
      image: clothingPlatformImage,
      githubUrl: "https://github.com/ma-nees/Shibi-Styling",
      liveUrl: "https://shibistyling.netlify.app/",
    },
    {
      id: "auralis-music-platform",
      title: "Auralis Music Platform",
      category: "Music Streaming",
      result: "10K+ Songs Available",
      grad: "bg-gradient-sunset",
      image: auralisMusicImage,
      githubUrl: "https://github.com/ma-nees/Auralis",
      liveUrl: "https://auralis-ten.vercel.app/login",
    },
    {
      id: "house-price-prediction",
      title: "House Price Prediction",
      category: "Real Estate",
      result: "12K+ Predictions Generated",
      grad: "bg-gradient-flag",
      image: housePriceImage,
      githubUrl: "https://github.com/ma-nees/house-price-predictor",
      liveUrl: "https://house-price-predictor-black.vercel.app/",
    },
    {
      id: "student-performance-prediction",
      title: "Student Performance Prediction",
      category: "Machine Learning",
      result: "95%+ Prediction Accuracy",
      grad: "bg-gradient-sunset",
      image: studentPerformanceImage,
      githubUrl: "https://github.com/ma-nees/ML_Project",
    },
  ],
  footerGroups: [
    {
      id: "footer-services",
      title: "Services",
      links: [
        { id: "footer-web-development", label: "Web Development", href: "/#services" },
        { id: "footer-mobile-apps", label: "Mobile Apps", href: "/#services" },
        { id: "footer-ui-ux-design", label: "UI/UX Design", href: "/#services" },
        { id: "footer-cloud-solutions", label: "Cloud Solutions", href: "/#services" },
        { id: "footer-ai-automation", label: "AI & Automation", href: "/#services" },
      ],
    },
    {
      id: "footer-company",
      title: "Company",
      links: [
        { id: "footer-about", label: "About", href: "/#about" },
        { id: "footer-portfolio", label: "Portfolio", href: "/#portfolio" },
        { id: "footer-pricing", label: "Pricing", href: "/#pricing" },
        { id: "footer-blog", label: "Blog", href: "/#contact" },
        { id: "footer-contact", label: "Contact", href: "/#contact" },
      ],
    },
    {
      id: "footer-topics",
      title: "Topics",
      links: [
        { id: "footer-topic-web", label: "Web Development", href: "/#services" },
        { id: "footer-topic-cloud", label: "Cloud Computing", href: "/#services" },
        { id: "footer-topic-ui", label: "UI/UX Design", href: "/#services" },
        { id: "footer-topic-growth", label: "Startup Growth", href: "/#about" },
        { id: "footer-topic-trends", label: "Tech Trends", href: "/#contact" },
      ],
    },
  ],
  companyLinks: {
    linkedinUrl: "",
    facebookUrl: "",
    instagramUrl: "",
    githubUrl: "https://github.com/ma-nees",
  },
};

function sortByOrder<T extends { order?: number; id?: string }>(items: T[]) {
  return [...items].sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

function normalizeTeamMember(id: string, data: DocumentData): TeamMember & { order?: number } {
  return {
    id,
    name: typeof data.name === "string" ? data.name : "",
    role: typeof data.role === "string" ? data.role : "",
    bio: typeof data.bio === "string" ? data.bio : "",
    photo: typeof data.photo === "string" ? data.photo : "",
    photoPublicId: typeof data.photoPublicId === "string" ? data.photoPublicId : "",
    linkedinUrl: typeof data.linkedinUrl === "string" ? data.linkedinUrl : "",
    githubUrl: typeof data.githubUrl === "string" ? data.githubUrl : "",
    twitterUrl: typeof data.twitterUrl === "string" ? data.twitterUrl : "",
    order: typeof data.order === "number" ? data.order : 9999,
  };
}

function normalizeProject(id: string, data: DocumentData): PortfolioProject & { order?: number } {
  return {
    id,
    title: typeof data.title === "string" ? data.title : "",
    category: typeof data.category === "string" ? data.category : "",
    description: typeof data.description === "string" ? data.description : "",
    result: typeof data.result === "string" ? data.result : "",
    grad: data.grad === "bg-gradient-sunset" ? "bg-gradient-sunset" : "bg-gradient-flag",
    image: typeof data.image === "string" ? data.image : "",
    imagePublicId: typeof data.imagePublicId === "string" ? data.imagePublicId : "",
    githubUrl: typeof data.githubUrl === "string" ? data.githubUrl : "",
    liveUrl: typeof data.liveUrl === "string" ? data.liveUrl : "",
    order: typeof data.order === "number" ? data.order : 9999,
  };
}

function normalizeCompanyLinks(content: Partial<CompanyLinks> | null): CompanyLinks {
  return {
    ...defaultSiteContent.companyLinks,
    ...(content ?? {}),
  };
}

function normalizeContent(content: Partial<SiteContent> | null): SiteContent {
  return {
    team: Array.isArray(content?.team) ? content.team : defaultSiteContent.team,
    portfolioProjects: Array.isArray(content?.portfolioProjects)
      ? content.portfolioProjects
      : defaultSiteContent.portfolioProjects,
    footerGroups: Array.isArray(content?.footerGroups)
      ? content.footerGroups
      : defaultSiteContent.footerGroups,
    companyLinks: normalizeCompanyLinks(content?.companyLinks ?? null),
  };
}

function teamMembersCollectionRef() {
  return collection(db, ...TEAM_MEMBERS_PATH);
}

function projectsCollectionRef() {
  return collection(db, ...PROJECTS_PATH);
}

function companyLinksDocRef() {
  return doc(db, ...COMPANY_LINKS_PATH);
}

export function readSiteContent(): SiteContent {
  if (typeof window === "undefined") {
    return defaultSiteContent;
  }

  try {
    const raw = window.localStorage.getItem(SITE_CONTENT_STORAGE_KEY);
    return raw ? normalizeContent(JSON.parse(raw)) : defaultSiteContent;
  } catch {
    return defaultSiteContent;
  }
}

export async function readSiteContentFromFirestore(): Promise<SiteContent> {
  const [teamSnapshot, projectsSnapshot, companySnapshot] = await Promise.all([
    getDocs(teamMembersCollectionRef()),
    getDocs(projectsCollectionRef()),
    getDoc(companyLinksDocRef()),
  ]);

  const team = sortByOrder(
    teamSnapshot.docs.map((document) => normalizeTeamMember(document.id, document.data())),
  );
  const portfolioProjects = sortByOrder(
    projectsSnapshot.docs.map((document) => normalizeProject(document.id, document.data())),
  );

  return {
    team: team.length > 0 ? team : defaultSiteContent.team,
    portfolioProjects:
      portfolioProjects.length > 0 ? portfolioProjects : defaultSiteContent.portfolioProjects,
    footerGroups: defaultSiteContent.footerGroups,
    companyLinks: companySnapshot.exists()
      ? normalizeCompanyLinks(companySnapshot.data() as Partial<CompanyLinks>)
      : defaultSiteContent.companyLinks,
  };
}

export function writeSiteContent(content: SiteContent) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SITE_CONTENT_STORAGE_KEY, JSON.stringify(content));
  window.dispatchEvent(new CustomEvent(SITE_CONTENT_UPDATED));
}

async function replaceCollection<T extends { id: string }>(
  collectionPath: readonly string[],
  items: T[],
  serialize: (item: T, order: number) => Record<string, unknown>,
) {
  const collectionRef = collection(db, ...collectionPath);
  const snapshot = await getDocs(collectionRef);
  const nextIds = new Set(items.map((item) => item.id));
  const batch = writeBatch(db);

  snapshot.docs.forEach((document) => {
    if (!nextIds.has(document.id)) {
      batch.delete(document.ref);
    }
  });

  items.forEach((item, order) => {
    batch.set(doc(db, ...collectionPath, item.id), serialize(item, order), { merge: true });
  });

  await batch.commit();
}

export async function writeSiteContentToFirestore(content: SiteContent) {
  await Promise.all([
    replaceCollection(TEAM_MEMBERS_PATH, content.team, (member, order) => ({
      ...member,
      order,
      updatedAt: serverTimestamp(),
    })),
    replaceCollection(PROJECTS_PATH, content.portfolioProjects, (project, order) => ({
      ...project,
      order,
      updatedAt: serverTimestamp(),
    })),
    setDoc(
      companyLinksDocRef(),
      {
        ...content.companyLinks,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
  ]);

  writeSiteContent(content);
}

export function listenSiteContent(
  onChange: (content: SiteContent) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  let team = defaultSiteContent.team;
  let portfolioProjects = defaultSiteContent.portfolioProjects;
  let companyLinks = defaultSiteContent.companyLinks;

  const emit = () => {
    onChange({
      team,
      portfolioProjects,
      footerGroups: defaultSiteContent.footerGroups,
      companyLinks,
    });
  };

  const unsubscribers = [
    onSnapshot(
      teamMembersCollectionRef(),
      (snapshot) => {
        const nextTeam = sortByOrder(
          snapshot.docs.map((document) => normalizeTeamMember(document.id, document.data())),
        );
        team = nextTeam.length > 0 ? nextTeam : defaultSiteContent.team;
        emit();
      },
      (error) => onError?.(error),
    ),
    onSnapshot(
      projectsCollectionRef(),
      (snapshot) => {
        const nextProjects = sortByOrder(
          snapshot.docs.map((document) => normalizeProject(document.id, document.data())),
        );
        portfolioProjects =
          nextProjects.length > 0 ? nextProjects : defaultSiteContent.portfolioProjects;
        emit();
      },
      (error) => onError?.(error),
    ),
    onSnapshot(
      companyLinksDocRef(),
      (snapshot) => {
        companyLinks = snapshot.exists()
          ? normalizeCompanyLinks(snapshot.data() as Partial<CompanyLinks>)
          : defaultSiteContent.companyLinks;
        emit();
      },
      (error) => onError?.(error),
    ),
  ];

  return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
}

export function resetSiteContent() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SITE_CONTENT_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(SITE_CONTENT_UPDATED));
}

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);

  const refresh = useCallback(() => {
    setContent(readSiteContent());
  }, []);

  const refreshFromFirestore = useCallback(async () => {
    try {
      setContent(await readSiteContentFromFirestore());
    } catch {
      setContent(readSiteContent());
    }
  }, []);

  useEffect(() => {
    refreshFromFirestore();
    const unsubscribe = listenSiteContent(setContent, () => setContent(readSiteContent()));
    window.addEventListener("storage", refresh);
    window.addEventListener(SITE_CONTENT_UPDATED, refresh);
    return () => {
      unsubscribe();
      window.removeEventListener("storage", refresh);
      window.removeEventListener(SITE_CONTENT_UPDATED, refresh);
    };
  }, [refresh, refreshFromFirestore]);

  return {
    content,
    setContent,
    saveContent: writeSiteContentToFirestore,
    resetContent: resetSiteContent,
  };
}

export function createContentId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function createReadableContentId(text: string, fallbackPrefix: string) {
  const clean = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);

  return clean || createContentId(fallbackPrefix);
}
