export function extractApplyInfo(text: string): string | null {
  if (!text) return null;

  const emailRegex = /[\w\.-]+@[\w\.-]+\.\w+/gi;
  const linhas = text.split('\n').map(l => l.trim()).filter(Boolean);

  const keywordContexts = [
    "candidatar", "inscreva", "apply", "trabalhe", "enviar currículo",
    "nosso site", "formulário", "inscrição", "acessar", "clique aqui"
  ];

  // 1. Link com contexto relevante na mesma linha
  for (const linha of linhas) {
    const temContexto = keywordContexts.some(k => linha.toLowerCase().includes(k));
    const linkMatch = linha.match(/https?:\/\/[^\s\)\]\"]+/gi);
    if (temContexto && linkMatch) return linkMatch[0];
  }

  // 2. Links conhecidos (mesmo sem contexto)
  const fallbackDomains = [
    "totvs.app", "devopness.com", "btgpactual.com", "notion.site", "google.com/forms", "ashbyhq.com", "jobs.lever.co"
  ];
  const allLinks = Array.from(text.matchAll(/https?:\/\/[^\s\)\]\"]+/gi)).map(m => m[0]);
  const known = allLinks.find(link => fallbackDomains.some(domain => link.includes(domain)));
  if (known) return known;

  // 3. E-mail como fallback
  const emails = text.match(emailRegex);
  if (emails && emails.length > 0) return `mailto:${emails[0]}`;

  return null;
}