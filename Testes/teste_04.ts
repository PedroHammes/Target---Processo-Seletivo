// 4) Dado o valor de faturamento mensal de uma distribuidora, detalhado por estado:
// • SP – R$67.836,43
// • RJ – R$36.678,66
// • MG – R$29.229,88
// • ES – R$27.165,48
// • Outros – R$19.849,53

// Escreva um programa na linguagem que desejar onde calcule o percentual de representação
// que cada estado teve dentro do valor total mensal da distribuidora. 
//------------------------------------------------------------------------------

// A interface abaixo define uma estrutura padrão para armazenar informações de uma filial
interface IBillingByState {
    state: string,
    billing: number
}

// A contante abaixo armazena informações das filiais usando uma interface para padronizar os registros
const billing_by_state: IBillingByState[] = [
    {state: 'SP', billing: 67836.43},
    {state: 'RJ', billing: 36678.66},
    {state: 'MG', billing: 29229.88},
    {state: 'ES', billing: 27165.48},
    {state: 'Outros', billing: 19849.53}
]

// Esta função se encarrega de converter os valores numéricos de faturamento para o padrão monetário do Brasil
function billingToBRL(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

function percentageOfRepresentationByState(data: IBillingByState[]) {
    console.clear()

    // Calcula o faturamento total da companhia somando o faturamento de todas as filiais
    const total_billing = data.reduce((sum: number, distributor: IBillingByState) =>  sum + distributor.billing, 0)
    
    console.log(`O faturamento total da compania no período foi de ${billingToBRL(total_billing)}\n`+
                `Abaixo a representação de cada estado neste resultado:\n`)

    let formated_message: string = ''
    let percentage: number = 0

    // Percorre o array de filiais e para cada uma calcula sua participação e
    // incrementa estes dados na variável responsável por armazenar as informações. 
    for (let filial = 0; filial < data.length; filial++) {
        let percentage = ((data[filial].billing / total_billing)*100).toFixed(2)
        formated_message += `${data[filial].state} representa ${percentage}% do total - ${billingToBRL(data[filial].billing)} / ${billingToBRL(total_billing)}\n`
    }

    // Exibe os dados formatados.
    console.log(formated_message)
}

percentageOfRepresentationByState(billing_by_state)