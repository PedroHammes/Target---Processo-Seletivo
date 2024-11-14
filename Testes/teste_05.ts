// 5) Escreva um programa que inverta os caracteres de um string.

// IMPORTANTE:
// a) Essa string pode ser informada através de qualquer entrada de sua preferência ou pode ser previamente definida no código;
// b) Evite usar funções prontas, como, por exemplo, reverse;
//-----------------------------------------------------------------------------


function wordInverter(word: string): string {
    console.clear()
    // Essa é a variável que irá armazenar a palavra invertida
    let inverted_word: string = ''

    // O laço de repetição abaixo trata a string como um array
    //  começa a iterar pelo seu último índice e armazena o valor deste na variável da palavra invertida
    //  percorre a palavra de trás para frente até chegar na posição zero.
    for (let i = word.length - 1; i >= 0; i--) {
        inverted_word += (word[i])
    }
    return inverted_word
}

const some_word: string = 'Hello world!'
console.log(wordInverter(some_word))