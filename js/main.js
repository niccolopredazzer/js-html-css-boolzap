$(document).ready(function(){
    $('#microfono').click(mandaMessaggi);

    //selezionamo la chat dalla preview
    $('.box-preview-chat .preview-chat').click(function(){
        $('.preview-chat').removeClass('.selected');
        $(this).addClass('.selected');
        var utenteChat = $(this).data('codiceUtente');
        var nameChat = $(this).find('.nome').text();
        var avatarChat = $(this).find('.immaginina').clone();
        $('.contenitore-messaggi').each(function(){
            if (utenteChat == $(this).data('codiceUtente')) {
                $('.contenitore-messaggi').removeClass('active');
                $(this).addClass('active');
                $('.nav-destra .avatar').html(avatarChat);
                $('.nav-destra .testo p').text(nameChat);

            }
        });
    });

    //cambio microfono con aeroplanino
    $('#contenuto').focus(function() {
        $('#microfono i').toggleClass('.fas fa-microphone .fas fa-paper-plane');
    }).blur(function() {
        $('#microfono i').toggleClass('.fas fa-microphone .fas fa-paper-plane');
    });

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

    // menu selezionabile dalla freccia
    $(document).on('click', '.fa-angle-down', function(){
       $(this).parent('.messaggio-text-template').children('.menu').slideToggle(300);
   });
    $(document).on('click', '.fa-angle-down', function(){
       $(this).parent('.messaggio-text-bianco-template').children('.menu').slideToggle(300);
   });

   // eliminare il messaggio
   $(document).on('click', '.delete', function(){
       $(this).parents('.messaggio-text-template').remove();
   });
   $(document).on('click', '.delete', function(){
       $(this).parents('.messaggio-text-bianco-template').remove();
   });


   //uso handlebars
  /* var sourceContatti = $('#preview-template').html();
   var templateContatto = Handlebars.compile(sourceContatti);


   var listaContatti = [
       {
           numeroConversazione: 0,
           source:'img/avatar2.png',
           nomeContatto: 'Daniele'
       },
       {
           numeroConversazione: 1,
           source:'img/avatar3.png',
           nomeContatto: 'Harry Potter'
       },
       {
           numeroConversazione: 2,
           source:'img/avatar4.png',
           nomeContatto: 'Ernesto'
       },
       {
           numeroConversazione: 3,
           source:'img/avatar5.png',
           nomeContatto: 'Camillo Benso Conte di Cavour'
       },
       {
           numeroConversazione: 4,
           source:'img/avatar6.png',
           nomeContatto: 'Eleonora'
       },
       {
           numeroConversazione: 5,
           source:'img/avatar7.png',
           nomeContatto: 'Francesca'
       },
       {
           numeroConversazione: 6,
           source:'img/avatar7.png',
           nomeContatto: 'Federico'
       },
       {
           numeroConversazione: 7,
           source:'img/avatar7.png',
           nomeContatto: 'Davide'
       }
   ];

   for (var i = 0; i < listaContatti.length; i++) {
           var contattoTemp = templateContatto(listaContatti[i]);
           $('.box-preview-chat').append(contattoTemp);
 */
                                /* funzioni */

    //funzione per i messaggi a destra
    function mandaMessaggi() {
        var messaggioInput = $('#contenuto').val();
        if (messaggioInput.trim().length > 0) {
            $('#contenuto').val('');
            var messaggio = $('.messaggi-destra-template .messaggio-text-template').clone();
            messaggio.children('.testo-messaggio').text(messaggioInput);
            messaggio.children('.orario').text(orario);
            $('.contenitore-messaggi.active').append(messaggio);
            scroll();
            setTimeout(riceviMessaggi, 1000);                    //setTimeout mi permette di avere un messaggio automatico dopo 1 secondo che ho inserito il mio
        }

    }

    //funzione per i messaggi a sinistra
    function riceviMessaggi() {
        var messaggioAuto = $('.messaggi-sinistra-template .messaggio-text-bianco-template').clone();
        messaggioAuto.children('.testo-messaggio').text('ciao');
        messaggioAuto.children('.orario').text(orario);
        $('.contenitore-messaggi.active').append(messaggioAuto);
        scroll();
    }

    //funzione per l'orario
    function orario () {
        var date = new Date()
        var ore = date.getHours();
        var minuti = date.getMinutes();
        if (minuti < 10) {
            minuti = '0' + minuti;
        }
        var orarioChat = ore + ':' + minuti;
        return orarioChat;
    }

    //scroll function
    function scroll() {
        var pixelscroll = $('.contenitore-messaggi.active').height();
        $('.contenitore-messaggi.active').scrollTop(pixelscroll);
    }

});
