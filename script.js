$(document).ready(function(){
    initAudio($('.playlist li:first-child'));
    function initAudio(elem) {
        var url = elem.attr('audiourl');
        console.log(url);
        var title = elem.text();
        var artist = elem.attr('artist');
        $('#message1').text(title);
        $('#message2').text(artist);
        player = new Audio(url);
        player.play();
        timer();
        $('.playlist li').removeClass('active');
        elem.addClass('active');
    }

    function playAudio() {
        player.play();
    }

    function pauseAudio() {
        player.pause();
    }

    function stopAudio() {
        player.pause();
        player.currentTime = 0;
    }

    function timer(){
        $(player).bind('timeupdate', function(){
        var track_length = player.duration;
        $('#timecodelast').html((track_length/60).toFixed(2));
        var secs = player.currentTime;
        var progress = (secs/track_length) * 100;
        
        $('#progressbar').css({'width' : progress+'%'});
        var tcMins = parseInt(secs/60);
        var tcSecs = parseInt(secs - (tcMins * 60));
            if (tcSecs < 10) { tcSecs = '0' + tcSecs; }
                $('#timecode').html(tcMins + ':' + tcSecs);
        });
    }
    $('.playlist li').click(function () {
        stopAudio();
        initAudio($(this));
    });

    $("#play-bt").click(function(){
        playAudio();
    })

    $("#pause-bt").click(function(){
        pauseAudio();
    })

    $("#stop-bt").click(function(){
        stopAudio();
    })

    $('#next-bt').click(function (e) {
    e.preventDefault();
    stopAudio();
    var next = $('.playlist li.active').next();
        if (next.length == 0) {
            next = $('.playlist li:first-child');
        }
        initAudio(next);
    });

    $('#prev-bt').click(function (e) {
    e.preventDefault();
    stopAudio();
    var prev = $('.playlist li.active').prev();
        if (prev.length == 0) {
          prev = $('.playlist li:last-child');
        }
        initAudio(prev);
    });
      timer();
      var progressBar = document.getElementById("progressContainer");
      progressBar.addEventListener("click", seek);
    function seek(e) {
        console.log("hai");
        var percent = e.offsetX / this.offsetWidth;
        player.currentTime = percent * player.duration;
        progressBar.value = percent / 100;
    }
});
         