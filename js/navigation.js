   
(function(Global){


    var navigationApp = function(){
    
        
            var navObjectConstruct = this;
    
                // sample for contonuing development 
                // in future this information will be inside data
                navObjectConstruct.getPostType = function(){
                    var cUrl = window.location.pathname.toLowerCase();
                    var urlParms = new URLSearchParams(window.location.search);
                    var pType = '';
                    for (const [name, value] of urlParms) {
                       if(name == 'photo' || name == 'video'){
                        pType = name
                       }
                    //   if(name='post'){

                      // }
                     }
                    // return pType;
                    return 'video';
                }


                    navObjectConstruct.getParamFromPath = function() {
                        // Παίρνουμε το pathname, π.χ. "/article/123" ή "/video/abc"
                        var cUrl = window.location.pathname.toLowerCase();

                        // Σπάμε το path σε segments και αγνοούμε τα κενά
                        var segments = cUrl.split('/').filter(Boolean); // "/article/123" -> ["article", "123"]

                        // Παίρνουμε το πρώτο segment ως την "παράμετρο" που θέλουμε
                        // Μπορείς να αλλάξεις το index αν θέλεις άλλο segment
                        var param = segments.length > 0 ? segments[0] : '';

                        return param; // π.χ. "article" ή "video"
                    }

        return navObjectConstruct;
    
    }

    
    Global.navigationApp = navigationApp;
    
    }(window));
    
    /*
    
amPage.navigation.getLocationProperties();

    
    // check and update data based on updatePage value
    if(amPage.navigation.updatePage != 0){
        amPage.data.savePageData({});
        if(amPage.navigation.gallery != 0 ){
            var temporaryData = tempDB();
            var userGalleries = temporaryData.getTemporaryGalleries(amPage.navigation.gallery);
            amPage.data.savePageData(userGalleries);
        }
    }

*/