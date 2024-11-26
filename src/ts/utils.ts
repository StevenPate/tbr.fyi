export function slugify(string:string){
    return string.toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/-+/g, '-')
}