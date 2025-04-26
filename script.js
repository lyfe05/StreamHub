const channels = [
    { name: "Trace Mziki", icon: "https://www.dstv.com/media/upcgizd5/trace-mziki-logo-set-1_320x320.png?width=164", link: "http://starshare.org:8080/live/Akhil/Akhil/476795.m3u8" },
    { name: "BBC News", icon: "https://example.com/bbc.png", link: "https://example.com/bbc.m3u8" },
    { name: "ESPN", icon: "https://example.com/espn.png", link: "https://example.com/espn.m3u8" }
];

const container = document.getElementById("channels");
channels.forEach(channel => {
    let item = document.createElement("div");
    item.className = "channel";
    item.innerHTML = `<img src="${channel.icon}" alt="${channel.name}">
                      <p>${channel.name}</p>`;
    item.onclick = () => window.location.href = `watch.html?channel=${encodeURIComponent(channel.link)}`;
    container.appendChild(item);
});
