class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
    };
  }

  analisaRecintos(animal, quantidade) {

    if (!this.animais[animal]) {
      return { erro: "Animal inválido" };
    }


    if (quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const infoAnimal = this.animais[animal];
    const espacoNecessario = quantidade * infoAnimal.tamanho;

    const recintosViaveis = this.recintos
      .filter(recinto => {

        if (!infoAnimal.biomas.includes(recinto.bioma) && recinto.bioma !== 'savana e rio') {
          return false;
        }

        const ocupacaoExistente = recinto.animais.reduce(
          (soma, a) => soma + a.quantidade * a.tamanho,
          0
        );

        let espacoDisponivel = recinto.tamanhoTotal - ocupacaoExistente;


        if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
          espacoDisponivel -= 1;
        }


        if (espacoDisponivel < espacoNecessario) {
          return false;
        }


        if (infoAnimal.carnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
          return false;
        }


        for (const a of recinto.animais) {
          const infoOutroAnimal = this.animais[a.especie];


          if (infoOutroAnimal.especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') {
            return false;
          }


          if (a.especie === 'MACACO' && recinto.animais.length === 1 && quantidade === 1) {
            return false;
          }
        }

        return true;
      })
      .map(recinto => {
        const ocupacaoExistente = recinto.animais.reduce(
          (soma, a) => soma + a.quantidade * a.tamanho,
          0
        );

        let espacoDisponivel = recinto.tamanhoTotal - ocupacaoExistente;


        if (recinto.animais.length > 0 && recinto.animais[0].especie !== animal) {
          espacoDisponivel -= 1; // 1 espaço extra ocupado
        }

        return `Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`;
      });

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }
}

const resultado = new RecintosZoo

console.log(resultado.analisaRecintos('MACACO', 2))

export { RecintosZoo as RecintosZoo };


