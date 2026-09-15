console.log("CloudLead Loaded");

if (window.location.href.includes("linkedin.com/in/")) {

    // Save LinkedIn URL

    const linkedinUrl = window.location.href;

    chrome.storage.local.set({
        linkedinUrl
    });

    // Create Launcher

    const btn = document.createElement("div");

    btn.id = "cloudlead-launcher";

    btn.innerHTML = `
        <img
            src="${chrome.runtime.getURL("assets/cloudlead_icon.png")}"
            width="24"
            height="24"
        >
    `;

    // Launcher Styling

    btn.style.position = "fixed";
    btn.style.right = "0px";
    btn.style.top = "250px";

    btn.style.width = "38px";
    btn.style.height = "100px";

    btn.style.background = "#4f46e5";

    btn.style.display = "flex";
    btn.style.alignItems = "center";
    btn.style.justifyContent = "center";

    btn.style.cursor = "pointer";

    btn.style.borderRadius = "10px 0 0 10px";

    btn.style.boxShadow =
        "0 2px 10px rgba(0,0,0,0.2)";

    btn.style.zIndex = "99999999";

    document.body.appendChild(btn);

    // Restore Saved Position

    chrome.storage.local.get(
        ["launcherTop"],
        (result) => {

            if (result.launcherTop) {

                btn.style.top =
                    result.launcherTop;
            }
        }
    );


    // Create Sidebar Container

    const sidebar =
        document.createElement("div");

    sidebar.id =
        "cloudlead-sidebar";

    // Sidebar Position

    sidebar.style.position =
        "fixed";

    sidebar.style.top =
        "0";

    sidebar.style.right =
        "-420px";

    sidebar.style.width =
        "420px";

    sidebar.style.height =
        "100vh";

    sidebar.style.background =
        "#ffffff";

    sidebar.style.zIndex =
        "99999998";

    sidebar.style.transition =
        "right 0.3s ease";

    sidebar.style.boxShadow =
        "-2px 0 15px rgba(0,0,0,0.15)";

    sidebar.style.overflow =
        "hidden";

    document.body.appendChild(
        sidebar
    );

    // Load Sidebar HTML

    // Create Sidebar iframe

    const iframe = document.createElement("iframe");

    iframe.src =
        chrome.runtime.getURL(
            "sidebar.html"
        );

    iframe.style.width = "100%";

    iframe.style.height = "100%";

    iframe.style.border = "none";

    iframe.style.background = "#ffffff";

    sidebar.appendChild(iframe);

    // Open / Close Sidebar

    btn.addEventListener(
        "click",
        () => {

            if (
                sidebar.style.right ===
                "0px"
            ) {

                sidebar.style.right =
                    "-420px";

            } else {

                sidebar.style.right =
                    "0px";
            }
        }
    );

    // Drag Launcher

    let isDragging = false;

    let offsetY = 0;

    btn.addEventListener(
        "mousedown",
        (e) => {

            isDragging = true;

            offsetY =
                e.clientY -
                btn.getBoundingClientRect().top;

            e.preventDefault();
        }
    );

    document.addEventListener(
        "mousemove",
        (e) => {

            if (!isDragging)
                return;

            const top = Math.max(
                20,
                Math.min(
                    window.innerHeight -
                    btn.offsetHeight -
                    20,
                    e.clientY -
                    offsetY
                )
            );

            btn.style.top =
                `${top}px`;
        }
    );

    document.addEventListener(
        "mouseup",
        () => {

            if (!isDragging)
                return;

            isDragging = false;

            chrome.storage.local.set({
                launcherTop:
                    btn.style.top
            });
        }
    );

    console.log(
        "CloudLead Launcher Added"
    );
}

// (async () => {

//     const linkedinUrl =
//         window.location.href;

//     console.log(
//         'LinkedIn URL:',
//         linkedinUrl
//     );

//     const response =
//         await fetch(
//             'http://localhost:5000/api/contact/find',
//             {
//                 method:'POST',

//                 headers:{
//                     'Content-Type':
//                     'application/json'
//                 },

//                 body:JSON.stringify({
//                     linkedinUrl,
//                     extensionUser:
//                     'test@cloudlead.ai'
//                 })
//             }
//         );

//     const result =
//         await response.json();

//     console.log(
//         'CloudLead Result:',
//         result
//     );

// })();
