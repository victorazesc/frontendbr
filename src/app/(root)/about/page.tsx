import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre • Frontend BR',
  description: 'Entenda o propósito do Frontend BR e como participar.',
}

export default function AboutPage() {
  return (
    <div className="py-10 px-6 mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Sobre o Frontend BR</h1>
        <p className="text-muted-foreground">
          O Frontend BR é um projeto comunitário e gratuito que reúne vagas de frontend e ferramentas para
          facilitar o encontro entre pessoas e oportunidades.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Como funciona</h2>
        <p>
          Você pode navegar pelas vagas abertas, favoritar oportunidades e, após autenticação, cadastrar vagas da sua
          empresa. Nosso objetivo é manter a experiência simples e transparente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Privacidade e termos</h2>
        <p>
          Levamos sua privacidade a sério. Para detalhes sobre coleta e uso de dados, acesse nossa{' '}
          <Link href="/privacy" className="underline">Política de Privacidade</Link>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-medium">Código aberto</h2>
        <p>
          Este projeto é mantido de forma independente. Sugestões e contribuições são bem-vindas no nosso
          repositório no GitHub.
        </p>
        <p>
          <a href="https://github.com/victorazesc/frontendbr" target="_blank" rel="noreferrer" className="underline">
            Acesse o repositório no GitHub
          </a>
        </p>
      </section>
    </div>
  )
}

