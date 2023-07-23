let secugen_lic = "";
export function CallSGIFPGetData(index, setFinger_data) {
  var uri = "https://localhost:8443/SGIFPCapture";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let fpobject = JSON.parse(xmlhttp.responseText);
      // console.log("here is the first template: " , fpobject);
      setFinger_data({
        [`img${index}`]: "data:image/bmp;base64," + fpobject.BMPBase64,
        [`template${index}`]: fpobject.TemplateBase64,
        [`quality${index}`]: fpobject.ImageQuality,
      });
      console.log("fpobject", fpobject);
      // matchingfingers(fpobject.TemplateBase64);
    } else if (xmlhttp.status == 404) {
      console.log("error", xmlhttp);
    } else if (xmlhttp.status == 54) {
      alert("time out try again");
    }
  };
  xmlhttp.onerror = function () {
    console.log("error", xmlhttp);
  };
  var params = "Timeout=" + "10000";
  params += "&Quality=" + "50";
  params += "&licstr=" + encodeURIComponent(secugen_lic);
  params += "&templateFormat=" + "ISO";
  xmlhttp.open("POST", uri, true);
  xmlhttp.send(params);
}
