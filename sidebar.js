// console.log("SIDEBAR JS LOADED");

let linkedinUrl = '';

document.addEventListener(
    'cloudleadSidebarReady',
    async () => {

        // console.log(
        //     "SIDEBAR READY EVENT RECEIVED"
        // );


        document
            .getElementById('showLogin')
            ?.addEventListener(
                'click',
                (e) => {

                    e.preventDefault();

                    showLoginView();
                }
            );

        document
            .getElementById('showSignup')
            ?.addEventListener(
                'click',
                (e) => {

                    e.preventDefault();

                    document.getElementById(
                        'loginView'
                    ).style.display = 'none';

                    document.getElementById(
                        'signupView'
                    ).style.display = 'block';
                }
            );

        bindEvents();

        const data =
            await chrome.storage.local.get(
                ['authToken']
            );

        if (data.authToken) {

            showFinderView();

            await initializeFinder();

        } else {

            document.getElementById(
                'signupView'
            ).style.display = 'block';

            document.getElementById(
                'loginView'
            ).style.display = 'none';

            document.getElementById(
                'finderView'
            ).style.display = 'none';
        }
    }
);

function bindEvents() {


    document
        .getElementById('signupBtn')
        ?.addEventListener(
            'click',
            signupUser
        );

    document
        .getElementById('loginBtn')
        ?.addEventListener(
            'click',
            loginUser
        );

    document
        .getElementById('logoutBtn')
        ?.addEventListener(
            'click',
            logoutUser
        );

    document
        .getElementById('searchBtn')
        ?.addEventListener(
            'click',
            searchContact
        );

}

function showLoginView() {

    document.getElementById(
        'signupView'
    ).style.display = 'none';

    document.getElementById(
        'loginView'
    ).style.display = 'block';

    document.getElementById(
        'finderView'
    ).style.display = 'none';

    document.getElementById(
        'logoutBtn'
    ).style.display = 'none';

}

function showFinderView() {


    document.getElementById(
        'loginView'
    ).style.display = 'none';

    document.getElementById(
        'finderView'
    ).style.display = 'block';

    document.getElementById(
        'logoutBtn'
    ).style.display = 'block';

}

async function initializeFinder() {

    const data =
        await chrome.storage.local.get(
            ['linkedinUrl']
        );

    linkedinUrl =
        data.linkedinUrl || '';

    document.getElementById(
        'linkedinUrl'
    ).innerText =
        linkedinUrl;

    if (linkedinUrl) {
        await searchContact();
    }

    // Show company card immediately
    const companyCard = document.getElementById("companyCard");

    if (companyCard) {
        companyCard.style.display = "block";
    }

}

async function signupUser() {

    const first_name =
        document.getElementById(
            'signupName'
        ).value.trim();

    const email =
        document.getElementById(
            'signupEmail'
        ).value.trim();

    const company =
        document.getElementById(
            'signupCompany'
        ).value.trim();

    const country_code =
        document.getElementById(
            'signupCountryCode'
        ).value.trim();

    const phone =
        document.getElementById(
            'signupPhone'
        ).value.trim();

    const password =
        document.getElementById(
            'signupPassword'
        ).value.trim();

    try {

        const result =
            await chrome.runtime.sendMessage({
                action: 'signup',
                first_name,
                email,
                password,
                company,
                country_code,
                phone
            });


        console.log(result);

        if (
            result.status ===
            'success'
        ) {

            alert(
                'Account created successfully'
            );

            showLoginView();

        } else {

            document.getElementById(
                'signupError'
            ).innerText =
                result.message ||
                'Signup Failed';
        }

    }
    catch (error) {

        console.error(error);

        document.getElementById(
            'signupError'
        ).innerText =
            'Signup Failed';
    }
}

async function loginUser() {

    const email =
        document.getElementById(
            'email'
        ).value.trim();

    const password =
        document.getElementById(
            'password'
        ).value.trim();



    try {

        const result =
            await chrome.runtime.sendMessage({
                action: 'login',
                email,
                password
            });


        if (result.success) {

            await chrome.storage.local.set({

                authToken:
                    result.authToken
            });

            showFinderView();

            await initializeFinder();

        } else {

            document.getElementById(
                'error'
            ).innerText =
                'Invalid Credentials';
        }

    }
    catch (error) {

        console.error(error);

        document.getElementById(
            'error'
        ).innerText =
            'Login Failed';
    }

}

async function logoutUser() {

    await chrome.storage.local.remove(
        ['authToken']
    );

    location.reload();

}

function updateEmail(email) {

    document.getElementById("businessEmail").innerText = email;

    document.getElementById("unlockEmailBtn").style.display = "none";

}

function updatePhone(phone) {

    document.getElementById("directPhone").innerText = phone;

    document.getElementById("unlockPhoneBtn").style.display = "none";

}

async function searchContact() {

    try {

        document.getElementById(
            'result'
        ).innerHTML =
            'Searching...';

        const result =
            await chrome.runtime.sendMessage({
                action: 'findContact',
                linkedinUrl
            });

        if (!result.success) {

            document.getElementById(
                'result'
            ).innerHTML =
                'Contact Not Found';

            return;
        }

        const contact =
            result.data;

        // Show company card
        const companyCard = document.getElementById("companyCard");

        if (companyCard) {
            companyCard.style.display = "block";
        }

        // Populate company fields
        document.getElementById("CompanyName").innerText =
            contact.Company || "Company Not Found";

        document.getElementById("CompanyWebsite").innerText =
            contact.Website || "-";

        document.getElementById("CompanyAbout").innerText =
            contact.About || "Company data not found.";

        document.getElementById("CompanyIndustry").innerText =
            contact.Industry || "-";

        document.getElementById("CompanyType").innerText =
            contact.CompanyType || "-";

        document.getElementById("CompanySize").innerText =
            contact.Headcount || "-";

        document.getElementById("CompanyCountry").innerText =
            contact.Country || "-";

        if (contact.CompanyLinkedin) {

            document.getElementById("CompanyLinkedin").href =
                contact.CompanyLinkedin;

            document.getElementById("CompanyLinkedin").innerText =
                "View Company on LinkedIn →";
        }

        document.getElementById(
            'result'
        ).innerHTML = `

        <p>
            <strong>Full Name:</strong>
            ${contact.FullName || ''}
        </p>

        <p>
            <strong>Company:</strong>
            ${contact.Company || ''}
        </p>

        <p>
            <strong>Designation:</strong>
            ${contact.Designation || ''}
        </p>

        <p>
            <strong>Email:</strong>
            ${contact.Email || ''}
        </p>

        <p>
            <strong>Phone:</strong>
            ${contact.Phone || ''}
        </p>

        `;

    }

    catch (error) {

        console.error(error);

        document.getElementById(
            'result'
        ).innerHTML =
            'Error while searching';

    }

}