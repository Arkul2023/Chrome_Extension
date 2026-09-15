export default function ContactCard({

    contact,

    onUnlockEmail,

    onUnlockPhone

}) {

    if (!contact) {

        return (

            <div className="card-base p-5 mt-5">

                <h3 className="text-lg font-semibold">

                    Contact Information

                </h3>

                <p className="text-muted-foreground mt-3">

                    No contact found.

                </p>

            </div>

        );

    }

    return (

        <div className="card-base p-5 mt-5">

            <h3 className="text-lg font-semibold mb-5">

                Contact Information

            </h3>

            {/* Business Email */}

            <div className="mb-5">

                <label className="label-text">

                    Business Email

                </label>

                <div className="flex items-center justify-between">

                    <span>

                        {contact.email || "**************"}

                    </span>

                    {

                        !contact.email && (

                            <button

                                className="btn-outline"

                                onClick={onUnlockEmail}

                            >

                                Unlock

                            </button>

                        )

                    }

                </div>

                <p className="text-xs text-muted-foreground mt-1">

                    1 Credit

                </p>

            </div>

            <hr className="my-5" />

            {/* Phone */}

            <div>

                <label className="label-text">

                    Direct Phone

                </label>

                <div className="flex items-center justify-between">

                    <span>

                        {contact.direct_dial || "+1 XXX XXX XXXX"}

                    </span>

                    {

                        !contact.direct_dial && (

                            <button

                                className="btn-outline"

                                onClick={onUnlockPhone}

                            >

                                Unlock

                            </button>

                        )

                    }

                </div>

                <p className="text-xs text-muted-foreground mt-1">

                    10 Credits

                </p>

            </div>

        </div>

    );

}