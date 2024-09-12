class RecintosZoo {
  constructor() {
    this.animais = {
      "LEAO": { tamanho: 3, bioma: ["savana"], carnivoro: true },
      "LEOPARDO": { tamanho: 2, bioma: ["savana"], carnivoro: true },
      "CROCODILO": { tamanho: 3, bioma: ["rio"], carnivoro: true },
      "MACACO": { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
      "GAZELA": { tamanho: 2, bioma: ["savana"], carnivoro: false },
      "HIPOPOTAMO": { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false }
    };

    this.recintos = [
      { numero: 1, bioma: "savana", tamanho: 10, animais: [{ especie: "MACACO", quantidade: 3 }] },
      { numero: 2, bioma: "floresta", tamanho: 5, animais: [] },
      { numero: 3, bioma: "savana e rio", tamanho: 7, animais: [{ especie: "GAZELA", quantidade: 1 }] },
      { numero: 4, bioma: "rio", tamanho: 8, animais: [] },
      { numero: 5, bioma: "savana", tamanho: 9, animais: [{ especie: "LEAO", quantidade: 1 }] }
    ];
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }

    if (isNaN(quantidade) || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const especie = this.animais[animal];
    const tamanhoTotal = especie.tamanho * quantidade;

    let recintosViaveis = [];

    for (const recinto of this.recintos) {
      let espacoUsado = 0;
      let carnivoroPresente = false;
      let outraEspeciePresente = false;

      for (const animalPresente of recinto.animais) {
        const especiePresente = this.animais[animalPresente.especie];
        espacoUsado += especiePresente.tamanho * animalPresente.quantidade;
      }

      if (!especie.bioma.includes(recinto.bioma) && !(especie.bioma.includes("savana") && recinto.bioma === "savana e rio")) {
        continue;
      }

      if (recinto.animais.some(a => this.animais[a.especie].carnivoro) && !especie.carnivoro && recinto.animais.length > 0 && recinto.animais.some(a => a.especie !== animal)) {
        continue;
      }

      if (animal === "MACACO" && quantidade === 1 && recinto.animais.length === 0) {
        continue;
      }

      let espacoExtra = (recinto.animais.length > 0 && animal !== recinto.animais[0].especie) ? 1 : 0;
      let espacoRestante = recinto.tamanho - espacoUsado - espacoExtra - tamanhoTotal;

      if (espacoRestante >= 0) {
        recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoRestante} total: ${recinto.tamanho})`);
      }
    }

    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

export { RecintosZoo as RecintosZoo };
