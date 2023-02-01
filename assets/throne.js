
$(function() {

    // Works, but not with Flexbox
    // var controller = new ScrollMagic.Controller();

    // jQuery('.content-wrapper').each(function() {
    //     var scene = new ScrollMagic.Scene({ 
    //         triggerElement: this,
    //         triggerHook: 0.5,
    //         duration: '100%'}).setPin(this,  {pushfollowers: false}).addTo(controller);
    // });

    jQuery('.content-wrapper').each(function() {
        let st = ScrollTrigger.create({
            trigger: this,
            pin: this,
            start: "top center",
            end: "50%",
            pinSpacing: false
        });
    });

});

