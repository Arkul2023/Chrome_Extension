async function setToken(
    token
){

    await chrome.storage.local.set({

        authToken:token

    });
}

async function getToken(){

    const data =
        await chrome.storage.local.get(
            ['authToken']
        );

    return data.authToken;
}

async function clearToken(){

    await chrome.storage.local.remove(
        ['authToken']
    );
}

async function setUser(
    user
){

    await chrome.storage.local.set({

        user:user

    });
}

async function getUser(){

    const data =
        await chrome.storage.local.get(
            ['user']
        );

    return data.user;
}

export {

    setToken,

    getToken,

    clearToken,

    setUser,

    getUser
};