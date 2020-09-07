function isLetter(s: string): boolean {
    return (
        s.length == 1 &&
        ((s == s.toUpperCase() && s != s.toLowerCase()) ||
            (s != s.toUpperCase() && s == s.toLowerCase()))
    )
}

export function toCamelCase(s: string): string {
    const stringArray: string[] = s.split('')

    stringArray.forEach(
        (value, index, array) =>
            (array[index] =
                index - 1 > 0 && array[index - 1] == '_'
                    ? value.toUpperCase()
                    : value)
    )

    return stringArray.filter(value => value != '_').join('')
}

export function toSnakeCase(s: string): string {
    const result: string[] = []
    const stringArray: string[] = s.split('')

    stringArray.forEach(value => {
        if (isLetter(s) && value == value.toUpperCase()) result.push('_')
        result.push(value.toLowerCase())
    })

    return result.join('')
}

export function objectToSnakeCase(data: any): any {
    const newData: any = {}
    Object.keys(data).forEach(
        value => (newData[toSnakeCase(value)] = data[value])
    )
    return newData
}

export function objectToCamelCase(data: any): any {
    const newData: any = {}
    Object.keys(data).forEach(
        value => (newData[toCamelCase(value)] = data[value])
    )
    return newData
}