import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Finder from "./pages/Finder";

function App() {

    const [view, setView] =
        useState("loading");

    useEffect(() => {

        checkAuthentication();

    }, []);

    async function checkAuthentication() {

        const data =
            await chrome.storage.local.get([
                "authToken"
            ]);

        if (data.authToken) {

            setView("finder");

        }
        else {

            setView("signup");

        }

    }

    function showLogin() {

        setView("login");

    }

    function showSignup() {

        setView("signup");

    }

    function loginSuccess() {

        setView("finder");

    }

    function logout() {

        chrome.storage.local.remove(
            ["authToken"]
        );

        setView("login");

    }

    if (view === "loading") {

        return (

            <div className="flex h-screen items-center justify-center">

                Loading...

            </div>

        );

    }

    if (view === "login") {

        return (

            <Login

                onSignup={showSignup}

                onSuccess={loginSuccess}

            />

        );

    }

    if (view === "signup") {

        return (

            <Signup

                onLogin={showLogin}

            />

        );

    }

    return (

        <Finder

            onLogout={logout}

        />

    );

}

export default App;