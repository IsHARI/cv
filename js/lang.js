// Switch languages
// Made by Maciej 'Ishari' Biazik

(function ($){
    "use strict";
    
    var dictionary;

    $.ajax({ 
        url:  'langs.json', 
        dataType: 'json', async: false, 
        success: function (langs) { dictionary = langs }
    });
    
    function setLang (langNo) {
        Object.entries(dictionary).forEach((item) => {
            $('.lang-'+item[0]).text(item[1][langNo])
        })
    }

    function highlightBtn (btn, btns) {
        btns.forEach(element => {
            element.removeClass('btn-primary');
            element.addClass('btn-secondary');
        });

        btn.removeClass('btn-secondary');
        btn.addClass('btn-primary');
    }

    var en = $('#lang-en');
    var pl = $('#lang-pl');

    var defaultLang = null;
    
    var results = new RegExp('[\?&]lang=([^&#]*)').exec(window.location.href);
    if (results != null)
        defaultLang = decodeURI (results[1]);


    $(() => {
        switch (defaultLang) {
            case 'pl':
                setLang(1);
                highlightBtn(pl, [en]);
                break;
            default:
                setLang(0);
                highlightBtn(en, [pl]);
                break;
        }
    });

    en.click((ev) => {
        setLang(0);
        highlightBtn(en, [pl]);
    });

    pl.click((ev) => {
        setLang(1);
        highlightBtn(pl, [en]);
    });
})(jQuery);