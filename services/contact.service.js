const api_base_url = 'http://localhost:3000/api';

import axios from 'axios';

async function findContact(
    linkedinUrl,
    token
){

    try{

        const response =
            await fetch(
                `${api_base_url}/contact/find`,
                {
                    method:'POST',

                    headers:{
                        'Content-Type':
                        'application/json',

                        'auth-token':
                            token
                    },

                    body:
                        JSON.stringify({
                            linkedinUrl
                        })
                }
            );

        return await response.json();

    }
    catch(error){

        console.error(
            error
        );

        return {

            success:false,
            message:
                'Network Error'
        };
    }
}

/* ===========================================
   Unlock Email
=========================================== */

async function unlockEmail(
    linkedinUrl,
    token
) {

    try {

        const response =
            await fetch(
                `${api_base_url}/contact/SingleUnlock`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    },

                    body: JSON.stringify({
                        linkedinUrl
                    })
                }
            );

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: 'Network Error'
        };

    }

}


/* ===========================================
   Unlock Phone
=========================================== */

async function unlockPhone(
    linkedinUrl,
    token
) {

    try {

        const response =
            await fetch(
                `${api_base_url}/contact/dialUnlock`,
                {
                    method: 'POST',

                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token
                    },

                    body: JSON.stringify({
                        linkedinUrl
                    })
                }
            );

        return await response.json();

    } catch (error) {

        console.error(error);

        return {
            success: false,
            message: 'Network Error'
        };

    }

}


export {
    findContact,
    unlockEmail,
    unlockPhone
};
