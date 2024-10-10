const generatedNumbers = new Set<string>()

export function generateUniqueFourDigitNumber(): string {
    let number: string

    do {
        number = Math.floor(1000 + Math.random() * 9000).toString()
    } while (generatedNumbers.has(number))

    generatedNumbers.add(number)
    return number
}
