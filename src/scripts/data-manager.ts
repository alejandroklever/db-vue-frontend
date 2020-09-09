import { User } from '@/scripts/models'
import RequestManager from '@/scripts/request-manager'

enum State {
    Logged,
    NotLogged,
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
        if (!this.token)
            if (data.token) localStorage.setItem('token', data.token)
            else return new User({})
        return (this.instance.currentUser = new User(data))
    }

    static get user(): User | undefined {
        return this.instance.currentUser
    }

    static get token(): string | null {
        return localStorage.getItem('token')
    }

    static getUserRequest() {
        RequestManager.getUser({ token: this.token }, undefined, r => console.log(r))
    }
}
