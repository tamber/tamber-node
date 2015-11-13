function jsonToQueryString(json) {
    return '' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

Comms.prototype.Post = function(engine, object, command, params, callback){	
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Handle response.
            var response = xhr.responseText;
            console.log(response);
            var jsonObj = JSON.parse(response);
            if (callback != null){
                callback(jsonObj.result, jsonObj.error);
            }
        }
    };
    params.object = object;
    params.command = command;

    xhr.open("POST", engine.Client.ApiUrl);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(engine.Key +":");
    var urlEncodedJsonQuery = jsonToQueryString(params);
    console.log(urlEncodedJsonQuery);
    xhr.send(urlEncodedJsonQuery);
}

Comms.prototype.Get = function(engine, object, command, params, callback){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Handle response.
            var response = xhr.responseText;
            console.log(response);
            var jsonObj = JSON.parse(response);
            if (callback != null){
                callback(jsonObj.result, jsonObj.error);
            }
        }
    };
    params.object = object;
    params.command = command;

    xhr.open("GET", engine.Client.ApiUrl);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(engine.Key +":");
    var urlEncodedJsonQuery = '?'+jsonToQueryString(params);
    console.log(urlEncodedJsonQuery);
    xhr.send(urlEncodedJsonQuery);

}

module.exports = Comms;