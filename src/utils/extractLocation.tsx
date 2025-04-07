type Vaga = {
  title: string;
  body: string;
};

const estados = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

const cidades = [
  "São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Curitiba", "Porto Alegre",
  "Recife", "Salvador", "Fortaleza", "Manaus", "Belém", "Goiânia", "Campinas", "São Luís",
  "Maceió", "Natal", "João Pessoa", "Cuiabá", "Campo Grande", "Teresina", "Aracaju",
  "Palmas", "Vitória", "Florianópolis", "Macapá", "Boa Vista", "Porto Velho", "Rio Branco"
];

const paises = ["Brasil", "Portugal"];

export function extractLocation(vaga: Vaga): string | null {
  const combined = (vaga.title + "\n" + vaga.body).toLowerCase();

  // 1. Busca direta por cidades, estados ou países conhecidos
  const termos = [...cidades, ...estados, ...paises];
  for (const termo of termos) {
    const pattern = new RegExp(`\\b${termo.toLowerCase()}\\b`, "i");
    if (pattern.test(combined)) {
      return termo;
    }
  }

  // 2. Expressões que indicam vaga nacional
  const nacional = [
    "todo o brasil", "vaga nacional", "território nacional", "remoto - brasil",
    "válido em todo o brasil", "para profissionais do brasil"
  ];
  if (nacional.some(exp => combined.includes(exp))) {
    return "Brasil";
  }

  // 3. Expressões que indicam vaga internacional
  const exterior = [
    "vaga internacional", "empresa internacional", "empresa dos eua", "empresa global",
    "trabalhar fora do brasil", "trabalho fora do brasil"
  ];
  if (exterior.some(exp => combined.includes(exp))) {
    return "Exterior";
  }

  // 4. Se falar em remoto mas nada sobre país
  if (combined.includes("remoto")) {
    return "Remoto";
  }

  // 5. Se nada identificado
  return null;
}