export const toSnakeCase= (str: string)=> {
    return str.split(/\s+/).join('-').toLowerCase();
}