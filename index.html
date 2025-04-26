<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Stream Player</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <h1>Live Stream Player</h1>
    
    <input type="text" id="streamURL" placeholder="Enter stream URL">
    <button onclick="playStream()">Play</button>

    <video id="videoPlayer" controls></video>

    <script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
    <script>
        function playStream() {
            var url = document.getElementById('streamURL').value;
            var video = document.getElementById('videoPlayer');

            if (Hls.isSupported()) {
                var hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function() {
                    video.play();
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
                video.play();
            } else {
                alert("HLS is not supported in your browser.");
            }
        }
    </script>

</body>
</html>
