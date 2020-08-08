import UserModel from "@/scripts/models/Models";

export default class DataManager {
    private static _instance?: DataManager;

    message = 'Hello';
    currentUser!: UserModel;

    // eslint-disable-next-line
    private constructor() { }

    static get instance(): DataManager {
        return DataManager._instance === undefined ? DataManager._instance = new DataManager(): DataManager._instance;
    }
}
