export function getFromStorage(key){
    if(!key){
        return null;
    }

    try {
        const value = localStorage.getItem(key);
        if(value){
            return JSON.parse(value);
        }
        return null;
    }
    catch(_){
        return null;
    }
}
export function setInStorage(key, val){
    if(!key){
        // console.log("setInStorage error: no key");
    }


    try {
        localStorage.setItem(key, JSON.stringify(val));
    }
    catch(err){
        // console.log("setInStorage error:", err);
    }
}