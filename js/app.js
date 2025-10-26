/*

document.addEventListener("DOMContentLoaded", () => {
    console.log("App initialized");

        var iArea = am$("amArea", "dskCanvas", "appArea");

    amPage.navigation.getLocationProperties();


    console.log(amPage);
      // Δημιουργούμε instance
        var artLibrary = videoLibrary(); 




    var introPart = introArea();
    introPart.createElement();
    introFlashDisplay();    

            // Popstate listener για back/forward buttons
        window.addEventListener('popstate', (event) => {
            var iArea = am$("amArea", "dskCanvas", "appArea");

            amPage.navigation.getLocationProperties();


            console.log(amPage);
            // Δημιουργούμε instance
                var artLibrary = videoLibrary(); 




            var introPart = introArea();
            introPart.createElement();
            introFlashDisplay();    
        })

  });




  
  

document.addEventListener("DOMContentLoaded", () => {
  console.log("App initialized");

  var iArea = am$("amArea", "dskCanvas", "appArea");

  // 👉 Ορίζουμε router
  function handleRouteChange(path) {
    console.log("Routing to:", path);

    // ενημερώνουμε τα navigation properties
    amPage.navigation.getLocationProperties();

    // βρίσκουμε το σωστό video
    var artLibrary = videoLibrary();
    var video = artLibrary.displayRequestedVideo();

    console.log("Video loaded:", video);

    // Αν δεν έχει αλλάξει navigation → intro
    //if (amPage.navigation.hasChanged === false) {
      var introPart = introArea();
      introPart.createElement();
      introFlashDisplay();
    }
//  }

  // 👉 Χρησιμοποιούμε το pushState αντί για location.href
  window.navigateTo = function (path) {
    history.pushState({}, "", path); // αλλάζουμε URL χωρίς reload
    handleRouteChange(path);
  };

  // 👉 Popstate για τα back/forward βελάκια
  window.addEventListener("hashchange", (event) => {
    console.log("popstate triggered:", window.location.pathname);
    handleRouteChange(window.location.pathname);
  });

  // 👉 Πρώτη εκτέλεση (με το τρέχον URL)
  handleRouteChange(window.location.pathname);
});



 */

document.addEventListener("DOMContentLoaded", async () => {
  console.log("🎬 App initialized");

  var iArea = am$("amArea", "dskCanvas", "appArea");
  // --- Router handler ---
async function handleRouteChange() {
    // 1️⃣ Ενημέρωση navigation properties
    amPage.navigation.getLocationProperties();

    // 2️⃣ Δημιουργούμε instance της βιβλιοθήκης
    const artLibrary = videoLibrary();

    // 3️⃣ Φορτώνουμε το video
    const video = await artLibrary.displayRequestedVideo();

    console.log("✅ Video loaded:", video);

    // 4️⃣ Intro εμφανίζεται μόνο αν το URL δεν έχει αλλάξει
    if (amPage.navigation.hasChanged === false) {
        const introPart = introArea();
        introPart.createElement();
        introFlashDisplay();
    }
}


  window.navigateTo = function(videoId) {
    const newUrl = `?video=${videoId}`;
    history.pushState({ video: videoId }, "", newUrl);
    handleRouteChange(`?video=${videoId}`);
};


  // --- Back / Forward buttons ---
  window.addEventListener("popstate", (event) => {
    console.log("⬅️➡️ popstate triggered:", event.state, window.location.search);
    handleRouteChange(window.location.search);
  });

  // --- Πρώτη εκτέλεση (τρέχον URL) ---
  
  await handleRouteChange(window.location.search);
});
