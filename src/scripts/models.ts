import { toCamelCase } from '@/scripts/tools/name-formating'

export class Model {
    id!: number

    constructor(object: any) {
        const keys: string[] = Object.keys(object)
        for (let i = 0; i < keys.length; i++) {
            // if (object[keys[i]] == null)
            //     (this as any)[toCamelCase(keys[i])] = object[keys[i]]
            (this as any)[toCamelCase(keys[i])] = object[keys[i]]
        }
    }
}

export class User extends Model {
    token?: string
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    isSuperuser!: boolean
    author?: Author | null
    referee?: Referee | null

    get isAuthor(): boolean {
        return this.author != undefined
    }

    get isReferee(): boolean {
        return this.referee != undefined
    }
}

export class Author extends Model {
    institution!: string
    orcid!: number
}

export class Referee extends Model {
    speciality!: string
}

export class Article extends Model {
    title!: string
    keywords!: string[]
    mcc!: string
    startDate!: string
    endDate!: string
}
