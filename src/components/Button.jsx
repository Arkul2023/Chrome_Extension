export default function Button({

    children,

    onClick,

    type = "button",

    disabled = false,

    variant = "primary",

    className = ""

}) {

    const baseClass =

        "w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none";

    const variants = {

        primary:
            "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]",

        secondary:
            "bg-slate-100 text-slate-700 hover:bg-slate-200 active:scale-[0.98]",

        outline:
            "border border-slate-300 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600 active:scale-[0.98]",

        success:
            "bg-green-600 text-white hover:bg-green-700 active:scale-[0.98]",

        danger:
            "bg-red-600 text-white hover:bg-red-700 active:scale-[0.98]"

    };

    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            className={`
                ${baseClass}
                ${variants[variant]}
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                ${className}
            `}

        >

            {children}

        </button>

    );

}