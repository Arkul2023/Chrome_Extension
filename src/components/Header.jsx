import { useState } from "react";

export default function Header({

    credits = 0,

    onLogout

}) {

    const [showMenu, setShowMenu] = useState(false);

    return (

        <header className="relative flex items-center justify-between mb-6">

            {/* Logo */}

            <div>

                <h1 className="text-2xl font-bold text-blue-600">

                    CloudLead

                </h1>

            </div>

            {/* Right Side */}

            <div className="flex items-center gap-3">

                {/* Credits */}

                <div className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-semibold text-blue-700">

                    🪙 {credits} Credits

                </div>

                {/* Menu */}

                <button

                    onClick={() =>
                        setShowMenu(!showMenu)
                    }

                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white shadow-sm hover:bg-slate-50 transition"

                >

                    ☰

                </button>

            </div>

            {/* Dropdown */}

            {

                showMenu && (

                    <div className="absolute right-0 top-14 w-52 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-50">

                        <button

                            className="w-full px-4 py-3 text-left hover:bg-slate-50"

                        >

                            👤 My Profile

                        </button>

                        <button

                            className="w-full px-4 py-3 text-left hover:bg-slate-50"

                        >

                            💳 Subscription

                        </button>

                        <button

                            className="w-full px-4 py-3 text-left hover:bg-slate-50"

                        >

                            ⭐ Credits

                        </button>

                        <button

                            className="w-full px-4 py-3 text-left hover:bg-slate-50"

                        >

                            ⚙️ Settings

                        </button>

                        <hr />

                        <button

                            onClick={onLogout}

                            className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"

                        >

                            🚪 Logout

                        </button>

                    </div>

                )

            }

        </header>

    );

}