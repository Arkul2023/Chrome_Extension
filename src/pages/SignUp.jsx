import { useState } from "react";

export default function Signup({ onLogin }) {

    const [form, setForm] = useState({

        first_name: "",

        email: "",

        company: "",

        country_code: "",

        phone: "",

        password: ""

    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    function updateField(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function signupUser() {

        setLoading(true);

        setError("");

        try {

            const result =
                await chrome.runtime.sendMessage({

                    action: "signup",

                    ...form

                });

            if (result.status === "success") {

                alert(
                    "Account created successfully."
                );

                onLogin();

            }
            else {

                setError(
                    result.message ||
                    "Signup failed."
                );

            }

        }
        catch (err) {

            console.error(err);

            setError(
                "Signup failed."
            );

        }

        setLoading(false);

    }

    return (

        <div className="min-h-screen bg-background flex items-center justify-center p-5">

            <div className="card-base w-full max-w-lg p-6">

                <h1 className="text-2xl font-bold mb-6">

                    Create CloudLead Account

                </h1>

                <label className="label-text">

                    Full Name

                </label>

                <input

                    className="input-field mb-4"

                    name="first_name"

                    value={form.first_name}

                    onChange={updateField}

                />

                <label className="label-text">

                    Business Email

                </label>

                <input

                    className="input-field mb-4"

                    name="email"

                    value={form.email}

                    onChange={updateField}

                />

                <label className="label-text">

                    Company

                </label>

                <input

                    className="input-field mb-4"

                    name="company"

                    value={form.company}

                    onChange={updateField}

                />

                <label className="label-text">

                    Country Code

                </label>

                <input

                    className="input-field mb-4"

                    name="country_code"

                    value={form.country_code}

                    onChange={updateField}

                />

                <label className="label-text">

                    Phone

                </label>

                <input

                    className="input-field mb-4"

                    name="phone"

                    value={form.phone}

                    onChange={updateField}

                />

                <label className="label-text">

                    Password

                </label>

                <input

                    className="input-field"

                    type="password"

                    name="password"

                    value={form.password}

                    onChange={updateField}

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

                    onClick={signupUser}

                >

                    {

                        loading

                            ?

                            "Creating..."

                            :

                            "Create Account"

                    }

                </button>

                <div className="text-center mt-6 text-sm">

                    Already have an account?

                    <button

                        className="ml-2 text-primary"

                        onClick={onLogin}

                    >

                        Login

                    </button>

                </div>

            </div>

        </div>

    );

}