var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://builds.knightos.org/job/KnightOS/api/json');
xhr.onload = function() {
  var buildStatus = JSON.parse(this.responseText);
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://builds.knightos.org/job/KnightOS/' + buildStatus.lastSuccessfulBuild.number + '/api/json');
  xhr.onload = function() {
    var build = JSON.parse(this.responseText);
    var name = build.artifacts[0].fileName;
 //   var version = name.substr(9, name.length - 13);
    document.getElementById('download-link').href = "https://builds.knightos.org/job/KnightOS/" +
      buildStatus.lastSuccessfulBuild.number + "/artifact/" + name;
    document.getElementById('download-link').removeAttribute('disabled');
  };
  xhr.send();
};
xhr.send();
