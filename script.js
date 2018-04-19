$(document).ready(function() {
  var $algorithm = $('#algorithm');
  var $algorithmStatus = $('#algorithm-status');
  var $endpoint = $('#endpoint');
  var $error = $('#error');
  var $maskFigure = $('#mask-figure');
  var $maskImage = $('#mask-image');
  var $maskCaption = $('#mask-caption');
  var $imagePath = $('#image-path');
  var $morph = $('#morph');
  var $progress = $('#progress');
  var $runMasking = $('#run-masking');

  function loadSupportedAlgorithms() {
    var endpoint = $endpoint.val();

    $.ajax({
      url: endpoint + '/algorithms',
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
        $algorithmStatus.text('Error while loading supported algorithms. Is docker running?');
        console.error(error);
      }
    });

    $algorithmStatus.show();
    $algorithmStatus.parent().removeClass('has-error');
    $algorithmStatus.text('Loading...');
  }

  function runImageMasking() {
    var endpoint = $endpoint.val();
    var imagePath = $imagePath.val();
    var algorithm = $algorithm.val();
    var morph = $morph.val()

    $.ajax({
      url: endpoint + '/mask',
      method: 'POST',
      json: true,
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      data: JSON.stringify({
        image_path: imagePath,
        algorithm: algorithm,
        morph: morph
      }),
      success: function(response) {
        var base64 = 'data:' + response.type + ';' + response.encoding + ', ' + response.content;
        $maskImage.attr('src', base64);
        $maskCaption.text('Result for masking algorithm "' + algorithm + '"');
        $progress.hide();
        $maskFigure.show();
      },
      error: function(error) {
        $error.show();
        $progress.hide();
        $maskFigure.hide();
        console.error(error);
      }
    });

    $maskFigure.hide();
    $error.hide();
    $progress.show();
  }

  loadSupportedAlgorithms();

  $endpoint.change(loadSupportedAlgorithms);
  $runMasking.click(runImageMasking);
});
