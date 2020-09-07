import { Article, User } from '@/scripts/models'
import { objectToCamelCase } from '@/scripts/tools/name-formating'
import RequestManager from '@/scripts/request-manager'

enum State {
    Logged,
    NotLogged
}

export default class DataManager {
    private static _instance?: DataManager
    
    currentUser?: User

    // eslint-disable-next-line
    private constructor() {}

    static get instance(): DataManager {
        return DataManager._instance == undefined ? (DataManager._instance = new DataManager()) : DataManager._instance
    }

    static setUser(data: any): User {
        localStorage.setItem('token', data.token)
        return (this.instance.currentUser = new User(data))
    }

    static get user(): User | undefined {
        return this.instance.currentUser
    }

    static get token(): string | null {
        return localStorage.getItem('token')
    }

    static getUserRequest() {
        RequestManager.getUser({ token: this.token })
    }
}
