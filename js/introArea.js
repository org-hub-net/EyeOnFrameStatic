(function(Global){


    var introArea = function(){

        var iareaSelf = this;

 /*       iareaSelf.calculateInitialSize = function(mObj){

            // this procedure sets the initial su=ize and it must be updated 
            // during the development, test and its findings

            var parentObj = document.getElementById('dskCanvas');
          //  var pheight = parentObj.clientHeight;
           // var pwidth = parentObj.clientWidth;
           var pheight = window.innerHeight;
            var pwidth = window.innerWidth;

            mObj.layout.addStyleInObject("width",  pwidth.toString()+"px");
            mObj.layout.addStyleInObject("height", pheight.toString()+"px" );
            mObj.layout.addStyleInObject("z-index", "30");
            mObj.layout.addStyleInObject("margin-bottom", "0px");
            mObj.layout.addStyleInObject("position", "fixed");
            mObj.layout.addStyleInObject("top",  "0px");  
            mObj.layout.addStyleInObject("left", "0");
            
            mObj.layout.addStyleInObject("overflow-x", "hidden");
            mObj.layout.addStyleInObject("background-color", "black");
            mObj.layout.addStyleInObject("text-align", "center");
            mObj.layout.addStyleInObject("display", "flex");
            mObj.layout.addStyleInObject("align-items", "center");
            mObj.layout.addStyleInObject("justify-content", "center");

            return mObj;

        }
*/

        /* New calculate function */
         iareaSelf.calculateInitialSize = function(mObj){
            
            var iArea = am$("amIntroArea", "dskCanvas", "introArea");
            var imgIntro = am$("introLogo", "amIntroArea", "intro-logo", [], "img");
            var contentWrapper  = am$("introContent", iArea.layout.id, "contentWrapper");
            var coverTitle = am$("coverTitle", contentWrapper.layout.id, "coverTitle", [], "h1");
            var coverImg = am$("coverImg", contentWrapper.layout.id, "coverImg", [], "IMG");
            var creatorLine = am$("creatorLine", contentWrapper.layout.id, "creatorLine", [], "p");
            
            iArea.layout.setObjectInPage();
            
         /*   iArea.layout.setObjectInPage();
                iArea.layout.addStyleInObject("position", "fixed");
                iArea.layout.addStyleInObject("top", "0");
                iArea.layout.addStyleInObject("left", "0");
                iArea.layout.addStyleInObject("width", "100vw");
                iArea.layout.addStyleInObject("height", "100vh");
                iArea.layout.addStyleInObject("display", "flex");
                iArea.layout.addStyleInObject("flex-direction", "column");
                iArea.layout.addStyleInObject("align-items", "center");
                iArea.layout.addStyleInObject("justify-content", "flex-start");
                iArea.layout.addStyleInObject("overflow", "hidden");
                iArea.layout.addStyleInObject("background", "#000");
                iArea.layout.addStyleInObject("font-family", "Arial, Helvetica, sans-serif");
                iArea.layout.addStyleInObject("color","#fff");
                iArea.layout.addStyleInObject("text-align", "center");
            


            imgIntro.layout.addStyleInObject("height", "auto");
            imgIntro.layout.addStyleInObject("margin-top", "2vh");
            imgIntro.layout.setObjectInPage();

            contentWrapper.layout.addStyleInObject("display", "flex");
            contentWrapper.layout.addStyleInObject("flex-direction", "column");
            contentWrapper.layout.addStyleInObject("align-items", "center");
            contentWrapper.layout.addStyleInObject("justify-content", "center");
            contentWrapper.layout.addStyleInObject("flex", "1");
            contentWrapper.layout.addStyleInObject("width", "100%");
            contentWrapper.layout.setObjectInPage();

            coverTitle.layout.addStyleInObject("width", "70vw");
            coverTitle.layout.addStyleInObject("max-width", "900px");
            coverTitle.layout.addStyleInObject("font-size", "2rem");
            coverTitle.layout.addStyleInObject("margin-bottom", "0.5rem");
            coverTitle.layout.addStyleInObject("overflow", "hidden");
            coverTitle.layout.addStyleInObject("display", "-webkit-box");

            coverTitle.layout.addStyleInObject("-webkit-box-orient", "vertical");
            coverTitle.layout.addStyleInObject("line-height", "2");
            coverTitle.layout.addStyleInObject("word-break", "break-word");
            coverTitle.layout.setObjectInPage();

            coverImg.layout.addStyleInObject("width", "70vw");
            coverImg.layout.addStyleInObject("max-width", "900px");
            coverImg.layout.addStyleInObject("height", "50vh");
            coverImg.layout.addStyleInObject("", "70vw");
            coverImg.layout.addStyleInObject("object-fit", "contain");
            coverImg.layout.setObjectInPage();

            creatorLine.layout.addStyleInObject("width", "70vw");
            creatorLine.layout.addStyleInObject("max-width", "900px");
            creatorLine.layout.addStyleInObject("margin-top", "0.5rem");
            creatorLine.layout.addStyleInObject("text-align", "right");
            creatorLine.layout.addStyleInObject("font-size", "1rem");
            creatorLine.layout.addStyleInObject("white-space", "nowrap");
            creatorLine.layout.addStyleInObject("overflow", "hidden");
            creatorLine.layout.addStyleInObject("text-overflow", "ellipsis");
            creatorLine.layout.setObjectInPage();
            */

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
            coverImg.layout.displayData({value: "./media/Bresson.png",type:"imageSource"});
            creatorLine.layout.displayData({value: "Tasos Niopas",type:"innerHTML"});
            imgIntro.layout.addImgSource("./images/Logo3TemplateEyeblack.png");
            iArea.layout.setObjectInPage();


           //  iArea = iareaSelf.calculateInitialSize(iArea);


          


            // ORIGINAL VALUES 
       //    imgIntro.layout.addStyleInObject("width", (parentObj.clientWidth/2).toString() + "px");
       //    imgIntro.layout.setObjectInPage();
       //     iArea.layout.setObjectInPage();

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
