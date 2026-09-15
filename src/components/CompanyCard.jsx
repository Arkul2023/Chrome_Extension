import { useState } from "react";

export default function CompanyCard({

    company

}) {

    const [expanded, setExpanded] = useState(false);

    if (!company) return null;

    const about = company.organization?.companykeywords || "";

    const shortAbout =

        about.length > 250

            ? about.substring(0, 250) + "..."

            : about;

    return (

        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

            <h2 className="mb-5 text-lg font-semibold text-slate-900">

                🏢 Company

            </h2>

            {/* Company Name */}

            <h3 className="text-2xl font-bold text-slate-900">

                {company.organization?.organization_name || "Company Not Found"}

            </h3>

            {

                company.organization?.org_linkedin_url && (

                    <a

                        href={company.organization.org_linkedin_url}

                        target="_blank"

                        rel="noreferrer"

                        className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"

                    >

                        View Company on LinkedIn →

                    </a>

                )

            }

            <hr className="my-5" />

            {/* Website */}

            <div>

                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">

                    Website

                </p>

                {

                    company.organization?.primary_website_domain ? (

                        <a

                            href={`https://${company.organization.primary_website_domain}`}

                            target="_blank"

                            rel="noreferrer"

                            className="text-blue-600 hover:underline break-all"

                        >

                            {company.organization.primary_website_domain}

                        </a>

                    ) : (

                        <p className="text-slate-800">

                            -

                        </p>

                    )

                }

            </div>

            <hr className="my-5" />

            {/* About */}

            <div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">

                    About

                </p>

                <p className="leading-7 text-slate-700">

                    {

                        expanded

                            ? about || "-"

                            : shortAbout || "-"

                    }

                </p>

                {

                    about.length > 250 && (

                        <button

                            onClick={() =>
                                setExpanded(!expanded)
                            }

                            className="mt-2 text-sm font-semibold text-blue-600 hover:underline"

                        >

                            {

                                expanded

                                    ? "Read Less"

                                    : "Read More"

                            }

                        </button>

                    )

                }

            </div>

            <hr className="my-5" />

            {/* Industry */}

            <div className="mb-5">

                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">

                    Industry

                </p>

                <p className="text-slate-800">

                    {company.organization?.industry || "-"}

                </p>

            </div>

            {/* Company Size */}

            <div className="mb-5">

                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">

                    Company Size

                </p>

                <p className="text-slate-800">

                    {company.organization?.size_range || "-"}

                </p>

            </div>

            {/* Country */}

            <div className="mb-5">

                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">

                    Country

                </p>

                <p className="text-slate-800">

                    {company.organization?.org_country || "-"}

                </p>

            </div>

            <hr className="my-5" />

            {/* LinkedIn */}

            <div>

                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">

                    LinkedIn Company

                </p>

                {

                    company.organization?.org_linkedin_url ? (

                        <a

                            href={company.organization.org_linkedin_url}

                            target="_blank"

                            rel="noreferrer"

                            className="break-all text-blue-600 hover:underline"

                        >

                            {company.organization.org_linkedin_url}

                        </a>

                    ) : (

                        <p className="text-slate-800">

                            -

                        </p>

                    )

                }

            </div>

        </div>

    );

}