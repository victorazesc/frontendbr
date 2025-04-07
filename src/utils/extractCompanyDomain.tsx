import type { Vacancy } from "@/components/ui/vancancyCard";

export function extractCompanyDomain(vaga: Vacancy): string | null {
  const body = vaga.body || "";

  const ignorar = [
    "youtube.com", "github.com", "linkedin.com", "medium.com", "google.com",
    "webflow.com", "notion.site", "freshteam.com", "storybook.devopness.com",
    "git.io", "bit.ly", "tinyurl.com", "shorturl.at", "t.co"
  ];

  // 1. Tenta extrair domínio de links
  const linkMatches = Array.from(
    body.matchAll(/https?:\/\/([\w\-\.]+\.[a-z]{2,})(?:\/[\S]*)?/gi)
  ).map((m) => m[1]);

  const limparDominio = (dominio: string): string => {
    const partes = dominio.split(".");
    if (partes.length > 2 && partes[-2] === 'com' && partes[-1] === 'br') {
      return partes.slice(-3).join(".");
    } else if (partes.length > 2) {
      return partes.slice(-2).join(".");
    }
    return dominio;
  };

  const dominioLink = linkMatches
    .map(limparDominio)
    .find((d) => !ignorar.includes(d));

  if (dominioLink) return dominioLink;

  // 2. Se não encontrar link, tenta por e-mail
  const emailMatches = Array.from(
    body.matchAll(/[\w\.-]+@([\w\.-]+\.[a-z]{2,})/gi)
  ).map((m) => m[1]);

  const dominioEmail = emailMatches.find(
    (d) => !["gmail.com", "hotmail.com", "yahoo.com", "outlook.com"].includes(d)
  );

  return dominioEmail || null;
}