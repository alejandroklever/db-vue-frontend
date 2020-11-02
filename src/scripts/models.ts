import { toCamelCase } from '@/scripts/tools/name-formating'

export class Model {
    id!: number

    constructor(object: any) {
        const keys: string[] = Object.keys(object)
        for (let i = 0; i < keys.length; i++) (this as any)[toCamelCase(keys[i])] = object[keys[i]]
        this.constructSpecialFields(object)
    }

    protected constructSpecialFields(object: any) {
        /**/
    }
}

export class Author extends Model {
    institution!: string
    orcid!: number
}

export class Referee extends Model {
    specialities!: string[]
}

export class User extends Model {
    token?: string
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    isSuperuser?: boolean
    author?: Author | null
    referee?: Referee | null

    get isAuthor(): boolean {
        return this.author != undefined
    }

    get isReferee(): boolean {
        return this.referee != undefined
    }

    protected constructSpecialFields(object: any) {
        if (object.author) this.author = new Author(object.author)
        if (object.referee) this.referee = new Referee(object.referee)
    }
}

export class Article extends Model {
    title!: string
    keywords!: string[]
    evaluation!: string
    mcc!: string
    submitDate !: Date
    endDate!: string
    authors!: Author[]

    protected constructSpecialFields(object: any) {
        if (object.authors)
            for (let i = 0; i < object.authors.length; i++) this.authors[i] = new Author(object.authors[i])
    }

    static titleCompare(a: Article, b: Article): number {
        return a.title.localeCompare(b.title)
    }

    static evaluationCompare(a: Article, b: Article): number {
        return a.title.localeCompare(a.title)
    }

    static submitDateCompare(a: Article, b: Article): number {
        return a.title.localeCompare(a.title)
    }

    static endDateCompare(a: Article, b: Article): number {
        return a.title.localeCompare(a.title)
    }
}
