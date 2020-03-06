$(document).ready(function(){
    $('#microfono').click(function(){
        mandaMessaggi();
        setTimeout(riceviMessaggi, 1000);    //setTimeout mi permette di avere un messaggio automatico dopo 1 secondo che ho inserito il mio
    });

    //cambio microfono con aeroplanino
    $('#contenuto').focus(function() {
        $('#microfono i').toggleClass('.fas fa-microphone .fas fa-paper-plane');
    }).blur(function() {
        $('#microfono i').toggleClass('.fas fa-microphone .fas fa-paper-plane');
    });

    //orario
    var orario = new Date()
    var ore = orario.getHours();
    var minuti = orario.getMinutes();

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
        var messaggioAuto = $('.messaggi-sinistra .messaggio-text-bianco').clone();
        messaggioAuto.children('.testo-messaggio').text('ciao');
        messaggioAuto.children('.orario').text(ore + ':' + minuti);
        $('.chat').append(messaggioAuto);
    }




});
