$(document).ready(function() {
  var $algorithm = $('#algorithm');
  var $algorithmStatus = $('#algorithm-status');
  var $endpoint = $('#endpoint');
  var $error = $('#error');
  var $maskedImage = $('#masked-image');
  var $imagePath = $('#image-path');
  var $morph = $('#morph');
  var $progress = $('#progress');
  var $runMasking = $('#run-masking');

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

  function runImageMasking() {
    var endpoint = $endpoint.val();
    var imagePath = $imagePath.val();
    var algorithm = $algorithm.val();
    var morph = $morph.val()

    var request = endpoint +
      '/mask' +
      '?image_path=' + imagePath +
      '&algorithm=' + algorithm +
      '&morph=' + morph;

    $.ajax({
      url: request,
      json: true,
      success: function(response) {
        var base64 = 'data:' + response.type + ';' + response.encoding + ', ' + response.content;
        $maskedImage.attr('src', base64);
        $progress.hide();
        $maskedImage.show();
      },
      error: function(error) {
        $error.show();
        $progress.hide();
        $maskedImage.hide();
        console.error(error);
      }
    });

    $maskedImage.hide();
    $error.hide();
    $progress.show();
  }

  loadSupportedAlgorithms();

  $endpoint.change(loadSupportedAlgorithms);
  $runMasking.click(runImageMasking);
});
