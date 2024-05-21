interface Pool {
    [key: string]: any
}

let sessionPool: Pool = {}

function addSession(pool: Pool, key: string, value: any) {
    pool[key] = value
}
function getSession(pool: Pool, key: string) {
    return pool[key]
}

addSession(sessionPool, "ok", 1)
addSession(sessionPool, "" + undefined, 1)
console.log(sessionPool);
console.log(sessionPool["hello"]);