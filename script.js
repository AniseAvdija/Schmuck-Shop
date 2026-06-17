// Warenkorb Management
let cart = [];

// Produkte filtern
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');
        
        // Aktiven Button markieren
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Produkte filtern
        const products = document.querySelectorAll('.produkt-card');
        products.forEach(product => {
            if (filter === 'all') {
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                }, 10);
            } else if (product.getAttribute('data-kategorie') === filter) {
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                }, 10);
            } else {
                product.style.opacity = '0';
                setTimeout(() => {
                    product.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Produkt zum Warenkorb hinzufügen
function addToCart(productName, price) {
    cart.push({
        name: productName,
        price: price
    });
    
    updateCartCount();
    showNotification(`${productName} wurde zum Warenkorb hinzugefügt!`);
}

// Warenkorb aktualisieren
function updateCartCount() {
    document.getElementById('cart-count').textContent = cart.length;
}

// Warenkorb öffnen
document.querySelector('.cart-icon').addEventListener('click', function() {
    displayCart();
    document.getElementById('warenkorbModal').style.display = 'block';
});

// Warenkorb anzeigen
function displayCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p style="text-align: center; color: #999;">Ihr Warenkorb ist leer</p>';
        document.getElementById('totalPrice').textContent = '0.00';
        return;
    }
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    <small style="color: #999;">€${item.price.toFixed(2)}</small>
                </div>
                <button onclick="removeFromCart(${index})" style="background: #ff6b6b; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">Entfernen</button>
            </div>
        `;
    });
    
    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Produkt aus Warenkorb entfernen
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    displayCart();
}

// Warenkorb schließen
function closeCart() {
    document.getElementById('warenkorbModal').style.display = 'none';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Ihr Warenkorb ist leer!');
        return;
    }
    
    let total = 0;
    let itemsList = '';
    
    cart.forEach(item => {
        total += item.price;
        itemsList += `- ${item.name}: €${item.price.toFixed(2)}\n`;
    });
    
    const message = `Vielen Dank für Ihre Bestellung!\n\n${itemsList}\nGesamtpreis: €${total.toFixed(2)}\n\nWir werden Sie bald kontaktieren, um die Lieferung zu bestätigen.`;
    
    alert(message);
    cart = [];
    updateCartCount();
    closeCart();
}

// Benachrichtigung anzeigen
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #FFD700, #d4af37);
        color: #1a1a1a;
        padding: 15px 25px;
        border-radius: 5px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Modal außerhalb schließen
window.addEventListener('click', function(event) {
    const modal = document.getElementById('warenkorbModal');
    if (event.target === modal) {
        closeCart();
    }
});

// Formular Kontakt
document.querySelector('.kontakt-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Vielen Dank für Ihre Nachricht! Wir werden uns bald mit Ihnen in Verbindung setzen.');
    this.reset();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animation für Produktkarten
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.produkt-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    observer.observe(card);
});

// CSS für Animationen hinzufügen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);