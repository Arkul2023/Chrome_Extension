import { useEffect, useState } from "react";

import Header from "../components/Header";
import ContactCard from "../components/ContactCard";
import CompanyCard from "../components/CompanyCard";
import Footer from "../components/Footer";

export default function Finder({ onLogout }) {

    const [linkedinUrl, setLinkedinUrl] = useState("");

    const [status, setStatus] = useState("Searching...");

    const [contact, setContact] = useState(null);

    useEffect(() => {

        initializeFinder();

    }, []);

    async function initializeFinder() {

        const data =
            await chrome.storage.local.get([
                "linkedinUrl"
            ]);

        const url =
            data.linkedinUrl || "";

        setLinkedinUrl(url);

        if (url) {

            searchContact(url);

        }
        else {

            setStatus("LinkedIn profile not detected.");

        }

    }

    async function searchContact(url = linkedinUrl) {

        if (!url) {

            setStatus("LinkedIn URL not found.");

            return;

        }

        try {

            const result =
                await chrome.runtime.sendMessage({

                    action: "findContact",

                    linkedinUrl: url

                });

            if (!result.success) {

                setStatus("Contact Not Found");

                setContact(null);

                return;

            }

            setContact(result.data);

            setStatus("");

        }

        catch (error) {

            console.error(error);

            setStatus("Error while searching.");

        }

    }

    function unlockEmail() {

        alert("Unlock Email functionality will be added.");

    }

    function unlockPhone() {

        alert("Unlock Phone functionality will be added.");

    }

    return (

        <div className="extension-container">

            <Header

                onLogout={onLogout}

                credits={485}

            />

            {

                status && (

                    <div className="status-message">

                        {status}

                    </div>

                )

            }

            <ContactCard

                email={contact?.email}

                onUnlock={unlockEmail}

            />

            <PhoneCard

                phone={contact?.direct_dial}

                onUnlock={unlockPhone}

            />

            <CompanyCard

                company={contact}

            />

            <Footer />

        </div>

    );

}