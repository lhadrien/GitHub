var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};

/**
 * Search Dictionary
 */
$(document).on('submit', 'form.search', function() { // Catch the form's submit event
    $('#listview').html('');
    $('.app').html('');
    $('form.extended').hide();

    $.ajax({
        type: 'POST',
        dataType: 'json',
        crossDomain: true,
        url: 'http://www.pandamanda.com/pm/wp-admin/admin-ajax.php',
        data: $(this).serialize(),
        beforeSend: function() {
            // Show spinner
            $.mobile.loading('show', {
                text: 'Searching...',
                textVisible: true,
                theme: 'a',
                textonly: false
            });
        }, 
        complete: function() {
            // Hide spinner
            $.mobile.loading('hide');
        }, 
        error: function(xhr, ajaxOptions, thrownError) {
        },
        success: function(data) { // if success then do...
            var output = '';

            output += '<li>' + data.length + ' results</li>';
            
            $.each(data, function(key, val) {
                output += '<li>' +
                            '<div class="sound"><a href="http://api.voicerss.org/?key=7f4987b0d4ce417d9404c58c4fb07ca8&src=' + val.simplified + '&hl=zh-cn&f=12khz_16bit_stereo&r=-5&ext=.mp3" class="sm2_button"></a></div>' +
                            '<h3 class="chinese" style="margin-bottom:15px">' + val.simplified + ' <span class="pinyin">' + val.pinyin_tones + '</span></h3>' +
                            '<p class="english" style="margin-left:15px">' + nl2br(val.english, true) + '</p>' +
                            '</li>';
            });
            
            $('#listview').append(output).listview('refresh');
            
            if ($('#q2').val() == '') {
                $('form.extended').show();
                $('#q2').val($('#q1').val());
            }
            
            soundManager.setup({
                url: 'js/soundmanager2/swf/',
                onready: function() {
                    soundManager.reboot();
                }
            });
        }
    });

    return false;
});

/**
 * From: http://phpjs.org/functions
 * original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
 * 
 * @param {type} str
 * @param {type} is_xhtml
 * @returns {String}
 */
function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}