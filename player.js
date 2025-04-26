document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById("video-player");
    const epgList = document.getElementById("epg-list");
    const urlParams = new URLSearchParams(window.location.search);
    const streamUrl = urlParams.get("url");
    
    if (streamUrl) {
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = streamUrl;
        }
    }

    // Load EPG from M3U first line (assuming first line contains XML link)
    fetch("channels.m3u")
        .then(response => response.text())
        .then(data => {
            const epgUrl = data.split("\n")[0].trim();
            return fetch(epgUrl);
        })
        .then(response => response.text())
        .then(xmlData => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, "application/xml");
            const programs = xmlDoc.getElementsByTagName("programme");

            for (let i = 0; i < programs.length; i++) {
                let start = programs[i].getAttribute("start");
                let title = programs[i].getElementsByTagName("title")[0].textContent;

                let listItem = document.createElement("li");
                listItem.textContent = `${start} - ${title}`;
                epgList.appendChild(listItem);
            }
        })
        .catch(error => console.error("Error loading EPG:", error));
});
