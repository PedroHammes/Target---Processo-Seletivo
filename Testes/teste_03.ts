// 3) Dado um vetor que guarda o valor de faturamento diário de uma distribuidora, 
//    faça um programa, na linguagem que desejar, que calcule e retorne:
// • O menor valor de faturamento ocorrido em um dia do mês;
// • O maior valor de faturamento ocorrido em um dia do mês;
// • Número de dias no mês em que o valor de faturamento diário foi superior à média mensal.
// IMPORTANTE:
// a) Usar o json ou xml disponível como fonte dos dados do faturamento mensal;
// b) Podem existir dias sem faturamento, como nos finais de semana e feriados. Estes dias devem ser ignorados no cálculo da média;
//------------------------------------------------------------------------------

//  Uso o módulo fs do Node.js para carregar o arquivo que contém os dados para dentro da variável jsonData convertido para o formato utf8
import * as fs from 'fs'
const jsonData = fs.readFileSync('./dados.json', 'utf8')

// Define uma interface padrão para armazenar os registros de faturamento diário
interface IData {
    dia: number,
    valor: number
}

// No código abaixo cada dado da variável jsonData é armazenado na variável data
//  no formato IData
const data_list: IData[] = JSON.parse(jsonData)

// Esta função se encarrega de converter os valores numéricos de faturamento para o padrão monetário do Brasil
function billingToBRL(value: number): string {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

// Esta função é responsável por organizar os dados por ordem crescente de faturamento
function sortRecords(data_list: IData[]): IData[] {
    const ordered_records = data_list.sort((a, b) => a.valor - b.valor)
    return ordered_records
}

// Esta função é responsável por filtrar os dados, mantento no array somente os
//  registros de dias úteis e retornando estes ordenados.
function businessDayData(data_list: IData[]): IData[] {
    console.clear()
    let business_day_billing: IData[] = data_list.filter(record => record.valor > 0)
    business_day_billing = sortRecords(business_day_billing)
    return business_day_billing
}


//  Função usada para encontrar o dia de maior faturamento
function highestBilling(data_list: IData[]) {

    // Armazena os dados por ordem cresente de faturamento
    const ordered_records = sortRecords(data_list)

    // Seleciona o valor e número do dia de maior faturamento
    const highest: number = ordered_records[ordered_records.length - 1].valor
    const day: number = ordered_records[ordered_records.length - 1].dia

    console.log(`O MAIOR FATURAMENTO do período foi de ${billingToBRL(highest)} no dia ${day}`)
}

//  Função usada para encontrar o dia de menor faturamento
function lowestBilling(data_list: IData[]) {

    // Armazena os dados por ordem cresente de faturamento
    const ordered_records = sortRecords(data_list)

    // Seleciona o valor e número do dia de menor faturamento
    let lowest: number = ordered_records[0].valor
    let day: number = ordered_records[0].dia

    // Seleciona o valor e número do DIA ÚTIL de menor faturamento
    const filtered_business_days = businessDayData(data_list)
    let second_lowest: number = filtered_business_days[0].valor
    let second_day: number  = filtered_business_days[0].dia


    console.log(`O MENOR FATURAMENTO do período foi de ${billingToBRL(lowest)} no dia ${day}\n`+
                `O MENOR FATURAMENTO (excluindo fins de semana) foi de ${billingToBRL(second_lowest)} no dia ${second_day}\n`)
}

//  Função usada para contar a quantidade de dias com faturamento acima da média
function countDaysAboveAverage(data_list: IData[]) {

    // Exclui os finais de semana e feriado
    const filtered_business_days = businessDayData(data_list)
    
    // Calcula o faturamento total dos dias úteis
    const total_billing: number = filtered_business_days.reduce((sum: number, record: IData) => sum + record.valor, 0)

    // Calcula o faturamento médio por dia
    const average_billing: number = total_billing/filtered_business_days.length

    // Conta quantos dias úteis apresentam um faturamento acima da média
    const days_above_average: IData[] = filtered_business_days.filter(record => record.valor > average_billing)

    console.log(`Total de dias no período com faturamento acima da média: ${days_above_average.length}\n`)
}

//  CHAMADA DAS FUNÇÕES ABAIXO:
//  Chame uma de cada vez.

// highestBilling(data_list)
// lowestBilling(data_list)
// countDaysAboveAverage(data_list)