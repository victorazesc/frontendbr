type Vaga = {
    title: string;
    body: string;
  };
  
  export function hasSalaryInfo(vaga: Vaga): boolean {
    const body = vaga.body?.toLowerCase() || "";
  
    const palavrasChave = [
      "salário",
      "salario",
      "remuneração",
      "remuneracao",
      "r$",
      "a partir de",
      "faixa salarial",
      "ganhos",
      "pj r$",
      "clt r$",
      "8k",
      "10k",
      "mil reais",
    ];
    
    return palavrasChave.some((termo) => body.includes(termo));
  }