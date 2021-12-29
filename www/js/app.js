var token = JSON.parse(localStorage.getItem('token'));
// var url = 'http://localhost/source-code-analysis-tool/';
var url = 'https://source-code-analysis-tools.000webhostapp.com/';

var logout = function () {

    localStorage.clear();
    location.replace('index.html');

};