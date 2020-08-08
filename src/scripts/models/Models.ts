function toTypescriptCase(s : string): string{
    let stringArray: string[] = s.split('');

    stringArray.forEach(
        (value, index, array) =>
            array[index] = index - 1 > 0 && array[index - 1] == '_' ? value.toUpperCase() : value);

    return stringArray.filter((value) => value != '_').join('');
}

class Model {
    id !: number;

    constructor(object: any) {
        let keys: string[] = Object.keys(object);
        for (let i = 0; i < keys.length; i++)
            (this as any)[toTypescriptCase(keys[i])] = object[keys[i]];
    }
}

class User extends Model{
    username!: string;
    firstName!: string;
    lastName!: string;
    email!: string;
    email2!: string;
    password!: string;
    isAdmin = false;
}

class Author extends Model {
    institution!: string;
    articles!: Article[];
    ORCID!: number;
}

class Referee extends Model {
    speciality!: string;
    articles!: Article[];
}

class Article extends Model{
    title!: string;
    keywords!: string[];
    mcc!: string;
    startDate!: string;
    endDate!: string;
}
