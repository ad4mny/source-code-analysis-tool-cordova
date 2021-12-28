var token = JSON.parse(localStorage.getItem('token'));
var url = 'http://localhost/source-code-analysis-tool/';

var logout = function () {

    localStorage.clear();
    location.replace('index.html');

};