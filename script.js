document.addEventListener("DOMContentLoaded", function () {
    const m3uUrl = "channels.m3u"; // Change to your actual M3U file path
    const channelList = document.getElementById("channel-list");

    fetch(m3uUrl)
        .then(response => response.text())
        .then(data => {
            const lines = data.split("\n");
            let channels = [];

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].startsWith("#EXTINF")) {
                    let title = lines[i].split(",")[1].trim();
                    let streamUrl = lines[i + 1].trim();
                    channels.push({ title, streamUrl });
                }
            }

            channels.forEach(channel => {
                let channelDiv = document.createElement("div");
                channelDiv.className = "channel";
                channelDiv.textContent = channel.title;
                channelDiv.onclick = function () {
                    window.location.href = `stream.html?url=${encodeURIComponent(channel.streamUrl)}`;
                };
                channelList.appendChild(channelDiv);
            });
        })
        .catch(error => console.error("Error loading M3U file:", error));
});
