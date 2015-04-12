(function () {

  var form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    var ajax = new XMLHttpRequest();
    var username = this.querySelector('[name=username]').value;
    var password = this.querySelector('[name=password]').value;
    var params;
    e.preventDefault();

    ajax.onload = ajaxHandle;
    ajax.onerror = ajaxHandle;
    ajax.open("post", this.action, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    params = 'username=' + username + '&password=' + password;
    ajax.send(params);

    return false;
  });

function ajaxHandle(progress) {
  var responseText = this.responseText;
  if (this.status >= 200 && this.status < 300) {
    ajaxSuccess(progress, responseText);
    return;
  }
  ajaxFail(progress, responseText);
}
  
function ajaxSuccess(progress, responseText) {
  alert('Logged in: ' + responseText);
}
function ajaxFail(progress, responseText) {
  alert('Log in fail: ' + responseText);
}

}());
