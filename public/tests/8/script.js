(function () {

  var button = document.querySelector('[type=submit]');
  button.addEventListener('click', function (e) {
    var form = document.querySelector('form');
    var ajax = new XMLHttpRequest();
    var username = form.querySelector('[name=username]').value;
    var password = form.querySelector('[name=password]').value;
    var params;
    e.stopPropagation();

    ajax.onload = ajaxHandle;
    ajax.onerror = ajaxHandle;
    ajax.open("post", form.action, true);
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
