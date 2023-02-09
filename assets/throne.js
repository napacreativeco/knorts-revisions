
$(function() {

   
    // HERO PINNING
    jQuery('.content-wrapper').each(function() {
        let st = ScrollTrigger.create({
            trigger: this,
            pin: this,
            start: "50% 50%",
            pinSpacing: false,
            end: () => `+=${(this.parentElement.offsetHeight / 2) - this.offsetHeight}`,
        });
    });
    

    // PRODUCT INFO PINNING
    var prodRec = document.getElementsByClassName('product__info-container');
    var pinnedItem = document.getElementsByClassName('pinned-info');
    var firstUp = document.getElementById('product-data');

    // Works
    let st = ScrollTrigger.create({
        trigger: pinnedItem,
        pin: pinnedItem,
        start: "bottom 100%",
        end: "bottom 100%",
        pinSpacing: false,
        scrub: 1,
        endTrigger: prodRec,
    });

    var firstSect = document.getElementById("first-section");

    // let st = ScrollTrigger.create({
    //     trigger: pinnedItem,
    //     pin: pinnedItem,
    //     start: "bottom center",
    //     end: "top 100%",
    //     pinSpacing: false,
    //     scrub: 1,
    //     endTrigger: prodRec,
    // });

});

