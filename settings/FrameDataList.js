

var VideoDataModule = {
    dataList: [
        {
            id: 5487564,
            title: "Photography",
            urlParam: "photography",
            createDate: "2025-09-02",
            userName: "Tasos Niopas",
            views: 120,
            dataSrc: "Shooting_official2.mp4",
            dataPoster: "Cameron2iago.jpg",
            cover: 'Yes'
        },
        {
            id: 27934856,
            title: "Berlin",
            urlParam: "tasos-niopas-berlin",
            createDate: "2025-09-19",
            userName: "Tasos Niopas",
            views: 340,
            dataSrc: "Berlin",
            dataPoster: "Berlin2024finalcropp.png",
            cover: "No"
        }
    ],

    // Επιστρέφει όλη τη λίστα
    getAll: function() {
        return this.dataList;
    },

    // Επιστρέφει αντικείμενο βάσει cover
    getCover: function() {
        return this.dataList.find(item => item.cover === 'Yes') || null;
    },

    // Επιστρέφει αντικείμενο βάσει id
    getById: function(id) {
        return this.dataList.find(item => item.id === Number(id)) || null;
    }
};







// Χρήση:
//console.log(VideoDataModule.getAll()); // Επιστρέφει όλη τη λίστα
//console.log(VideoDataModule.getByParam("proto-video")); // Επιστρέφει το πρώτο αντικείμενο
