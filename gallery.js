﻿(function readTextFile(file) {
    file = "https://raw.githubusercontent.com/Dmitry-Karnitsky/ASP.NET.1501.Project/master/ORM/EntityModel.cs";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
})();