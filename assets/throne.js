
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
            start: "50% 50%",
            pinSpacing: false,
            end: () => `+=${(this.parentElement.offsetHeight / 2) - this.offsetHeight}`,
        });
    });
    

    var prodRec = document.getElementsByClassName('product-recommendations');
    var mobileTitle = document.getElementsByClassName('pinned-info');
    var firstUp = document.getElementsByClassName('product__media-list');

    // let stayz = ScrollTrigger.create({
    //     pin: mobileTitle,
    //     trigger: firstUp,
    //     duration: firstUp.height,
    // }).setClassToggle("triggered");

});

