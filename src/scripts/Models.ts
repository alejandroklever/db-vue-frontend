export function toCamelCase(s: string): string {
  const stringArray: string[] = s.split("");

  stringArray.forEach(
    (value, index, array) =>
      (array[index] =
        index - 1 > 0 && array[index - 1] == "_" ? value.toUpperCase() : value)
  );

  return stringArray.filter(value => value != "_").join("");
}

export function toSnakeCase(s: string): string {
  const result: string[] = [];
  const stringArray: string[] = s.split("");

  stringArray.forEach(value => {
    if (value === value.toUpperCase()) result.push("_");
    result.push(value.toLowerCase());
  });

  return result.join("");
}

export function objectToSnakeCase(data: any): any {
  const newData: any = {};
  Object.keys(data).forEach(
    value => (newData[toSnakeCase(value)] = data[value])
  );
  return newData;
}

export function objectToCamelCase(data: any): any {
  const newData: any = {};
  Object.keys(data).forEach(
    value => (newData[toCamelCase(value)] = data[value])
  );
  return newData;
}

export class Model {//UN OBJETO CUALQUIERA CON LAS QUE TENGO, SI UNA NO MATCH NO SE PONE, NO le importa a js no explota
  id!: number;

  constructor(object: any) {
    const keys: string[] = Object.keys(object);
    for (let i = 0; i < keys.length; i++)
      (this as any)[toCamelCase(keys[i])] = object[keys[i]];
  }
}

export class User extends Model {
  username!: string;
  firstName!: string;
  lastName!: string;
  email!: string;
  email2!: string;
  password!: string;  
  isSuperuser = false;
}

export class Author extends Model {
  institution!: string;
  ORCID!: number;
}

export class Referee extends Model {
  speciality!: string;
}

export class Article extends Model {
  title!: string;
  keywords!: string[];
  mcc!: string;
  startDate!: string;
  endDate!: string;
}
