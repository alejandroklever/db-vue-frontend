import axios from "axios";
import UserManager from "./UserManager";
import {objectToSnakeCase, objectToCamelCase, Article} from "@/scripts/Models";

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
        });
    }
    static getArticleList(){
        const list: object[] = [];
        this.getArticleListUtils(list, 1);
        console.log(list);
        return list;
    }

}
