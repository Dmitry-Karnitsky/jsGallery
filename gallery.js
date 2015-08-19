// just for me i moved all functions and properties to the top
// sorry if it's not the javascript style
var jsGallery = {};
jsGallery.imagesDescription = null;
jsGallery.isAnimationExecutes = false;
jsGallery.focusedElement = 0;
jsGallery.focusGalleryElement = focusGalleryElement;
jsGallery.getImagesDescription = getImagesDescription;
jsGallery.setLoadingGalleryImageState = setLoadingGalleryImageState;
jsGallery.getImagesGalleryHtml = getImagesGalleryHtml;
jsGallery.animate = animate;

document.addEventListener("keydown", keyDownHandler);

jsGallery.getImagesDescription();


function getImagesDescription() {
    var jsonFile = "https://raw.githubusercontent.com/Dmitry-Karnitsky/jsGallery/master/imagesReference.json";
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", jsonFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200) {
                var allText = rawFile.responseText;
                jsGallery.imagesDescription = JSON.parse(allText);
                jsGallery.setLoadingGalleryImageState(false);
                document.getElementById("gallery-wrapper").innerHTML +=
                    jsGallery.getImagesGalleryHtml("images-gallery", "images-gallery", 12, "gallery-element-wrapper", "gallery-element-wrapper", "title-wrapper text", jsGallery.imagesDescription.images);
                jsGallery.focusGalleryElement(0);
            };
        };
    };
    rawFile.send(null);
};

function setLoadingGalleryImageState(isVisible) {
    document.getElementById("loading-gallery").style.display = isVisible ? "block" : "none";
};

function focusGalleryElement(id) {
    document.getElementById("gallery-element-wrapper" + jsGallery.focusedElement).classList.remove("active");
    document.getElementById("gallery-element-wrapper" + id).classList.add("active");
    jsGallery.focusedElement = id;
};

function getImagesGalleryHtml(galleryClass, galleryId, imagesCount, galleryElementId, galleryElementClass, titleWrapperClass, images) {
    var imagesWrapperHtml = '',
        imagesGalleryHtml = '',
        i;

    for (i = 0; i < imagesCount; i++) {
        imagesWrapperHtml += '<div class="' + galleryElementClass + '" id="' + galleryElementId + i + '">' +
                                '<img src="' + images[i].url + '" title="' + images[i].title + '"/>' +
                                '<div class="' + titleWrapperClass + '">' + images[i].title + '</div>' +
                             '</div>';
    };


    imagesGalleryHtml = '<div class="' + galleryClass + '" id="' + galleryId + '">' +
                            imagesWrapperHtml +
                        '</div>';
    return imagesGalleryHtml;
};

function requestAnimation(drawCallback) {
    jsGallery.isAnimationExecutes = true;
    animate({
        draw: drawCallback,
        duration: 500,
        timing: function (timeFraction) {
            return timeFraction;
        },
        endAnimation: function () {
            jsGallery.isAnimationExecutes = false;
        }
    });
};

function keyDownHandler(e) {
    var nextElementIndex,
        gallery = document.getElementById("gallery-wrapper"),
        nextElement,
        scrollValue,
        scrollBarValueOld;

    e = e || window.event;

    if (jsGallery.isAnimationExecutes) {
        return;
    };

    switch (e.which || e.keyCode) {
        case 37:
            nextElementIndex = (jsGallery.focusedElement > 0) ? jsGallery.focusedElement - 1 : 0;
            nextElement = document.getElementById("gallery-element-wrapper" + nextElementIndex);
            scrollValue = gallery.getBoundingClientRect().left + nextElement.getBoundingClientRect().left - 150;

            scrollBarValueOld = gallery.scrollLeft;

            if (scrollValue < 0) {
                scrollValue = -1 * (scrollValue);
                requestAnimation(function (progress) {
                    gallery.scrollLeft = scrollBarValueOld - progress * scrollValue;
                });
            };

            jsGallery.focusGalleryElement(nextElementIndex);
            break;

        case 39:
            if (jsGallery.focusedElement === jsGallery.imagesDescription.images.length) return;
            nextElementIndex = (jsGallery.focusedElement < jsGallery.imagesDescription.images.length - 1) ?
                jsGallery.focusedElement + 1 : jsGallery.imagesDescription.images.length - 1;

            nextElement = document.getElementById("gallery-element-wrapper" + nextElementIndex);
            scrollValue = gallery.getBoundingClientRect().right - nextElement.getBoundingClientRect().right - 150;

            scrollBarValueOld = gallery.scrollLeft;

            if (scrollValue < 0) {

                scrollValue = -1 * (scrollValue);
                requestAnimation(function (progress) {
                    gallery.scrollLeft = scrollBarValueOld + progress * scrollValue;
                });
            };
            jsGallery.focusGalleryElement(nextElementIndex);
            break;

        default: return;
            e.preventDefault();
    }
};



function animate(options) {
    var start = performance.now();

    requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) {
            options.endAnimation();
            timeFraction = 1;
        }

        var progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        };

    });
};



// this code can load json from filesystem
// it doesn't attached to code above
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