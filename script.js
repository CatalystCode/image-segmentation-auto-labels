$(document).ready(function() {
  $('#submit').click(function() {
    var endpoint = $('#endpoint').val();
    var image_path = $('#input').val();
    var algorithm = $('#algorithm').val();
    var morph = $('#morph').val()

    var request = endpoint +
      '?image_path=' + image_path +
      '&algorithm=' + algorithm +
      '&morph=' + morph;

    $.ajax({
      url: request,
      json: true,
      success: function(response) {
        var base64 = 'data:' + response.type + ';' + response.encoding + ', ' + response.content;
        $('#image').attr('src', base64);
        $('#progress').hide();
        $('#image').show();
      },
      error: function(error) {
        $('#error').show();
        $('#progress').hide();
        $('#image').hide();
        console.error(error);
      }
    });

    $('#image').hide();
    $('#error').hide();
    $('#progress').show();
  });
});
