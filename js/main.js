$(document).ready(function(){
    $('#microfono').click(function(){
        mandaMessaggi();
        setTimeout(riceviMessaggi, 1000);
    });

    //orario
    var orario = new Date()
    var ore = orario.getHours();
    var minuti = orario.getMinutes();

    function mandaMessaggi() {
        var messaggioInput = $('#contenuto').val();
        $('#contenuto').val('');
        var messaggio = $('.messaggi-destra .messaggio-text').clone();
        messaggio.children('.testo-messaggio').text(messaggioInput);
        messaggio.children('.orario').text(ore + ':' + minuti);
        $('.chat').append(messaggio);

    }

    function riceviMessaggi(){
        var messaggio = $('.messaggio-text-bianco').clone();
        messaggio.children('.testo-messaggio').text('ciao');
        messaggio.children('.orario').text(ore + ':' + minuti);
        $('.chat').append(messaggio);
    }

//non funziona
    $(document).keydown(function(event) {
          switch (event.key) {
               case 'Enter':
               mandaMessaggi();
                    break;
               default:
          }
    });




});
