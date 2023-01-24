var productCardMarkup = 
  `<div class="swym-wishlist-grid grid product-grid grid--2-col-tablet-down
  grid--4-col-desktop">
		{{#products}} 
     <a href="{{du}}"aria-label="{{dt}}" class="full-unstyled-link grid__item swym-wishlist-item swym-is-anchor">
        <div class="swym-wishlist-image-wrapper">
          <img alt="" class="swym-wishlist-image" loading=lazy src="{{iu}}">
        </div>
        <div class="card__information">
          <div class="swym-title text-body uppercase swym-title-1">
            {{dt}}
          </div>
          <div class="swym-product-price swym-text swym-text-1">
            <div class="swym-product-final-price text-body uppercase swym-value">
              {{cu}}{{pr}}
            </div>
          </div>
        </div>
      </a> 
       {{/products}}
	</div>`;

function getVariantInfo(variants) {
	try {
		let variantKeys = ((variants && variants != "[]") ? Object.keys(JSON.parse(variants)[0]) : []),
			variantinfo;
		if (variantKeys.length > 0) {
			variantinfo = variantKeys[0];
			if (variantinfo == "Default Title") {
				variantinfo = "";
			}
		} else {
			variantinfo = "";
		}
		return variantinfo;
	} catch (err) {
		return variants;
	}
}
if (!window.SwymCallbacks) {
	window.SwymCallbacks = [];
}
window.SwymCallbacks.push(swymRenderWishlist); /* Init Here */

function swymRenderWishlist(swat) {
	// Get wishlist items
	swat.fetch(function(products) {
		console.log(products)
		var wishlistContentsContainer = document.getElementById("wishlist-items-container");
		var formattedWishlistedProducts = products.map(function(p) {
			p = SwymUtils.formatProductPrice(p); // formats product price and adds currency to product Object
			p.isInCart = _swat.platform.isInDeviceCart(p.epi) || (p.et == _swat.EventTypes.addToCart);
			p.variantinfo = (p.vi ? getVariantInfo(p.vi) : "");
			return p;
		});
		var productCardsMarkup = SwymUtils.renderTemplateString(productCardMarkup, {
			products: formattedWishlistedProducts
		});
		if(wishlistContentsContainer){
			wishlistContentsContainer.innerHTML = productCardsMarkup;
			attachClickListeners();
		} else{
		  console.log("Container not found, Wishlist Page element not found");
		}
		loadMoreProducts();
	});
}

function onAddToCartClick(e) {
	e.preventDefault();
	var productId = e.currentTarget.getAttribute("data-product-id");
	var variantId = e.currentTarget.getAttribute("data-variant-id");
	var du = e.target.getAttribute("data-product-url");
	e.target.innerHTML = "Adding..";
	window._swat.replayAddToCart({
		empi: productId,
		du: du
	}, variantId, function(c) {
		e.target.innerHTML = "Added to Cart";
		e.target.setAttribute("data-state-cart", "swym-added");
		console.log("Successfully added product to cart.", c);
	}, function(e) {
		console.log(e);
	});
}

function attachClickListeners() {
	var addToCartButtons = document.querySelectorAll("#swym-custom-add-toCartBtn");
	var removeBtns = document.querySelectorAll("#swym-remove-productBtn");
	//   Add to cart Btns
	for (var i = 0; i < addToCartButtons.length; i++) {
		addToCartButtons[i].addEventListener('click', onAddToCartClick, false);
	}
	//   Remove Buttons
	for (var k = 0; k < removeBtns.length; k++) {
		removeBtns[k].addEventListener('click', onRemoveBtnClick, false);
	}
	console.log("Events attached!");
}

function onRemoveBtnClick(e) {
	e.preventDefault();
	var epi = +e.currentTarget.getAttribute("data-variant-id");
	var empi = +e.currentTarget.getAttribute("data-product-id");
	window._swat.fetch(function(products) {
		products.forEach(function(product) {
			if (epi && empi && product.epi == epi && product.empi == empi) {
				window._swat.removeFromWishList(product, function() {
					if (!window.SwymCallbacks) {
						window.SwymCallbacks = [];
					}
					window.SwymCallbacks.push(swymRenderWishlist);
				});
			}
		});
	})
}

function loadMoreProducts() {
  let loadMoreBtn = document.querySelector('#LoadMore');
  const number = 24;
  let currentItem = number;
  let boxes = [...document.querySelectorAll('#wishlist-items-container .swym-wishlist-item')];
  boxes.forEach(function(item, index) {
    if (index >= currentItem) {
      item.classList.add('hidden');
    }
  })

  if (currentItem <= boxes.length) {
    loadMoreBtn.closest('.loadmore-wrapper').classList.remove('hidden');
  }

  loadMoreBtn.onclick = () => {
    loadMoreBtn.closest('.loadmore-wrapper').classList.add('loading');
    for (var i = currentItem; i < currentItem + number; i++) {
      boxes[i].classList.remove('hidden');
      loadMoreBtn.closest('.loadmore-wrapper').classList.remove('loading');
    }

    currentItem += number;
    if (currentItem >= boxes.length) {
      loadMoreBtn.classList.add('hidden');
    }
  }
}