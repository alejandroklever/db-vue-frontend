import {Article, objectToCamelCase, toCamelCase, toSnakeCase, User} from "@/scripts/Models";

export default class UserManager {
  private static _instance?: UserManager;

  currentUser?: User;
  userArticles?: Article[];
  isAuthor?: boolean;
  isReferee?: boolean;
  institution?: string;
  ORCID?: number;

  //evitar usar las propiedades directas/ se hace a ytravez del metodo
  //todos estatico, else privado, y para algo especifico
  //realizDOR DE  REQUEST Y MANEJADOR DE USUSARIO 

  // eslint-disable-next-line
  private constructor() {}

  static get instance(): UserManager {
    return UserManager._instance === undefined
      ? (UserManager._instance = new UserManager())
      : UserManager._instance;
  }

  static setUser(data: any): User {
    return this.instance.currentUser = new User(objectToCamelCase(data));
  }
  
}
