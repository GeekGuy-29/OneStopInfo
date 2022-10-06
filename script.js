fetch("http://192.168.29.27:8767")
  .then(function (response) {
    return jobs.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });
function appendData(data) {
    var mainContainer = document.getElementById("myData");
        for (var i = 0; i < data.length; i++) {
            var div = document.createElement("div");
            div.innerHTML = 'Name: ' + data[i].JobRole + ' ' + data[i].JobDescription;
            mainContainer.appendChild(div);
    }
}


