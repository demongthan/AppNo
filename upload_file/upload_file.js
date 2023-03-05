const cloudName = "namnv57fpt"; 
const uploadPreset = "f2yeaaw9";

uploadedArea = document.querySelector(".uploaded-area");
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const fileUploads = JSON.parse(localStorage.getItem("fileUploads") || "[]"); 

const myWidget = cloudinary.createUploadWidget(
  {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
        console.log(result.fileInput, result.fileSize, result.tag);
        console.log(result);
        console.log(result.info);

        let currentDate = new Date(),
        month = months[currentDate.getMonth()],
        day = currentDate.getDate(),
        year = currentDate.getFullYear();

        let url=result.info.secure_url;
        let fileName=result.info.original_filename;

        let fileUploadInfo={url, fileName, date: `${month} ${day}, ${year}`};
        fileUploads.push(fileUploadInfo);
        localStorage.setItem("fileUploads", JSON.stringify(fileUploads));

        showFileUpload();
    }
  }
);

function showFileUpload(){
  if(!fileUploads) return;
  document.querySelectorAll(".row").forEach(li => li.remove());
  console.log(document.querySelectorAll(".row"));
  fileUploads.forEach((file, id) => {
    let uploadedHTML = `<li class="row">
            <a class="content upload" href="${file.url}">
                <div class="details">
                <span class="name">${file.fileName} • Uploaded</span>
                <span class="size">${file.date}</span>
            </div>
            </a>
            <i onclick="deleteFile(${id})" class="fas fa-trash"></i>
            </li>`;
        uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
  });
}

function deleteFile(fileId) {
  let confirmDel = confirm("Are you sure you want to delete this file?");
  if(!confirmDel) return;
  fileUploads.splice(fileId, 1);
  localStorage.setItem("fileUploads", JSON.stringify(fileUploads));
  showFileUpload();
}

showFileUpload();

fileInput = document.querySelector(".btn-upload");
backHome = document.getElementById("back-home");

fileInput.addEventListener("click",e=>{
    myWidget.open();
});

backHome.addEventListener("click", () => {
  window.location.href="../index.html";
});