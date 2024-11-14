// 2) Dado a sequência de Fibonacci,
//  onde se inicia por 0 e 1 e o próximo valor sempre será a soma dos 2 valores anteriores
//  (exemplo: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34...),
//  escreva um programa na linguagem que desejar onde, informado um número,
//  ele calcule a sequência de Fibonacci e retorne uma mensagem
//  avisando se o número informado pertence ou não a sequência.

// IMPORTANTE: Esse número pode ser informado através de qualquer entrada de sua preferência
//             ou pode ser previamente definido no código;
//------------------------------------------------------------------------------


// Abaixo estão declaradas as constantes que serão usadas para iniciar o cálculo.
// Vale ressaltar que os números iniciais da sequência de Fibonacci são: 1, 1, 2, 3, 5, 8...
// Portanto a primeira validação é 0 + 1, e por isso essas constantes foram definidas assim.
// Alterá-las pode prejudicar a execução do código.
const two_behind: number = 0
const behind: number = 1
const controller: number = 0

function isFibonacci(some_number: number, behind: number, two_behind: number, controller: number) {
    console.clear()

    // A função é chamada definido controller como a soma dos dois números anteriores a ele
    controller = behind + two_behind

    if (some_number == controller) {
        // Se o número escolhido pelo usuário for igual ao controller 
        //  (que é a soma dos dois números anteriores), então o número pertence à sequência
        return console.log(`O número informado (${some_number}) PERTENCE à sequência de Fibonacci!`)

    } else if (some_number < controller) {
        // Se o número escolhido pelo usuário for menor do que o controller 
        //  (que é a soma dos dois números anteriores), significa que número escolhido
        //  não atende as regras para pertencer à sequência de Fibonacci.
        return console.log(`O número informado (${some_number}) NÃO PERTENCE à sequência de Fibonacci!`)

    } else {
        // Se o número escolhido não for igual ou menor que o controller
        //  significa que ele pode fazer parte da sequência.
        // Para determinar isso a função atualiza o controller para o próximo número
        // da sequência e chama novamente a si mesma (Recursão) para comparar o número
        // escolhido com o novo valor de controller.

        // Este processo recursivo se repetirá enquanto o número for diferente e maior
        // do que o controller.
        two_behind = behind
        behind = controller
        controller = behind + two_behind
        isFibonacci(some_number, behind, two_behind, controller)
    }
}

// A constante abaixo representa o número a ser verificado, esta pode ser alterada
//  para fins de teste.
const some_number: number = 9

isFibonacci(some_number, two_behind, behind, controller)