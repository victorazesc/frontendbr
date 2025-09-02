import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade – Frontend BR',
  description:
    'Saiba como o Frontend BR coleta, utiliza e protege seus dados pessoais em conformidade com a LGPD.',
}

export default function PrivacyPage() {
  const lastUpdate = '02/09/2025'

  return (
    <div className="py-10 px-6 mx-auto">
      <h1 className="text-3xl font-semibold">Política de Privacidade – Frontend BR</h1>
      <p className="text-sm text-muted-foreground mt-2">Última atualização: {lastUpdate}</p>
      <p className="text-sm text-muted-foreground">Responsável pelo site: Victor Azevedo (mantido de forma independente, sem fins comerciais)</p>
      <p className="text-sm text-muted-foreground">Contato: <a className="underline" href="mailto:victorazesc@gmail.com">victorazesc@gmail.com</a></p>

      <div className="my-6 border-t" />

      <p>
        O Frontend BR é um site comunitário e gratuito que funciona como um repositório de vagas de frontend. Nosso
        compromisso é respeitar a sua privacidade e proteger seus dados pessoais em conformidade com a LGPD (Lei Geral
        de Proteção de Dados – Lei nº 13.709/2018).
      </p>

      <div className="my-6 border-t" />

      <section className="space-y-3">
        <h2 className="text-xl font-medium">1) Quais dados coletamos</h2>
        <h3 className="font-medium">1. Autenticação</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Login via GitHub ou Google: nome, e-mail, foto de perfil e ID do provedor.</li>
          <li>Login via e-mail e senha: apenas e-mail e senha (armazenada de forma criptografada).</li>
        </ul>

        <h3 className="font-medium">2. Conteúdo enviado</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>
            Vagas publicadas: título, descrição, empresa (quando informado), link de inscrição e outros dados que você
            inserir.
          </li>
        </ul>

        <h3 className="font-medium">3. Dados técnicos</h3>
        <ul className="list-disc pl-6 space-y-1">
          <li>Endereço IP, navegador, sistema operacional e páginas acessadas (logs básicos de uso para segurança).</li>
        </ul>
      </section>

      <div className="my-6 border-t" />

      <section className="space-y-3">
        <h2 className="text-xl font-medium">2) Para que usamos seus dados</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Permitir que você crie uma conta e acesse o site.</li>
          <li>Permitir que você cadastre e visualize vagas.</li>
          <li>Garantir a segurança do site (prevenir abusos/spam).</li>
          <li>Manter comunicação essencial (ex.: confirmar cadastro, avisar sobre publicação).</li>
        </ul>
        <p>Não usamos seus dados para fins comerciais ou de venda.</p>
      </section>

      <div className="my-6 border-t" />

      <section className="space-y-3">
        <h2 className="text-xl font-medium">3) Cookies</h2>
        <p>Usamos apenas cookies essenciais para manter sua sessão ativa. Não usamos cookies de rastreamento para anúncios.</p>
      </section>

      <div className="my-6 border-t" />

      <section className="space-y-3">
        <h2 className="text-xl font-medium">4) Compartilhamento</h2>
        <p>Seus dados não são vendidos nem compartilhados com terceiros para fins comerciais.</p>
        <p>Somente serviços necessários para funcionamento do site podem processar dados:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>GitHub e Google (quando você usa login social).</li>
          <li>Provedor de hospedagem (infraestrutura).</li>
        </ul>
      </section>

      <div className="my-6 border-t" />

      <section className="space-y-3">
        <h2 className="text-xl font-medium">5) Retenção e exclusão</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Seus dados permanecem enquanto sua conta estiver ativa.</li>
          <li>
            Você pode solicitar a exclusão da sua conta e dados enviando um e-mail para{' '}
            <a className="underline" href="mailto:victorazesc@gmail.com">victorazesc@gmail.com</a>.
          </li>
        </ul>
      </section>

      <div className="my-6 border-t" />

      <section className="space-y-3">
        <h2 className="text-xl font-medium">6) Direitos do titular</h2>
        <p>Você pode, a qualquer momento:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Acessar os dados que temos sobre você.</li>
          <li>Corrigir informações.</li>
          <li>Solicitar exclusão da conta e dados pessoais.</li>
        </ul>
        <p>
          Basta entrar em contato pelo e-mail{' '}
          <a className="underline" href="mailto:victorazesc@gmail.com">victorazesc@gmail.com</a>.
        </p>
      </section>

      <div className="my-6 border-t" />

      <section className="space-y-3">
        <h2 className="text-xl font-medium">7) Alterações nesta Política</h2>
        <p>
          Podemos atualizar esta Política para refletir melhorias no site. Sempre que houver mudança relevante,
          publicaremos aqui com a nova data de atualização.
        </p>
      </section>
    </div>
  )
}

