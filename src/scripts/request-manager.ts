import axios, { AxiosResponse } from 'axios'
import DataManager from '@/scripts/data-manager'

type OnResponse = (r: AxiosResponse) => void
type OnCatch = (r: any) => void

export default class RequestManager {
    static apiUrl = 'http://localhost:8000/revista.cientifica/api/v1/'

    static postCreateUser(user: any, onResponse?: OnResponse, onCatch?: OnCatch): void {
        axios
            .post(this.apiUrl + 'user/', user)
            .then(response => onResponse?.(response))
            .catch(reason => onCatch?.(reason))
    }

    static postLoginUser(user: any, onResponse?: OnResponse, onCatch?: OnCatch): void {
        axios
            .post(this.apiUrl + 'auth/', user)
            .then(response => onResponse?.(response))
            .catch(reason => onCatch?.(reason))
    }

    static getUser(params: any, onResponse?: OnResponse, onCatch?: OnCatch): void {
        const url = this.addParamsToUrl(this.apiUrl + 'user', params)
        axios
            .get(url)
            .then(response => onResponse?.(response))
            .catch(reason => onCatch?.(reason))
    }

    static getUserFromToken(key: string, onResponse?: OnResponse, onCatch?: OnCatch) {
        const url = this.apiUrl + `token/${key}/`
        axios
            .get(url)
            .then(response => onResponse?.(response))
            .catch(reason => onCatch?.(reason))
    }

    private static addParamsToUrl(url: string, params: any): string {
        const keys = Object.keys(params)

        url += '/?'
        for (let i = 0; i < keys.length; i++) url = RequestManager.addParam(url, keys[i], params[keys[i]])

        return url.endsWith('?') ? url.substr(0, url.length - 1) : url
    }

    private static addParam(url: string, param: string, value: any): string {
        return value == undefined ? url : url + (url.endsWith('?') ? '' : '&') + `${param}=${value}`
    }
}
