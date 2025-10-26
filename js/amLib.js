(function (Global){
    


    // Setup of the basic amorphous object
    var amLib = function(id, parentID, classname, elements, htmlElement){


        // Restore page object from session 

        var amPage = restorePageObject();


        if(amPage.data.services.length ===0){
        
             var dataObj = loadXMLDoc('settings/data.json').then(function(obj){
                
                for(var iserv=0;iserv<obj.length;iserv++){

                    amPage.data.services.push([obj[iserv].name, obj[iserv].url, obj[iserv].action]);
                }

                backupPageToSession(amPage);


                if(classname === 'Page'){

                        return amPage;

                    }


            }, function(rejObj){})
        }


      

        // create a new object

        return new amLib.init(id, parentID, classname, elements, htmlElement);

    }


    // amorphous object prototype
    amLib.prototype = {

        
    };
        
        // amLib Basic Object Setup

        // data object of basic







    // create the object for the paramenter classname 
    // scan class names object and run the correct function
    amLib.init = function (id, parentID, classname,  elements, htmlElement){
        
        // check if parameter exists 

        if (id==undefined || id===""){

            throw Error ( "Id not defined" );

        }
        if(classname == undefined || classname == ""){

            //console.log("Class name not defined " + id);

        }

        if (elements==undefined){
            elements = [];
        }

        if (htmlElement==undefined){
            htmlElement = 'DIV';
        }


        var self =  this;


        // Basic object 

        // set the layout of the object

        // layout and layout properties
        self.layout = {};
        self.layout.id = id;
        self.layout.parentID = parentID;
        self.layout.classname = classname;
        self.layout.html = htmlElement;


        self.layout.backValue = [];

        // child elements text creation


        self.layout.elements = elements;


        // layout methods
        self.layout.setObjectInPage = function(){


              
                    //console.log(this.activeLayout.getAttribute("style"));
                    if(this.activeLayout.getAttribute("style")===null){
                        this.activeLayout.setAttribute("style",this.styleCollection);   
                    }          


                    // Following part of code must be transfered one level above          

                    if(this.classname !== 'Page') {
                        this.refreshObjectInPage();
                        
                    }

                    
                
        }


        self.layout.addStyleInObject = function(prop, val) {

                this.activeLayout.style[prop] = val;
                this.styleCollection = this.activeLayout.style.cssText;
                if(this.classname !== 'Page') {
                        this.refreshObjectInPage();
                    }

        } 

        self.layout.removeStyleFromObject = function(prop) {

            this.activeLayout.style[prop] = "";
            this.styleCollection = this.activeLayout.style.cssText;
            if(this.classname !== 'Page') {
                    this.refreshObjectInPage();
                }

    } 
        
        
        self.layout.addImgSource = function(imgSource){
            
            if(this.activeLayout.nodeType == 1){//element of type html-object/tag

                  if(this.activeLayout.tagName=="IMG"){
                      this.activeLayout.src = imgSource;
                      this.refreshObjectInPage();
                  }
            }
            
        }
        
        
        self.layout.addVideoSource = function(vSource){
            
            if(this.activeLayout.nodeType == 1){//element of type html-object/tag

                  if(this.activeLayout.tagName=="VIDEO"){
                     
                      this.activeLayout.src = vSource;
                      this.refreshObjectInPage();
                  }
            }
            
        }
        
        self.layout.addVideoPoster = function(imgVideo){
            
            if(this.activeLayout.nodeType == 1){//element of type html-object/tag

                  if(this.activeLayout.tagName=="VIDEO"){
                      this.activeLayout.poster = imgVideo;
                      this.refreshObjectInPage();
                  }
            }
            
        }

        self.layout.addControls = function(imgVideo){
            
            if(this.activeLayout.nodeType == 1){//element of type html-object/tag

                  if(this.activeLayout.tagName=="VIDEO"){
                      this.activeLayout.setAttribute("controls","controls");
                      this.refreshObjectInPage();
                  }
            }
            
        }
        
        
        self.layout.addLinkHRef = function(url, htext){
            
            if(this.activeLayout.nodeType == 1){//element of type html-object/tag

                  if(this.activeLayout.tagName=="A"){
                      this.activeLayout.setAttribute('href',url);
                      this.activeLayout.setAttribute('target', '_blank');
                      this.activeLayout.innerHTML = htext;
                      this.refreshObjectInPage();
                  }
            }
            
        }

        
        // dataValue format {value, type}
        // types innerHTML, imageSource, poster


        self.layout.displayData = function(dataValue){


            if(dataValue.type === undefined || dataValue.type == "innerHTML"){
                self.layout.activeLayout.innerHTML = dataValue.value;
            }
            if(dataValue.type == "imageSource"){
                self.layout.addImgSource(dataValue.value);
            }
            if(dataValue.type == "videoSource"){
                self.layout.addVideoSource(dataValue.value);
            }
            if(dataValue.type == "videoPoster"){
                self.layout.addVideoPoster(dataValue.value);
            }
            if(dataValue.type == "link"){
                if(Array.isArray(dataValue.value)){
                    self.layout.addLinkHRef(dataValue.value[0], dataValue.value[1]);
                }else{
                    self.layout.addLinkHRef(dataValue.value, dataValue.value);
                }
            }


        }

        self.layout.saveData = function(dataValue, addit){

            if(dataValue !== undefined){
                
                if(addit === undefined){
                    self.layout.backValue = [];
                }
                self.layout.backValue.push(dataValue);
                //self.layout.displayData(dataValue);
                self.layout.setObjectInPage();
            }

        }

        self.layout.restoreData = function(){

            for(var valIdx=0;valIdx<self.layout.backValue.length; valIdx++){

                self.layout.displayData(self.layout.backValue[valIdx]);

            }
            
        }

        
        self.layout.addContent = function(datavalue, addit){
            self.layout.saveData(datavalue, addit);
            self.layout.restoreData();
        }

        
        self.layout.createElements = function(){

            if(self.layout.classname !== 'Page'){

            
                if (this.elements.length === 0){
                    return;
                }

                for(var elem = 0; 
                    elem<this.elements.length;elem++){

                    if(this.elements[elem].length<3){
                         var amSubObj = new amLib.init(this.elements[elem][0], self.layout.id, this.elements[elem][1]);
                    }else{
                        if(this.elements[elem].length <4){
                             var amSubObj = new amLib.init(this.elements[elem][0], self.layout.id, this.elements[elem][1], this.elements[elem][2]);
                        }else{
                                 var amSubObj = new amLib.init(this.elements[elem][0], self.layout.id, this.elements[elem][1], this.elements[elem][2], this.elements[elem][3]);
                        }
                    }
                   

                }

            }


        }



        self.layout.remove = function(){


            if(amPage.amObjArray.length === 0){
                return -1;
            }

            if(amPage.amObjArray===undefined){
                return -2;
            }

            // find parent object and remove 

            var remElement = document.getElementById(self.layout.id);
            remElement.parentNode.removeChild(remElement);


            // find object inside amPage amObjArray and remove 
            // get the family tree of the element


            var selElements = self.layout.getFamilyTree(self.layout.id);



                for(var amobjKey = amPage.amObjArray.length-1;amobjKey >= 0; amobjKey--){

                    if(selElements.indexOf(amPage.amObjArray[amobjKey].layout.id)!== -1){

                        amPage.amObjArray.splice(amobjKey,1);

                        if(this.classname !== 'Page') {
                            backupPageToSession(amPage);
                        }

                    }
                }

        }



        self.layout.getFamilyTree = function(id){

            var objFound = true;

            var familyIds = [id];

            var levelIds = [id];

            var foundIds = [];

            while(objFound === true){

                  for(var amobjKey = 0;amobjKey < amPage.amObjArray.length; amobjKey++){

                        if(levelIds.indexOf(amPage.amObjArray[amobjKey].layout.parentID)!==-1){

                            foundIds.push(amPage.amObjArray[amobjKey].layout.id);

                        }

                    }
                    if(foundIds.length > 0){
                        familyIds = familyIds.concat(foundIds);
                        levelIds = foundIds;
                        foundIds = [];
                    }else{
                        objFound = false;
                    }

            }

            return familyIds;

        }


      

        // Set the data object for the basic 

            self.data = {};
             
            self.data.services = {};

            self.data.value = '';

        
        // get the right service by name

            self.data.getService = function(serviceName){


                if(amPage){
                        
                    var loadServUrl = "";
                    var deleteServUrl = "";


                    for(var servidx = 0; servidx<amPage.data.services.length;servidx++){

                        if(amPage.data.services[servidx][0] === serviceName){
                        
                            return [amPage.data.services[servidx][1],amPage.data.services[servidx][2]] ;

                        }


                    }
                    return [];

                }


            }
            


// get all service url in page - mostly for testing reasons

        self.data.loadPageServices = function(){

            amPage.data.services = [];
                        
            var dataObj = loadXMLDoc('settings/data.json').then(function(obj){
                                
                for(var iserv=0;iserv<obj.length;iserv++){

                        amPage.data.services.push([obj[iserv].name, obj[iserv].url, obj[iserv].action]);
                        
                    }
                    backupPageToSession();

                }, function(rejObj){console.error(rejObk);})  
        }



        self.data.serviceCalls = {};

        self.data.pageDataObj = {};

        self.data.dataExecFunction = function(){return -1};   // use self data resultSet object

        self.data.getFileGalleryObjAndExecute = function(filePath, callback){
            var dataObj = loadXMLDoc(filePath).then(function(obj){
                self.data.galleryDataObj = obj.find(g => g.gallery === self.navigation.gallery);
                backupPageToSession();
                callback();
            })
        }

        self.data.savePageData = function(pageDataObj){
            self.data.pageDataObj = pageDataObj;
            if(self.data.pageDataObj === undefined){
                self.data.pageDataObj = {};
            }
            backupPageToSession(amPage);
        }

        self.data.serviceCalls.executeDataService = function(serviceName, objQ){

               
                amPage.data.services = [];
                        
                var dataObj = loadXMLDoc('settings/data.json').then(function(obj){
                                
                for(var iserv=0;iserv<obj.length;iserv++){

                       amPage.data.services.push([obj[iserv].name, obj[iserv].url, obj[iserv].action]);
                    }

                    var serviceData = self.data.getService(serviceName);

                    var selectedServiceUrl = serviceData[0];
                    var selectedAction = serviceData[1];

                    if(selectedServiceUrl!==-1){
                        
                        var dataObj = callServiceData(objQ, selectedAction, selectedServiceUrl).then(function(obj){
                                
                        self.data.ResultSet = obj;
                        self.layout.refreshObjectInPage();
                        self.data.dataExecFunction(self);    // set up in object class

                    }, function(rejObj){ console.error(rejObj); self.data.Error = rejObj})
   
                    }else{

                        console.error("Service " + serviceName + "does not exist!");
                        self.data.Error = "Service " + serviceName + "does not exist!"
                    }


                }, function(rejObj){console.log(rejObk);})  

                
        }
        
        
         self.data.serviceCalls.executeCustomService = function(serviceName, action, objQ, callback){
             
             
             amPage.data.services = [];
                        
                var dataObj = loadXMLDoc('settings/data.json').then(function(obj){
                                
                for(var iserv=0;iserv<obj.length;iserv++){

                       amPage.data.services.push([obj[iserv].name, obj[iserv].url, obj[iserv].action]);
                    }
             
                var serviceData = self.data.getService(serviceName);
             
                var selectedServiceUrl = "";
                var selectedAction = "";
                    
                    
                if (serviceData.length>0){
                    selectedServiceUrl = serviceData[0];
                    selectedAction = serviceData[1];
                }else{
                    selectedServiceUrl = serviceName;
                    selectedAction = action;
                }
             
                if(selectedServiceUrl!==-1){
                        
                        var dataObj = callServiceData(objQ, selectedAction, selectedServiceUrl).then(function(obj){
                                
                        self.data.ResultSet = obj;
                        self.layout.refreshObjectInPage();
                        callback(self);    // set up in object class

                    }, function(rejObj){ console.error(rejObj); self.data.Error = rejObj})
   
                }else{

                    console.error("Service " + serviceName + "does not exist!");
                    self.data.Error = "Service " + serviceName + "does not exist!"
                }
                    
                    
            }, function(rejObj){console.log(rejObk);})  
                    
         }
        
                
         
        // navigation 

       self.navigation = {};
        self.navigation.LocationProperties = {};

        // θα κρατάμε λίστες παραμέτρων
        self.navigation.previousParams = {};
        self.navigation.currentParams = {};
        self.navigation.hasChanged = false;


     self.navigation.getLocationProperties = function() {

    // Αποθήκευση βασικών properties
    self.navigation.LocationProperties.hostname = window.location.hostname.toLowerCase();
    self.navigation.LocationProperties.URLAddress = window.location.href.toLowerCase();
    self.navigation.LocationProperties.protocol = window.location.protocol.toLowerCase();
    self.navigation.LocationProperties.pathname = window.location.pathname.toLowerCase();

    // --- Δημιουργούμε ένα νέο object για όλα τα params ---
    let urlParams = new URLSearchParams(window.location.search);
    self.navigation.currentParams = {};
    for (const [name, value] of urlParams) {
        self.navigation.currentParams[name.toLowerCase()] = value;
    }

    // --- Έλεγχος αλλαγών σε σχέση με previousParams ---
    self.navigation.hasChanged = self.navigation.compareParams(
        self.navigation.previousParams,
        self.navigation.currentParams
    );

    // --- Τώρα αποθηκεύουμε τα current ως previous ---
    self.navigation.previousParams = { ...self.navigation.currentParams };

    backupPageToSession(amPage);
};




      self.navigation.compareParams = function(prev, curr) {
            let prevKeys = Object.keys(prev);
            let currKeys = Object.keys(curr);

            if (prevKeys.length !== currKeys.length) {
                return true;
            }

            for (let key of currKeys) {
                if (prev[key] !== curr[key]) {
                    return true;
                }
            }
            return false;
        };




        // End of Navigation 


        self.data.Error = ""; // Error in data manipulation

        self.data.ResultSet = {}; // Data downloaded for last call 

        self.data.dataTransfer = [];   // the total data downloaded for the selected pages for the specific query


         // all neccessary parameters for app mode 

         
         


        // Add object "special" for special properties of every type of object

        self.special = {};


        // General Functions

        

        // 1. get the object in object array

        self.layout.getAmObjectById = function(id){

            if(amPage.amObjArray){

                for(var amobjKey = 0;amobjKey < amPage.amObjArray.length; amobjKey++){

                    if(amPage.amObjArray[amobjKey].layout.id === id){


                        return amobjKey;

                    }
                }
                return -1
            }
            return -2;
        }

        // get the amObject to highest level with all properties
        
        
        self.layout.getAmObjectJScriptById = function(id){

            if(amPage.amObjArray){

                if(amPage.amObjArray.filter(d=>d.layout.id == id) != undefined){

                    return amPage.amObjArray.filter(d=>d.layout.id == id);  
                }

                return -1
            }
            return -2;
        }
        

        

        // get an array of objects of the same class

         self.layout.getAmObjectsByClass = function(classname){

             var arrClass = [];

            if(amPage.amObjArray){


                arrClass = amPage.amObjArray.filter(d=>d.layout.classname== classname);

            }
            return arrClass;
        }



        // this function is executed in every property change of the item

        self.layout.refreshObjectInPage = function(){

            var objKey = self.layout.getAmObjectById(self.layout.id);

            if (objKey=== -2){

                return;

            }
            if (objKey=== -1){

                amPage.amObjArray.push(self);

            }else{
                amPage.amObjArray[objKey] = self;
            }

            backupPageToSession(amPage);

        }




        
        /////// Page object additions  // check for delay

        if(classname === 'Page'){

            self.amObjArray = [];
            self.data.services = [];
           


        }



        // Following Code must be transfered one level up

/*
        
        ////// Desktop Film object additions 

        if(classname === "desktopFilm"){
            self.layout.desktops = 1;   // starting desktop
        }



        ///// Desktop object additions 

         if(classname === "desktop"){

            self.layout.desktopOrder = 1;   // starting desktop

        }

*/






        ///// List Object additions

        // data object additions for list container

   /*     if (self.layout.classname.includes("list-contaner") ){

            self.data.lastKeyCondition = "";

            self.data.payDownLoad = 500;

            self.data.totalDownloaded = 0;

            self.data.totalDownload = 0;

            self.data.pageRecordNumber = 0;

            // layput additional properties 

            self.layout.listElements = [];

            self.layout.currentPageIndex = 0;

            self.layout.maxListItems = 20;

            self.layout.createListItems = function(){

                for(var iElem = 1; iElem<=self.layout.maxListItems; iElem++){

                    var lDefItem = self.layout.listElements[0][0].replace("listItem", self.layout.id + "-item" + iElem.toString());

                    var lItem = new amLib.init(lDefItem, self.listElements[0][1], self.listElements[0][2], self.listElements[0][3]);

                }


            }


        }

*/

        // last actions before the delivery of the object

        if(document.getElementById(self.layout.id)== null){

            self.layout.activeLayout = designConstructor(self);
            

        }else
        {
            self.layout.activeLayout = document.getElementById(self.layout.id);
            
        }

        
        self = copyElementPropertiesFromSession(self);


        // refresh of the object design in DOM
        //if(typeof self.layout.activeLayout !== 'nothing'){
            self.layout.setObjectInPage();
        //}
        

            if (self.layout.classname === 'Page'){
                amPage = self;
            }else{
                self.layout.refreshObjectInPage();
            }
        

        // last step create child elements

        if(self.layout.classname !== 'Page'){
            self.layout.createElements();
        }
         
         // ------- Above code will be executed only for any other class except Page


    }    

    //amLib.init.prototype = amLib.prototype;

    // make library accessible
    Global.amlib = Global.am$ = amLib;
    
    // ----------- STAND ALONE FUNCTONS -------------------------------

  

   var designConstructor = function(elem){

       var dfilmParent = document.getElementById(elem.layout.parentID);
       var filmObj = document.getElementById(elem.layout.id) ;

       if (filmObj == undefined){
            filmObj = document.createElement(elem.layout.html);
           dfilmParent.appendChild(filmObj);
           filmObj.id = elem.layout.id;
           filmObj.className = elem.layout.classname;
       }
    
       return filmObj;


   }


   function loadXMLDoc(docURL) {

    var deferred = Q.defer();
  

        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for older browsers
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
             
              

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200){
                    var fObj = JSON.parse(this.responseText);
                    deferred.resolve(JSON.parse(this.responseText));
                }else
                {
                    deferred.reject(JSON.parse('{}'));
                }
                
            }
        };

        xmlhttp.open("GET", docURL, true);
        xmlhttp.send();
        
        
        return deferred.promise;


    }



    function callServiceData(sendObj, action, url){

        
        var deferred = Q.defer();
        

                var xmlhttp;
                if (window.XMLHttpRequest) {
                    xmlhttp = new XMLHttpRequest();
                } else {
                    // code for older browsers
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
                    
                    

                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4) {
                        if(xmlhttp.status == 200){
                            var fObj = JSON.parse(this.responseText);
                            deferred.resolve(JSON.parse(this.responseText));
                        }else
                        {
                            deferred.reject(JSON.parse('{}'));
                        }
                        
                    }
                };

                xmlhttp.open(action, url, true);
                //xmlhttp.setRequestHeader("Content", "application/json");
                xmlhttp.setRequestHeader("Content-Type","application/json");
                xmlhttp.withCredentials = false;
                xmlhttp.send(JSON.stringify(sendObj));
                
                
                return deferred.promise;

    }



    // ------------------------------------------

    function copyElementPropertiesFromSession(elem){

        if(typeof amPage === 'undefined'){
            return elem;
        }

        if(elem.layout.classname === 'Page'){

            return elem
        }

        if(typeof amPage.amObjArray === 'undefined'){
            amPage.amObjArray = [];
        }

         for(var amobjKey = 0;amobjKey < amPage.amObjArray.length; amobjKey++){

                if(amPage.amObjArray[amobjKey].layout.id === elem.layout.id){


                // Replace one by one values of object properties

                for (var name in amPage.amObjArray[amobjKey].data) {

                        if(name !== "serviceCalls" & name !== "galleryDataObj"){    // serviceCalls cannot be stored in sessionStorage

                                elem.data[name] = amPage.amObjArray[amobjKey].data[name];
                        }
                         
                    }

                for (var name in amPage.amObjArray[amobjKey].layout) {
                        if(name!=='activeLayout'){
                            elem.layout[name] = amPage.amObjArray[amobjKey].layout[name];
                        }    
                    }   
           
                for (var name in amPage.amObjArray[amobjKey].special){
                        elem.special[name] = amPage.amObjArray[amobjKey].special[name];

                }

                for (var name in amPage.amObjArray[amobjKey].navigation){
                    elem.navigation[name] = amPage.amObjArray[amobjKey].navigation[name];

                }

                }
            }


        return elem;
        
    }



  function restorePageObject() {
    var amPage = new amLib.init('amPage', 'dskCanvas', 'Page');
    var sessionPage = JSON.parse(sessionStorage.getItem('amPage'));

    if (sessionPage && sessionPage.amObjArray) {

        amPage.amObjArray = sessionPage.amObjArray;
        amPage.data.services = sessionPage.data.services;
        amPage.data.pageDataObj = sessionPage.data.pageDataObj;

        // navigation
        amPage.navigation.prevGallery = sessionPage.navigation.prevGallery;
        amPage.navigation.parameterPrevValue = sessionPage.navigation.parameterPrevValue;
        amPage.navigation.paramName = sessionPage.navigation.paramName;
        amPage.navigation.parameterValue = sessionPage.navigation.parameterValue;

        // restore objects
        amPage.navigation.previousParams = { ...sessionPage.navigation.previousParams };
        amPage.navigation.currentParams = { ...sessionPage.navigation.currentParams };
        amPage.navigation.hasChanged = sessionPage.navigation.hasChanged;

    } else {
        backupPageToSession(amPage);
    }

    return amPage;
}




    function backupPageToSession(amPage){

        //var tstPage = JSON.stringify(amPage);

        sessionStorage.setItem('amPage', JSON.stringify(amPage));


       

    } 


    


    } (window));
