var jsGallery = {};
jsGallery.imagesDescription = null;
getImagesDescription();

function getImagesDescription(file) {
    file = "https://raw.githubusercontent.com/Dmitry-Karnitsky/jsGallery/master/imagesReference.json";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200) {
                var allText = rawFile.responseText;
                jsGallery.imagesDescription = JSON.parse(allText);
            };
        };
    };
    rawFile.send(null);
};












//<input type="file" id="fileinput" />
//function readSingleFile(evt) {
//    //Retrieve the first (and only!) File from the FileList object
//    var f = evt.target.files[0];

//    if (f) {
//        var r = new FileReader();
//        r.onload = function (e) {
//            var contents = e.target.result;
//            alert("Got the file.n"
//                  + "name: " + f.name + "n"
//                  + "type: " + f.type + "n"
//                  + "size: " + f.size + " bytesn"
//                  + "starts with: " + contents.substr(0, contents.indexOf("n"))
//            );
//        }
//        r.readAsText(f);
//    } else {
//        alert("Failed to load file");
//    }
//}

//document.getElementById('fileinput').addEventListener('change', readSingleFile, false);