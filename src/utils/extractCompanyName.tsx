type Vaga = {
  title: string
  body: string
}

export function extractCompanyName(vaga: Vaga): string | null {
  const title = vaga.title?.trim() || ''
  const body = vaga.body || ''

  // Domínios válidos (usado no fallback final - heurística 9)
  const matches = Array.from(
    body.matchAll(/https?:\/\/(?:([\w\-]+)\.)?([\w\-]+)\.com(?:\.br)?/gi)
  )

  const ignorar = ['youtube', 'github', 'storybook', 'linkedin', 'medium', 'google', 'freshteam', 'notion', 'webflow']

  const dominiosValidos = matches
    .map(([, sub, domain]) => {
      const subLower = sub?.toLowerCase() || ''
      const domainLower = domain.toLowerCase()

      const validSub = subLower !== 'www' ? subLower : ''

      if (!ignorar.includes(domainLower) && !ignorar.includes(validSub)) {
        return domainLower
      }

      if (ignorar.includes(domainLower) && validSub && !ignorar.includes(validSub)) {
        return validSub
      }

      return null
    })
    .filter((name): name is string => !!name)


  const blacklist = ['descrição da vaga', 'responsabilidades', 'requisitos', 'projeto']
  const semanticaProibida = [
    'remoto',
    'clt',
    'pj',
    'vaga',
    'home office',
    'pleno',
    'júnior',
    'sênior',
    '100%',
    'desenvolvedor',
    'developer',
    'engenheiro',
    'estágio',
    'obrigatório',
    'diferenciais',
    'projeto',
    'desafio',
    'carreira',
  ]

  // 0.a Empresa antes do "|"
  const matchInicio = title.match(/^\[?[\w\s]*\]?\s*([\w\s&\-\.]{2,40})\s+\|/)
  if (matchInicio) {
    const candidato = matchInicio[1].trim()
    if (
      candidato &&
      candidato.split(' ').length <= 4 &&
      !blacklist.some(b => candidato.toLowerCase().includes(b))
    ) {
      return candidato
    }
  }

  // 0. Empresa após o último hífen (mais robusto)
  const matchFinal = title.match(/-\s*([A-Z][\w\s\-]{2,40})$/)
  if (matchFinal) {
    const candidato = matchFinal[1].trim()
    const candidatoLower = candidato.toLowerCase()
    if (
      candidato &&
      candidato.split(' ').length <= 4 &&
      !['react', 'php', 'laravel', 'mysql', 'typescript', 'developer', 'engineer', 'frontend', 'back-end', 'front-end']
        .some(term => candidatoLower.includes(term))
    ) {
      return candidato
    }
  }

  // 1. "na [Empresa]" com colchetes
  const matchColchetes = title.match(/na\s+\[([\w\s\.\-]+)\]/i)
  if (matchColchetes) return matchColchetes[1].trim()

  // 2. "na Empresa"
  const matchNa = [...title.matchAll(/\bna\s+([A-Z][\w\-]*(?:\s+[A-Z][\w\-]*){0,3})/g)]
  if (matchNa.length > 0) {
    const empresa = matchNa[matchNa.length - 1][1].trim()
    if (empresa) return empresa
  }

  // 3. "no Empresa"
  const matchNo = title.match(/no\s+([\w\s\.\-]+)/i)
  if (matchNo && matchNo[1].split(' ').length <= 4) return matchNo[1].trim()

  // 4. "on Empresa"
  const matchOn = title.match(/on\s+([\w\-]+)/i)
  if (matchOn) return matchOn[1].trim()

  // 5. "at Empresa"
  const matchAt = title.match(/at\s+([\w\-]+)/i)
  if (matchAt) return matchAt[1].trim()

  // 6. (REMOVIDO - domínio agora é usado só no final)

  // 7. Seção "Nossa empresa"
  const lowerBody = body.toLowerCase()
  if (lowerBody.includes('nossa empresa')) {
    const linhas = body.split('\n')
    const index = linhas.findIndex(l => l.toLowerCase().includes('nossa empresa'))
    if (index !== -1) {
      for (let i = index + 1; i < linhas.length; i++) {
        const linhaOriginal = linhas[i]
        const nome = linhaOriginal.replace(/[*#\-•]/g, '').trim()
        const nomeLower = nome.toLowerCase()

        const palavras = nome.trim().split(/\s+/)
        const palavrasMinusculas = palavras.filter(p => /^[a-zçáéíóúâêôãõ]/.test(p))
        const maioriaComInicialMaiuscula = palavras.filter(p => /^[A-ZÁÉÍÓÚÂÊÔÃÕÄËÏÖÜ]/.test(p)).length >= Math.ceil(palavras.length * 0.7)

        if (
          nome &&
          nome.length > 2 &&
          nome.length < 50 &&
          !nomeLower.startsWith('somos') &&
          palavras.length <= 4 &&
          !blacklist.includes(nomeLower) &&
          !semanticaProibida.some(term => nomeLower.includes(term)) &&
          !/^[#\-•]/.test(linhaOriginal.trim()) &&
          !linhaOriginal.includes(';') &&
          maioriaComInicialMaiuscula &&
          palavrasMinusculas.length <= 1 && // 👈 ignora frases descritivas
          !nomeLower.includes('equipe') &&
          !nomeLower.includes('brasil') &&
          !nomeLower.includes('irlanda')
        ) {
          return nome
        }
      }
    }
  }

  // 8. Frase "aqui no [Empresa]" ou "no [Empresa]" no corpo
  const matchNoEmpresa = [...body.matchAll(/(?:aqui\s+)?no\s+([A-Z][\w\-]*(?:\s+[A-Z][\w\-]*){0,3})/g)]
  if (matchNoEmpresa.length > 0) {
    const candidato = matchNoEmpresa[matchNoEmpresa.length - 1][1].trim()
    const candidatoLower = candidato.toLowerCase()
    if (
      candidato &&
      candidato.split(' ').length <= 4 &&
      !candidatoLower.startsWith('nosso') &&
      !semanticaProibida.some(term => candidatoLower.includes(term)) &&
      !blacklist.includes(candidatoLower) &&
      !['brasil', 'irlanda', 'time', 'equipe', 'local'].includes(candidatoLower)
    ) {
      return candidato
    }
  }

  // 9. Fallback: domínio único válido
  const dominioUnico = [...new Set(dominiosValidos)]
  if (dominioUnico.length === 1) {
    const nome = dominioUnico[0]
    return nome[0].toUpperCase() + nome.slice(1)
  }

  // 10. Empresa descrita como "X é uma empresa/fábrica/startup/etc"
  const matchDescricao = body.match(/^([\w\s&\-]+?)\s+é uma\s+(empresa|fábrica|consultoria|startup)/im)
  if (matchDescricao) {
    const empresa = matchDescricao[1].trim()
    if (
      empresa &&
      empresa.length <= 40 &&
      empresa.split(' ').length <= 5 &&
      !semanticaProibida.includes(empresa.toLowerCase())
    ) {
      return empresa
    }
  }

  return null
}