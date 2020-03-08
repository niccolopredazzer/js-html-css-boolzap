$(document).ready(function(){
    $('#microfono').click(function(){
        mandaMessaggi();
    });

    //selezionamo la chat dalla preview
    $('.box-preview-chat .preview-chat').click(function(){
        $('.preview-chat').removeClass('.selected');
        $(this).addClass('.selected');
        var utenteChat = $(this).data('codiceUtente');
        $('.contenitore-messaggi').each(function(){
            if (utenteChat == $(this).data('codiceUtente')) {
                $('.contenitore-messaggi').removeClass('active');
                $(this).addClass('active');
            }
        });
    });

    //cambio microfono con aeroplanino
    $('#contenuto').focus(function() {
        $('#microfono i').toggleClass('.fas fa-microphone .fas fa-paper-plane');
    }).blur(function() {
        $('#microfono i').toggleClass('.fas fa-microphone .fas fa-paper-plane');
    });

    //orario
    var date = new Date()
    var ore = date.getHours();
    var minuti = date.getMinutes();
    if (minuti < 10) {
        minuti = '0' + minuti;
    }
    var orarioChat = ore + ':' + minuti;

    //assegno al tasto enter (13) la stessa azione del click
    var input = document.getElementById("contenuto");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("microfono").click();
        }
    });
    //FINALMENTE HO TROVATO UN FIX AL PROBLEMA DEL REFRESH DELLA PAGINA CON ENTER
    $(function() {
    $("form").submit(function() { return false; });
    });

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



                                /* funzioni */

    //funzione per i messaggi a destra
    function mandaMessaggi() {
        var messaggioInput = $('#contenuto').val();
        if (messaggioInput.trim().length > 0) {
            $('#contenuto').val('');
            var messaggio = $('.messaggi-destra-template .messaggio-text-template').clone();
            messaggio.children('.testo-messaggio').text(messaggioInput);
            messaggio.children('.orario').text(orarioChat);
            $('.chat').append(messaggio);
            scroll();
            setTimeout(riceviMessaggi, 1000);                    //setTimeout mi permette di avere un messaggio automatico dopo 1 secondo che ho inserito il mio
        }

    }


    //funzione per i messaggi a sinistra
    function riceviMessaggi(){
        var messaggioAuto = $('.messaggi-sinistra-template .messaggio-text-bianco-template').clone();
        messaggioAuto.children('.testo-messaggio').text('ciao');
        messaggioAuto.children('.orario').text(orarioChat);
        $('.chat').append(messaggioAuto);
        scroll();
    }

    //scroll function
    function scroll() {
        var pixelscroll = $('.chat').height();
        $('.chat').scrollTop(pixelscroll);
    }

});
