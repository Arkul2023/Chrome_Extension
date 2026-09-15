chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {

        switch (request.action) {

            case 'login':

                fetch(
                    'http://localhost:3000/api/auth/login',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body: JSON.stringify({
                            email: request.email,
                            password: request.password
                        })
                    }
                )
                    .then(r => r.json())
                    .then(data => {

                        if (data.success && data.authtoken) {

                            chrome.storage.local.set(
                                {
                                    authToken: data.authtoken
                                },
                                () => {
                                    console.log("Token saved:", data.authtoken);
                                }
                            );

                        }
                        sendResponse(data)

                    })
                    .catch(error =>
                        sendResponse({
                            success: false,
                            error: error.message
                        })
                    );

                return true;

            case 'signup':

                fetch(
                    'http://localhost:3000/api/auth/signup',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type':
                                'application/json'
                        },
                        body: JSON.stringify({
                            first_name:
                                request.first_name,
                            email:
                                request.email,
                            password:
                                request.password,
                            company:
                                request.company,
                            country_code:
                                request.country_code,
                            phone:
                                request.phone
                        })
                    }
                )
                    .then(r => r.json())
                    .then(data => sendResponse(data))
                    .catch(error =>
                        sendResponse({
                            success: false,
                            error: error.message
                        })
                    );

                return true;

            case 'findContact':

                chrome.storage.local.get(null, function (result) {

                    console.log("Storage:", result);

                    fetch(
                        "http://localhost:3000/api/contacts/find",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": result.authToken
                            },
                            body: JSON.stringify({
                                linkedinUrl: request.linkedinUrl
                            })
                        }
                    )
                        .then(r => r.json())
                        .then(data => sendResponse(data));

                });

                return true;

            // case 'findContact':

            //     chrome.storage.local.get(["authToken"], function (result) {
            //         console.log("Token from storage:", result.authToken);

            //         fetch(
            //             'http://localhost:3000/api/Contacts/find',
            //             {
            //                 method: 'POST',
            //                 headers: {
            //                     'Content-Type':
            //                         'application/json',
            //                     'auth-token': result.authToken
            //                 },
            //                 body: JSON.stringify({
            //                     linkedinUrl:
            //                         request.linkedinUrl
            //                 })
            //             }
            //         )
            //             .then(r => r.json())
            //             .then(data => sendResponse(data))
            //             .catch(error =>
            //                 sendResponse({
            //                     success: false,
            //                     error: error.message
            //                 })
            //             );

            //     });

            //     return true;

            case 'unlockEmail':

                chrome.storage.local.get(['authToken'])
                    .then(({ authToken }) => {

                        fetch(
                            'http://localhost:3000/api/contact/unlock',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'auth-token': authToken
                                },
                                body: JSON.stringify({
                                    linkedinUrl: request.linkedinUrl
                                })
                            }
                        )
                            .then(r => r.json())
                            .then(data => sendResponse(data))
                            .catch(error =>
                                sendResponse({
                                    success: false,
                                    error: error.message
                                })
                            );

                    });

                return true;

            case 'unlockPhone':

                chrome.storage.local.get(['authToken'])
                    .then(({ authToken }) => {

                        fetch(
                            'http://localhost:3000/api/contact/dialunlock',
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'auth-token': authToken
                                },
                                body: JSON.stringify({
                                    linkedinUrl: request.linkedinUrl
                                })
                            }
                        )
                            .then(r => r.json())
                            .then(data => sendResponse(data))
                            .catch(error =>
                                sendResponse({
                                    success: false,
                                    error: error.message
                                })
                            );

                    });

                return true;

            case 'logout':

                chrome.storage.local.remove(
                    ['authToken']
                )
                    .then(() =>
                        sendResponse({
                            success: true
                        })
                    )
                    .catch(error =>
                        sendResponse({
                            success: false,
                            error: error.message
                        })
                    );

                return true;
        }
    }
);