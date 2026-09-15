const API_URL =
    'http://localhost:3000/api';

async function signup(
    first_name,
    email,
    password,
    company,
    country_code,
    phone,
) {
    const response =
        await fetch(
            `${API_URL}/auth/signup`,
            {
                method: 'POST',
                headers: {
                    'Content-Type':
                    'application/json'
                },
                body: JSON.stringify({
                    first_name,
                    email,
                    password,
                    company,
                    country_code,
                    phone
                })
            }
        );
        
    return await response.json();
}


async function login(
    email,
    password
) {

    const response =
        await fetch(
            `${API_URL}/auth/login`,
            {
                method:'POST',
                headers:{
                    'Content-Type':
                    'application/json'
                },
                body:JSON.stringify({
                    email,
                    password
                })
            }
        );

    return await response.json();
}

export {
    signup,
    login
};