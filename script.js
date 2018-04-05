$(document).ready(function() {
  var $algorithm = $('#algorithm');
  var $algorithmStatus = $('#algorithm-status');
  var $endpoint = $('#endpoint');
  var $error = $('#error');
  var $image = $('#image');
  var $input = $('#input');
  var $morph = $('#morph');
  var $progress = $('#progress');
  var $submit = $('#submit');

  function loadSupportedAlgorithms() {
    $.ajax({
      url: $endpoint.val() + '/algorithms',
      json: true,
      success: function(response) {
        $algorithmStatus.hide();
        $algorithm.children().remove();
        response.forEach(function(algorithm) {
          $algorithm.append($('<option />').val(algorithm).text(algorithm));
        });
      },
      error: function(error) {
        $algorithmStatus.parent().addClass('has-error');
        $algorithmStatus.text('Error while loading supported algorithms.');
        console.error(error);
      }
    });

    $algorithmStatus.show();
    $algorithmStatus.parent().removeClass('has-error');
    $algorithmStatus.text('Loading...');
  }

  loadSupportedAlgorithms();

  $endpoint.change(loadSupportedAlgorithms);

  $submit.click(function() {
    var endpoint = $endpoint.val();
    var image_path = $input.val();
    var algorithm = $algorithm.val();
    var morph = $morph.val()

    var request = endpoint +
      '/mask' +
      '?image_path=' + image_path +
      '&algorithm=' + algorithm +
      '&morph=' + morph;

    $.ajax({
      url: request,
      json: true,
      success: function(response) {
        var base64 = 'data:' + response.type + ';' + response.encoding + ', ' + response.content;
        $image.attr('src', base64);
        $progress.hide();
        $image.show();
      },
      error: function(error) {
        $error.show();
        $progress.hide();
        $image.hide();
        console.error(error);
      }
    });

    $image.hide();
    $error.hide();
    $progress.show();
  });
});
