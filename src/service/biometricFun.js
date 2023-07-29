let secugen_lic = "";
export function CallSGIFPGetData(index, setFinger_data, setMatchScore) {
  var uri = "https://localhost:8443/SGIFPCapture";
  console.log("setMatchScore", setMatchScore, setFinger_data);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      let fpobject = JSON.parse(xmlhttp.responseText);
      // console.log("here is the first template: " , fpobject);
      matchingfingers(fpobject.TemplateBase64, setMatchScore);
      setFinger_data((prev) => ({
        ...prev,
        [`img${index}`]: "data:image/bmp;base64," + fpobject.BMPBase64,
        [`template${index}`]: fpobject.TemplateBase64,
        [`quality${index}`]: fpobject.ImageQuality,
      }));
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

function matchingfingers(user_data, setMatchScore) {
  var uri = "https://localhost:8443/SGIMatchScore";
  var xmlhttp = new XMLHttpRequest();
  let ex =
    "Rk1SACAyMAAAAACiAAABBAEsAMUAxQEAAABLFoAtAFOGAEC6AFTeAEAbAFUKAECnAFthAECdAHVkAEApAIcGAEA1AIuDAIBbAJtyAEBXAKt1AEA/ALSKAEBSAM19AIAXANWyAICfANZUAIA8ANu1AIBOANvZAEC1AN3RAIBGAN7FAECPAOBfAIDAAOFRAECMAOXWAIBFAPLDAIC8APdOAAAA";
  var params = "Timeout=" + "100000";
  params += "&Template1=" + encodeURIComponent(user_data);
  params += "&Template2=" + encodeURIComponent(ex);

  params += "&TemplateFormat=" + "ISO ";
  xmlhttp.open("POST", uri, true);
  xmlhttp.send(params);

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var fpobjecttt = JSON.parse(xmlhttp.responseText);
      setMatchScore(fpobjecttt.MatchingScore);
      console.log("matching response::::: ", fpobjecttt);
      // callback(fpobjecttt); // Call the callback with the result
    } else if (xmlhttp.status == 404) {
      console.log("EEEEEEEEEEEEEEE");
      failCall(xmlhttp.status);
      callback(0); // Call the callback with an error
    }
  };
}
