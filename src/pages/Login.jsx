import { useState } from "react";

export default function Login({ onSignup, onSuccess }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function loginUser() {

        setLoading(true);
        setError("");

        try {

            const result =
                await chrome.runtime.sendMessage({
                    action: "login",
                    email,
                    password
                });

            if (result.success) {

                await chrome.storage.local.set({

                    authToken: result.authToken

                });

                onSuccess();

            }
            else {

                setError("Invalid email or password.");

            }

        }
        catch (err) {

            console.error(err);

            setError("Login failed.");

        }

        setLoading(false);

    }

    return (

        <div className="min-h-screen bg-background flex items-center justify-center p-5">

            <div className="card-base w-full max-w-md p-6">

                <h1 className="text-2xl font-bold mb-6">

                    Welcome Back

                </h1>

                <label className="label-text">

                    Email

                </label>

                <input

                    className="input-field mb-4"

                    type="email"

                    placeholder="john@company.com"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }

                />

                <label className="label-text">

                    Password

                </label>

                <input

                    className="input-field"

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                />

                {

                    error && (

                        <div className="mt-4 text-sm text-red-600">

                            {error}

                        </div>

                    )

                }

                <button

                    className="btn-primary w-full mt-6"

                    disabled={loading}

                    onClick={loginUser}

                >

                    {

                        loading

                            ?

                            "Signing In..."

                            :

                            "Login"

                    }

                </button>

                <div className="text-center mt-6 text-sm">

                    Don't have an account?

                    <button

                        className="ml-2 text-primary"

                        onClick={onSignup}

                    >

                        Sign Up

                    </button>

                </div>

            </div>

        </div>

    );

}