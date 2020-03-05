$(document).ready(function(){
    $('#microfono').click(function(){
        mandaMessaggi();
        setTimeout(riceviMessaggi, 1000);              //setTimeout mi permette di avere un messaggio automatico dopo 1 secondo che ho inserito il mio
    });

    //orario
    var orario = new Date()
    var ore = orario.getHours();
    var minuti = orario.getMinutes();


    //funzione per i messaggi a destra
    function mandaMessaggi() {
        var messaggioInput = $('#contenuto').val();
        $('#contenuto').val('');
        var messaggio = $('.messaggi-destra .messaggio-text').clone();
        messaggio.children('.testo-messaggio').text(messaggioInput);
        messaggio.children('.orario').text(ore + ':' + minuti);
        $('.chat').append(messaggio);
    }


    //funzione per i messaggi a sinistra
    function riceviMessaggi(){
        var messaggioAuto = $('.messaggio-text-bianco').clone();
        messaggioAuto.children('.testo-messaggio').text('ciao');
        messaggioAuto.children('.orario').text(ore + ':' + minuti);
        $('.chat').append(messaggioAuto);
    }


    // parte della ricerca
    $('#cerca-contatti').keyup(function(event){
        var carattereFiltro = $(this).val().toLowerCase();
        $('.preview-chat .testo .nome').each(function(){
            if ($(this).text().toLowerCase().includes(carattereFiltro)) {
                $(this).parentsUntil('.box-preview-chat').show();
            } else {
                $(this).parentsUntil('.box-preview-chat').hide();
            }
        });
    });

//non funziona
    $(document).keydown(function(event) {
          switch (event.key) {
               case 13:
               mandaMessaggi();
                    break;
               default:
          }
    });




});
