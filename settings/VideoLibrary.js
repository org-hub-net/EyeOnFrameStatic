(function (Global) {

  const LibraryApp = function () {

    const LibraryAppModule = this;

    // --- Video list ---
    LibraryAppModule.videoList = [
      {
        id: 5487564,
        title: "Photography",
        urlParam: "photography",
        createDate: "2025-09-02",
        userName: "Tasos Niopas",
        views: 120,
        dataSrc: "Shooting_official2.mp4",
        dataPoster: "Cameron2iago.jpg",
        userPhoto: "foapth.jpg",
        profileUrl: "https://example.com/profile",
        cover: "Yes",
      },
      {
        id: 27934856,
        title: "Berlin",
        urlParam: "tasos-niopas-berlin",
        createDate: "2025-09-19",
        userName: "Tasos Niopas",
        views: 340,
        dataSrc: "Berlin.mp4",
        dataPoster: "Berlin2024finalcropp.jpg",
        userPhoto: "foapth.jpg",
        profileUrl: "https://example.com/profile",
        cover: "No",
      },
      {
        id: 555339,
        title: "Night Portraits",
        urlParam: "tasos-niopas-nightPortraits",
        createDate: "2025-09-19",
        userName: "Tasos Niopas",
        views: 340,
        dataSrc: "NightPortraits.mp4",
        dataPoster: "NightPortraitCollection.png",
        userPhoto: "foapth.jpg",
        profileUrl: "https://example.com/profile",
        cover: "No",
      },
      {
        id: 4322145,
        title: "London Photographic - Just Scheduled",
        urlParam: "tasos-niopas",
        createDate: "2025-10-19",
        userName: "Tasos Niopas",
        views: 340,
        dataSrc: "LondonPhotographic.mp4",
        dataPoster: "LonPhotoEvent2.png",
        userPhoto: "foapth.jpg",
        profileUrl: "https://example.com/profile",
        cover: "No",
      }
    ];

    // --- Helpers ---
    LibraryAppModule.getAll = () => LibraryAppModule.videoList;
    LibraryAppModule.getCover = () => LibraryAppModule.videoList.find((v) => v.cover === "Yes") || null;
    LibraryAppModule.getById = (id) =>
    LibraryAppModule.videoList.find((v) => v.id === Number(id)) || null;

LibraryAppModule.displayRequestedVideo = async function() {
    try {
        // Φόρτωση config
        const configModule = await import(
            window.location.hostname !== '127.0.0.1'
                ? '../config.prod.js'
                : '../config.dev.js'
        );
        
        const config = configModule.default;

        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm'];

        const getExtension = (filename) =>
            filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 1).toLowerCase();

        const isImage = (ext) => imageExtensions.includes(ext);
        const isVideo = (ext) => videoExtensions.includes(ext);

        // Παίρνουμε videoId από navigation (είναι Map)
        const videoId = amPage.navigation?.currentParams?.video;
        let video = videoId ? this.getById(videoId) : this.getCover();
        if (!video) return null;

        // --- Video element ---
        const videoElem = document.getElementById("video");
        if (videoElem) {
            const ext = getExtension(video.dataSrc);
            let videoSrc = '';
            let posterSrc = '';

            if (isVideo(ext)) {
                videoSrc = `${config.mediaBasePath}${video.dataSrc}`;
                posterSrc = video.dataPoster
                    ? `${config.mediaBaseImagesPath}${video.dataPoster}`
                    : `${config.mediaBaseImagesPath}${video.dataSrc.replace(/\.[^.]+$/, '.jpg')}`;
            } else if (isImage(ext)) {
                videoSrc = `${config.mediaBaseImagesPath}${video.dataSrc}`;
            }

            videoElem.setAttribute("data-src", video.dataSrc);
            videoElem.setAttribute("data-poster", video.dataPoster || "");
            videoElem.src = videoSrc;
            if (posterSrc) videoElem.poster = posterSrc;
        }

        // --- Overlay creator image ---
        const creatorImg = document.querySelector(".creator-photo");
        if (creatorImg) {
            const imgSrc = `${config.mediaBaseImagesPath}${video.userPhoto || "foapth.jpg"}`;
            creatorImg.src = imgSrc;
            creatorImg.alt = video.userName || "";
        }

        // --- Τίτλος, δημιουργός, views ---
        const titleElem = document.getElementById("title");
        if (titleElem) titleElem.textContent = video.title || "Untitled";

        const dateElem = document.getElementById("createDate");
        if (dateElem) dateElem.textContent = video.createDate || "";

        const creatorLink = document.getElementById("creator");
        if (creatorLink) {
            creatorLink.textContent = video.userName || "Unknown";
            creatorLink.href = video.profileUrl || "#";
        }

        const viewsElem = document.getElementById("views");
        if (viewsElem) viewsElem.textContent = (video.views || 0).toLocaleString();

        console.log("✅ Video loaded:", video);
        return video;

    } catch (err) {
        console.error("❌ displayRequestedVideo error:", err);
        return null;
    }
};

    return LibraryAppModule;

  }

  Global.videoLibrary = LibraryApp;

}(window));
