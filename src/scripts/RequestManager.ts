import axios, {AxiosResponse} from "axios";
import UserManager from "./UserManager";
import {objectToSnakeCase, toSnakeCase} from "@/scripts/Models";
import DataManager from "@/scripts/DataManager";

export default class RequestManager {
    static apiUrl = "http://localhost:8000/revista.cientifica/api/v1/";
    
    static sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static postCreateUser(user: any): void {
        axios.post(this.apiUrl + "user/", objectToSnakeCase(user))
            .then(response => {
                UserManager.setUser(response.data);
            }).catch(reason => {
                console.log(reason);
            });
        
    }

    static getLoginUser(user: any, onResponse?: (r: AxiosResponse<any>) => void): void {
        const url = this.addParamsToUrl(this.apiUrl + 'user/login', user);
        axios.get(url).
            then(response => {
                const data = response.data;
                if (data.correct){
                    UserManager.setUser(data.body);
                    this.getAuthorFromUserId(UserManager.instance.currentUser?.id, onResponse);
                } else console.log(data.body);
        }).
            catch(reason => { /* */});
    }

    static getAuthorFromUserId(userId?: number, onResponse?: (r: AxiosResponse<any>) => void): void{
        if (userId == undefined)
            return;

        const url = this.addParamsToUrl(this.apiUrl + 'author', {'many': false, 'user__id': userId});
        console.log(url);
        axios.get(url)
            .then(response => {
                if (response.data.count == 1) {
                    const data = response.data.results[0];
                    UserManager.instance.authorID = data.id;
                    UserManager.instance.institution = data.institution;
                    UserManager.instance.ORCID = data.ORCID;
                    if (onResponse) onResponse(response);
                }
            }).catch(reason => {/* */})
    }

    // static async getArticleListUtils(list : object[], page: number){
    //     const currentUserId = (UserManager.instance.currentUser == undefined) ? 1 : UserManager.instance.currentUser.id;
    //
    //     await axios.get(this.apiUrl + `participation/?page=${page}`).then(response =>{
    //         if(response.data.next != null){
    //             for (const item of response.data.results) {
    //                 if(item.author.user.id == currentUserId)
    //                     list.push(item.article);
    //             }
    //             this.getArticleListUtils(list, page + 1);
    //         }
    //         else {
    //             for (const item of response.data.results) {
    //                 if (item.author.user.id == 1)
    //                     list.push(item.article);
    //             }
    //         }
    //     })
    //     .catch(reason =>{
    //         console.log(reason);
    //     });
    // }
    //
    // static getArticleList(){
    //     const list: object[] = [];
    //     this.getArticleListUtils(list, 1);
    //     return list;
    // }

    private static addParamsToUrl(url: string, params: any): string{
        const keys = Object.keys(params);

        url += '/?'
        for (let i = 0; i < keys.length; i++)
            url = RequestManager.addParam(url, keys[i], params[keys[i]]);

        return url.endsWith('?') ? url.substr(0, url.length - 1) : url;
    }

    private static addParam(url: string, param: string, value: any): string {
        return value == undefined ? url : url + (url.endsWith('?') ? '' : '&') + `${param}=${value}`
    }
}
