import {Article, objectToCamelCase, toCamelCase, toSnakeCase, User} from "@/scripts/Models";

export default class UserManager {
  private static _instance?: UserManager;

  currentUser?: User;
  userArticles?: Article[];
  isAuthor?: boolean;
  isReferee?: boolean;
  institution?: string;
  ORCID?: number;


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