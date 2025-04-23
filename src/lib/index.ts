const urlList = (await import(`./urls.txt?raw`)).default;

function generateId() {
    const ran = `${crypto.randomUUID()}`.replaceAll('-','').substring(0,6);
    return ran;
}

export async function getValue(id: string, db: KVNamespace): Promise<string> {
    const res = await db.get(id);
    if(!res) {
        return Promise.reject('key not found');
    }
    return res;
}

export async function setValue(url: string, db: KVNamespace): Promise<string> {
    if (!URL.canParse(url)) {
        return Promise.reject('invalid url');
    }
    let id = generateId();
    while (true) {
        try {
            // If getValue succeeds, it means the id is taken.
            await getValue(id, db);
            id = generateId();
        } catch (err) {
            // If getValue throws an error, the key was not found.
            break;
        }
    }
    await db.put(id, url);
    return id;
}

export function isFlagged(url: string) {
    const urls = urlList.split('\n');
    const urlSet = new Set(urls);
    if(!URL.canParse(url)) return false;
    const hostname = new URL(url).hostname;
    return urlSet.has(hostname);
}