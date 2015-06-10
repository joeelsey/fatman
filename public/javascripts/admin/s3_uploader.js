(function() {
    document.getElementById("coupon_image").onchange = function(){
        var files = document.getElementById("coupon_image").files;
        var file = files[0];
        if(file == null){
            alert("No file selected.");
        }
        else{
            get_signed_request(file);
        }
    };
})();

function get_signed_request(file){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/sign_s3?file_name="+file.name+"&file_type="+file.type);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                var response = JSON.parse(xhr.responseText);
                console.log("Signed url data: ", response);
                upload_file(file, response.signed_request, response.url);
            }
            else{
                console.log("Error: ", xhr.responseText);
            }
        }
    };
    xhr.send();
}

function upload_file(file, signed_request, url){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", signed_request);
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById("coupon_image_preview").src = url;
            document.getElementById("coupon_image_url").value = url;
        }
    };
    xhr.onerror = function() {
        alert("Could not upload file.");
    };
    xhr.send(file);
}