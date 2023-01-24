class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector('details');
    this.content = this.mainDetailsToggle.querySelector('summary').nextElementSibling;

    this.mainDetailsToggle.addEventListener('focusout', this.onFocusOut.bind(this));
    this.mainDetailsToggle.addEventListener('toggle', this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    })
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute('open')) {
      this.animations.forEach(animation => animation.play());
    } else {
      this.animations.forEach(animation => animation.cancel());
    }
  }

  close() {
    this.mainDetailsToggle.removeAttribute('open');
    this.mainDetailsToggle.querySelector('summary').setAttribute('aria-expanded', false);
  }
}

customElements.define('details-disclosure', DetailsDisclosure);

class HeaderMenu extends HTMLElement {
  constructor() {
    super();
    this.header = document.querySelector('.header-wrapper');
    this.menuItems = this.header.querySelectorAll('.mega-menu--shop .mega-menu__link');
    this.megaMenuImages = this.header.querySelectorAll('.mega-menu--shop img');
    
    this.querySelector('.mega-menu__content').style.paddingLeft = `${this.offsetLeft}px`;
    this.menuItems.forEach((menu) => {
      menu.addEventListener('mouseover', (event) => {
        this.onMouseOver(event.target);
      });
    });
  }
  onMouseOver(target) {
    let menu = target.innerHTML;
    this.megaMenuImages.forEach((image) => {
      let altImage = image.getAttribute(('alt'));
      image.style.display = 'none';
      if (menu.trim() == altImage) {
        image.style.display = 'block';
      }
    })
  }
}

customElements.define('header-menu', HeaderMenu);
