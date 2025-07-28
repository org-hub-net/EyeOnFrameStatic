  // check and update data based on updatePage value
    if(amPage.navigation.updatePage != 0){
        amPage.data.savePageData({});
        if(amPage.navigation.gallery != 0 ){
                      
            var temporaryData = tempDB();
            var userGalleries = temporaryData.getTemporaryGalleries(amPage.navigation.gallery);
            amPage.data.savePageData(userGalleries);

        }
      
    }
