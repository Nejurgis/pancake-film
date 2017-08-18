$(document).ready(function() {
    $("img").unveil();

    // console.log($(window).width());
    var windowWidth = $(window).width()
    update();
    // console.log(windowWidth);
    $(window).resize(function() {
        windowWidth = $(window).width()
        // update();
    });
    // console.log(windowWidth);

    function update() {
        $('.imagecontainer').imagescrubber({
            width: windowWidth,
            items: 'img',
            axis: 'x'
        });
    }

    jQuery(function($) {
        console.log('works');
        $('.film').click(function() {
            var itemid = '#div' + $(this).attr('target'); //id of the element to show/hide.

            //Show the element if nothing is shown.
            if ($('.active').length === 0) {
                $(itemid).slideDown();
                $(itemid).addClass('active');

                //Hide the element if it is shown.
            } else if (itemid == "#" + $('.active').attr('id')) {
                $('.active').slideUp();
                $(itemid).removeClass('active');

                //Otherwise, switch out the current element for the next one sequentially.
            } else {
                $('.active').slideUp(function() {
                    $(this).removeClass('active');
                    if ($(".targetDiv:animated").length === 0) {
                        $(itemid).slideDown();
                        $(itemid).addClass('active');
                    }
                });
            }
        });
    });



    $("img").unveil(100);
});
