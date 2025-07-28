   
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