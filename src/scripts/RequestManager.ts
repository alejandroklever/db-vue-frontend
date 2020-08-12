import axios from "axios";
import UserManager from "./UserManager";
import {objectToSnakeCase} from "@/scripts/Models";

export default class RequestManager {
    static apiUrl = "http://localhost:8000/revista.cientifica/api/v1/";
    // tipo(get/push)_uso
    static postCreateUser(user: any): void {
        axios.post(this.apiUrl + "user/", objectToSnakeCase(user))
            .then(response => {
                UserManager.setUser(response.data);
            }).catch(reason => {
                console.log(reason);
            });
    }
}
