import axios from "axios";
import UserManager from "./UserManager";
import {objectToSnakeCase, objectToCamelCase, Article, toSnakeCase} from "@/scripts/Models";
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

    static getLoginUser(user: any): void {
        const url = this.addParamsToUrl(this.apiUrl + 'user/login', ['username', 'email', 'password'], user);
        axios.get(url).
            then(response => {
                const data = response.data;
                if (data.correct){
                    UserManager.setUser(data.body);
                    this.getAuthorFromUserId(UserManager.instance.currentUser?.id);
                } else {
                    console.log(data.body)
                }
            }).
            catch(reason => { /* */});
    }

    static getAuthorFromUserId(userId?: number): void {
        if (userId == undefined)
            return;

        const url = this.addParamsToUrl(this.apiUrl + 'author', ['userId'], {'userId': userId});
        axios.get(url)
            .then(response => {
                console.log(response.data);
                UserManager.instance.authorID = response.data.body.id;
                UserManager.instance.institution = response.data.body.institution;
                UserManager.instance.ORCID = response.data.body.ORCID;

                console.log(UserManager.instance)
            }).catch(reason => {/* */})
    }

    static async getArticleListUtils(list : object[], page: number){
        const currentUserId = (UserManager.instance.currentUser == undefined) ? 1 : UserManager.instance.currentUser.id;

        await axios.get(this.apiUrl + `participation/?page=${page}`).then(response =>{
            if(response.data.next != null){
                for (const item of response.data.results) {
                    if(item.author.user.id == currentUserId)
                        list.push(item.article);
                }
                this.getArticleListUtils(list, page + 1);
            }
            else {
                for (const item of response.data.results) {
                    if (item.author.user.id == 1)
                        list.push(item.article);
                }
            }
        })
        .catch(reason =>{
            console.log(reason);
        });
    }

    static getArticleList(){
        const list: object[] = [];
        this.getArticleListUtils(list, 1);
        return list;
    }

    private static addParamsToUrl(url: string, params: string[], obj: any): string{
        const keys = Object.keys(obj);

        url += '/?'
        for (let i = 0; i < keys.length; i++)
            url = RequestManager.addParam(url, keys[i], obj[keys[i]]);

        return url.endsWith('?') ? url.substr(0, url.length - 1) : url;
    }

    private static addParam(url: string, param: string, value: any): string {
        return value == undefined ? url : url + (!url.endsWith('?')? '&' : '') + `${toSnakeCase(param)}=${value}`
    }
}
