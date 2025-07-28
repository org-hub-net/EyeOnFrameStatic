

document.addEventListener("DOMContentLoaded", () => {
    console.log("App initialized");
    var mnw = document.getElementById("mainWrapper");

    var introPart = introArea();
    introPart.createElement();
    introFlashDisplay();

    
  
    function handleRouteChange(path) {
       
        
        console.log("Route changed to:", path);
        var imageView = document.getElementById("imageView");
        var videoView = document.getElementById("videoView");
        var navigationEl = navigationApp();
        postType = navigationEl.getPostType();
        
        if (postType == "video") {
            imageView.style.display = "none";
            videoView.style.display = "block";
        } else if (postType === "photo") {
            videoView.style.display = "none";
            imageView.style.display = "block";
        } else {
            videoView.style.display = "none";
            imageView.style.display = "block";
        }
    
      }
    
      // Handle the initial route
   


    // Listen for browser back/forward button events
    window.addEventListener("popstate", () => {

        handleRouteChange(window.location.pathname);
    });

    // Example of navigating to /video
    window.navigateTo = (path) => {

        history.pushState({}, "", path);
        handleRouteChange(path);
    };
  




     handleRouteChange(window.location.pathname);

    

    // must be replaced with amLib objects and functions for cover and navigation


  });
  
 
  
  




