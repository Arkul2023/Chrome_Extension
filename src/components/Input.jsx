export default function Input({

    label,

    type = "text",

    value,

    onChange,

    placeholder = "",

    disabled = false,

    required = false,

    className = ""

}) {

    return (

        <div className="mb-4">

            {label && (

                <label className="block mb-2 text-sm font-medium text-slate-700">

                    {label}

                </label>

            )}

            <input

                type={type}

                value={value}

                onChange={onChange}

                placeholder={placeholder}

                disabled={disabled}

                required={required}

                className={`
                    w-full
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    text-slate-900
                    placeholder:text-slate-400
                    outline-none
                    transition-all
                    duration-200
                    focus:border-blue-600
                    focus:ring-4
                    focus:ring-blue-100
                    disabled:bg-slate-100
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                    ${className}
                `}

            />

        </div>

    );

}