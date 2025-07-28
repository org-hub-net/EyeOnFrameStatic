
(function(Global){

    var introArea = function(){

        var iareaSelf = this;
        
      

        /* New calculate function */
         iareaSelf.calculateInitialSize = function(mObj){
            
            var iArea = am$("amIntroArea", "dskCanvas", "introArea");
            var imgIntro = am$("introLogo", "amIntroArea", "intro-logo", [], "img");
            var contentWrapper  = am$("introContent", iArea.layout.id, "contentWrapper");
            var coverTitle = am$("coverTitle", contentWrapper.layout.id, "coverTitle", [], "h1");
            var coverImg = am$("coverImg", contentWrapper.layout.id, "coverImg", [], "IMG");
            var creatorLine = am$("creatorLine", contentWrapper.layout.id, "creatorLine", [], "p");
            
            iArea.layout.setObjectInPage();
            
        
         }

       
        
         iareaSelf.createElement = function(){
            
            // create an amLib object -- remove style from amLib object parameters

            var iArea = am$("amIntroArea", "dskCanvas", "introArea");
            
            
            
           // imgIntro.layout.addStyleInObject("margin", "auto");
          //  imgIntro.layout.addStyleInObject("display", "block");

            var imgIntro = am$("introLogo", "amIntroArea", "intro-logo", [], "img");
            var parentObj = document.getElementById('amIntroArea');
            var contentWrapper  = am$("introContent", iArea.layout.id, "contentWrapper");
            var coverTitle = am$("coverTitle", contentWrapper.layout.id, "coverTitle", [], "h1");
            var coverImg = am$("coverImg", contentWrapper.layout.id, "coverImg", [], "img");
            var creatorLine = am$("creatorLine", contentWrapper.layout.id, "creatorLine", [], "p");

            // Values for Objects 
            coverTitle.layout.displayData({value: "Bresson: Shooting a camera is ...",type:"innerHTML"});

      /*        var envpath = config.imagesBasePath;
             coverImg.layout.displayData({value: envpath+"Bresson.png",type:"imageSource"});     */
           
            
            if(window.location.hostname !== '127.0.0.1'){
                 coverImg.layout.displayData({value: "https://res.cloudinary.com/${cloudName}/video/upload/media/Bresson.png",type:"imageSource"});
                 imgIntro.layout.addImgSource("https://res.cloudinary.com/${cloudName}/video/upload/images/Logo3TemplateEyeblack.png");
            } else{
              coverImg.layout.displayData({value: "./media/Bresson.png",type:"imageSource"});
              imgIntro.layout.addImgSource("./images/Logo3TemplateEyeblack.png");
            }
       

            creatorLine.layout.displayData({value: "Tasos Niopas",type:"innerHTML"});
            
            iArea.layout.setObjectInPage();

        }
        
        // find the way to hida and display the menu

        return iareaSelf;

    }

     introFlashDisplay = function(){
        
        // if null (first time) 
      
         refreshPage = sessionStorage.getItem('refreshPage');
          console.log("introFlashDisplay");
        

          if(refreshPage==null || refreshPage =="No"){
            
              sessionStorage.setItem("refreshPage", "Yes");
              var timer = setInterval(function () {
              fade(document.getElementById("amIntroArea"));
              clearInterval(timer);
              console.log("First Load -> Fading intro ...")
              fade(document.getElementById("amIntroArea"));
              }, 4000);
          
            }else{
              /*
            console.log("Not First Load -> disappear  intro ...");
            var elem = document.getElementById("webCover");
            elem.parentNode.removeChild(elem);
            */
            var timer = setInterval(function () {
              clearInterval(timer);
             fade(document.getElementById("amIntroArea"));
              }, 2000);

             
          }

      }


function fade(element) {

    element.classList.add('fade');
    var mnw = document.getElementById("mainWrapper");
       console.log("executing refresh");
    mnw.style.visibility = "visible";         
    element.parentNode.removeChild(element);
   
}

    Global.introArea = introArea;
// end of call

}(window));
