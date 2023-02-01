
$(function() {

    // Works, but not with Flexbox
    // var controller = new ScrollMagic.Controller();

    // jQuery('.content-wrapper').each(function() {
    //     var scene = new ScrollMagic.Scene({ 
    //         triggerElement: this,
    //         triggerHook: 0.5,
    //         duration: '100%'}).setPin(this,  {pushfollowers: false}).addTo(controller);
    // });

    ScrollTrigger.refresh();
    jQuery('.content-wrapper').each(function() {
        let st = ScrollTrigger.create({
            trigger: this,
            pin: this,
            start: "50% 50%",
            pinSpacing: false,
            end: () => `+=${(this.parentElement.offsetHeight / 2) - this.offsetHeight}`,
        });
    });

});

