const fileInput = document.getElementById("UrlFileInput"),
downloadBtn = document.getElementById("DownUrlFile");
backHome = document.getElementById("back-home");

backHome.addEventListener("click", ()=>{
    window.location.href="../index.html";
})

downloadBtn.addEventListener("click", e => {
    e.preventDefault();
    downloadBtn.innerText = "Downloading...";
    fetchFile(fileInput.value);
});

function fetchFile(url) {
    fetch(url).then(res => res.blob()).then(file => {
        let tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement("a");
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        downloadBtn.innerText = "Download";
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
    }).catch(() => {
        alert("Failed to download file!");
        downloadBtn.innerText = "Download";
    });
}

backHome.addEventListener("click", () => {
    window.location.href="../index.html";
});