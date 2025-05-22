let list = document.querySelectorAll('.list .item');
let totalPriceElement = document.createElement('div');
totalPriceElement.className = 'total-price';
totalPriceElement.innerHTML = 'Total: 0 da';
document.querySelector('.panier').appendChild(totalPriceElement);

function updateTotalPrice() {
    let total = 0;
    document.querySelectorAll('.panier .item').forEach(item => {
        const priceText = item.querySelector('.prix').textContent;
        const price = parseFloat(priceText.replace(/[^\d.,]/g, '').replace(',', '.'));
        const quantityElement = item.querySelector('.quantity');
        const quantity = quantityElement ? parseInt(quantityElement.textContent) || 1 : 1;
        total += price * quantity;
    });
    totalPriceElement.textContent = `Total: ${total.toFixed(2)} da`;
}

list.forEach(item => {
    item.addEventListener('click', function(event){
        if(event.target.classList.contains('ajout')){
            var itemNew = item.cloneNode(true);
            let checkIsset = false;

           
            itemNew.querySelector('.ajout').style.display = 'none';
            itemNew.querySelector('.supp').style.display = 'inline-block';

            
            itemNew.querySelector('.supp').addEventListener('click', function() {
                itemNew.remove();
                updateTotalPrice();
            });

            
            const quantityControls = document.createElement('div');
            quantityControls.className = 'quantity-controls';
            quantityControls.innerHTML = `
                <span class="decrease">-</span>
                <span class="quantity">1</span>
                <span class="increase">+</span>
            `;
            itemNew.appendChild(quantityControls);

            
            quantityControls.querySelector('.increase').addEventListener('click', function(e) {
                e.stopPropagation();
                const quantityElement = quantityControls.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                quantityElement.textContent = quantity + 1;
                updateTotalPrice();
            });

            
            quantityControls.querySelector('.decrease').addEventListener('click', function(e) {
                e.stopPropagation();
                const quantityElement = quantityControls.querySelector('.quantity');
                let quantity = parseInt(quantityElement.textContent);
                if (quantity > 1) {
                    quantityElement.textContent = quantity - 1;
                    updateTotalPrice();
                }
            });

            
            let listCart = document.querySelectorAll('.panier .item');
            listCart.forEach(cart => {
                if(cart.getAttribute('data-key') == itemNew.getAttribute('data-key')){
                    checkIsset = true;
                    const quantityElement = cart.querySelector('.quantity');
                    let quantity = parseInt(quantityElement.textContent);
                    quantityElement.textContent = quantity + 1;
                    cart.classList.add('danger');
                    setTimeout(function(){
                        cart.classList.remove('danger');
                    }, 1000);
                }
            });

            
            if(!checkIsset){
                document.querySelector('.listCart').appendChild(itemNew);
            }

            updateTotalPrice();
        }
    });
});

function Remove(key){
    let listCart = document.querySelectorAll('.panier .item');
    listCart.forEach(item => {
        if(item.getAttribute('data-key') == key){
            item.remove();
            updateTotalPrice();
            return;
        }
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const cartToggle = document.createElement('button');
    cartToggle.className = 'cart-toggle';
    cartToggle.innerHTML = '🛒';
    document.body.appendChild(cartToggle);
    
    const cart = document.querySelector('.panier');
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);
    
    cartToggle.addEventListener('click', function() {
        cart.classList.toggle('active');
        overlay.style.display = cart.classList.contains('active') ? 'block' : 'none';
    });
    
    overlay.addEventListener('click', function() {
        cart.classList.remove('active');
        overlay.style.display = 'none';
    });
    
    
    updateTotalPrice();
});


itemNew.style.transform = 'scale(0.9)';
itemNew.style.transition = 'transform 0.3s ease';
setTimeout(() => {
    itemNew.style.transform = 'scale(1)';
}, 10);


if(!checkIsset){
    const clone = item.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.top = item.getBoundingClientRect().top + 'px';
    clone.style.left = item.getBoundingClientRect().left + 'px';
    clone.style.width = item.offsetWidth + 'px';
    clone.style.transition = 'all 0.5s cubic-bezier(0.65, 0, 0.35, 1)';
    clone.style.zIndex = '1000';
    document.body.appendChild(clone);
    
    const cartPosition = document.querySelector('.panier').getBoundingClientRect();
    setTimeout(() => {
        clone.style.top = cartPosition.top + 'px';
        clone.style.left = cartPosition.left + 'px';
        clone.style.transform = 'scale(0.1)';
        clone.style.opacity = '0.5';
        
        setTimeout(() => {
            clone.remove();
            document.querySelector('.listCart').appendChild(itemNew);
            updateTotalPrice();
            
            
            itemNew.style.animation = 'bounce 0.5s';
            setTimeout(() => {
                itemNew.style.animation = '';
            }, 500);
        }, 500);
    }, 10);
}


const quantityControls = document.createElement('div');
quantityControls.className = 'quantity-controls';
quantityControls.innerHTML = `
    <button class="decrease" aria-label="Diminuer quantité">-</button>
    <input type="number" class="quantity" value="1" min="1" max="99">
    <button class="increase" aria-label="Augmenter quantité">+</button>
`;


const quantityInput = quantityControls.querySelector('.quantity');
quantityInput.addEventListener('change', function(e) {
    if(this.value < 1) this.value = 1;
    if(this.value > 99) this.value = 99;
    updateTotalPrice();
});

quantityInput.addEventListener('keydown', function(e) {
    if(e.key === 'e' || e.key === '-' || e.key === '+') {
        e.preventDefault();
    }
});
function updateCartCount() {
    let count = 0;
    document.querySelectorAll('.panier .item').forEach(item => {
        const quantity = parseInt(item.querySelector('.quantity').value) || 1;
        count += quantity;
    });
    cartToggle.setAttribute('data-count', count);
    cartToggle.style.display = count > 0 ? 'flex' : 'none';
}


itemNew.querySelector('.supp').addEventListener('click', function() {
    if(confirm('Voulez-vous vraiment supprimer cet article du panier ?')) {
        itemNew.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            itemNew.remove();
            updateTotalPrice();
            updateCartCount();
        }, 300);
    }
});
