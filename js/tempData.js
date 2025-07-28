   
(function(Global){


    var tempDB = function(){
    
        
            var tempDBConstruct = this;


            tempDBConstruct.getPost = function(postId){

                var posts  = [

                    {
                        id : 0,
                        title : "",
                        description: "",
                        type: "Asset, Event Promotion, Event Gallery, Happens Now, Generic, Document(Article/News)",
                        creator: "",
                        owner: "",
                        createDate: "",
                        views: 0,
                        presentation: [
                            {
                                type: "",
                                source: "",
                                creator: ""
                            }
                        ],
                        items:[ 
                            {
                                
                            }
                        ],
                        layout:{

                        },
                        assets:[
                            {
                                id: 0,
                                title: "",
                                description: "",
                                creator: "",
                                owner: "",
                                createDate: "",
                                lastSaleDate: "",
                                price: ""
                            }
                        ],


                    }


                ];

                return posts.find(p => p.id == postId);


            }
            
            tempDBConstruct.getCurrentCover = function(coverId){

                var cover = {
                        id : 0,
                        postId: 0,
                        title : "",
                        description: "",
                        type: "Asset, Event Promotion, Event Gallery, Happens Now, Generic, Document",
                        creator: "",
                        owner: "",
                        createDate: "",
                        views: 0
                } 

                return cover;

            } 


             tempDBConstruct.getCover = function(coverId){

                var covers  = [

                    {
                        id : 0,
                        postId: 0,
                        title : "",
                        description: "",
                        creator: "",
                        owner: "",
                        createDate: "",
                        post:   {
                                id : 0,
                                title : "",
                                description: "",
                                type: "Asset, Event Promotion, Event Gallery, Happens Now, Generic, Document",
                                creator: "",
                                owner: "",
                                createDate: "",
                                views: 0,
                                presentation: [
                                    {
                                        type: "",
                                        source: "",
                                        creator: ""
                                    }
                                ],
                                items:[ 
                                    {
                                        
                                    }
                                ],
                                layout:{

                                },
                                assets:[
                                    {
                                        id: 0,
                                        title: "",
                                        description: "",
                                        creator: "",
                                        owner: "",
                                        createDate: "",
                                        lastSaleDate: "",
                                        price: ""
                                    }
                                ]

                        }
                    }



                ];
                   return covers.find(p => p.id == coverId);


            }

    
        return tempDBConstruct
    
    }
    
    
       Global.tempDB = tempDB;
    
    }(window));
    
    
    
