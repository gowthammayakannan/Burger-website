const ingredients = [
    { name: 'bun', price: 20, added: true, cssClass: '' },
    { name: 'patty', price: 50, added: true, cssClass: 'patty', emoji: '🍖' },
    { name: 'cheese', price: 10, added: true, cssClass: 'cheese', emoji: '🧀' },
    { name: 'tomato', price: 20, added: true, cssClass: 'tomato', emoji: '🍅' },
    { name: 'onion', price: 20, added: true, cssClass: 'onion', emoji: '🧅' },
    { name: 'lettuce', price: 20, added: true, cssClass: 'lettuce', emoji: '🥬' },
];

const burgerPreview = document.getElementById('burger-preview');
const ingredientsList = document.getElementById('ingredients-list');
const optionButtons = document.querySelectorAll('.option-button');
const totalPriceElement = document.querySelector('.total-price');
const checkoutButton = document.querySelector('.checkout-button');


const updateBurgerPreview = () => {
    burgerPreview.innerHTML = '';

    // Add top bun
    const topBun = document.createElement('div');
    topBun.className = 'burger-layer top-bun';
    topBun.style.top = '0';
    burgerPreview.appendChild(topBun);

    // Add ingredient layers
    const layers = ingredients.filter(i => i.added && i.name !== 'bun');
    const layerHeight = 15;
    const topBunHeight = 20;
    const spacing = 1;

    layers.forEach((i, index) => {
        const layer = document.createElement('div');
        layer.className = `burger-layer ingredient ${i.cssClass}`;
        layer.style.position = 'absolute';
        layer.style.left = '50%';
        layer.style.transform = 'translateX(-50%)';
        layer.style.top = `${topBunHeight + (layerHeight + spacing) * index}px`;
        layer.style.animationDelay = `${index * 0.15}s`;
        burgerPreview.appendChild(layer);
    });

    // Add bottom bun
    const bottomBun = document.createElement('div');
    bottomBun.className = 'burger-layer bottom-bun';
    bottomBun.style.position = 'absolute';
    bottomBun.style.left = '50%';
    bottomBun.style.transform = 'translateX(-50%)';
    bottomBun.style.top = `${topBunHeight + (layerHeight + spacing) * layers.length}px`;
    burgerPreview.appendChild(bottomBun);
};


/*const updateBurgerPreview = () => {
    // Clear all children
    burgerPreview.innerHTML = '';

    // Add top bun
    const topBun = document.createElement('div');
    topBun.className = 'burger-layer top-bun';
    burgerPreview.appendChild(topBun);

    // Add ingredient layers with animation
    const layers = ingredients.filter(i => i.added && i.name !== 'bun');
    layers.forEach((i, index) => {
        const layer = document.createElement('div');
        layer.className = `burger-layer ingredient ${i.cssClass}`;
        layer.style.top = `${index * 20 + 20}px`;
        layer.style.animationDelay = `${index * 0.15}s`;
        burgerPreview.appendChild(layer);
    });

    // Add bottom bun
    const bottomBun = document.createElement('div');
    bottomBun.className = 'burger-layer bottom-bun';
    bottomBun.style.top = `${layers.length * 20 + 20}px`;
    burgerPreview.appendChild(bottomBun);
};*/


const updateIngredientsList = () => {
    ingredientsList.innerHTML = '<h3>Ingredients</h3>';
    ingredients
        .filter(i => i.name !== 'bun')
        .forEach(i => {
            const item = document.createElement('div');
            item.className = 'ingredient-item';
            item.innerHTML = `<span class="check-mark">${i.added ? '✓' : ''}</span>${i.name.charAt(0).toUpperCase() + i.name.slice(1)}`;
            ingredientsList.appendChild(item);
        });
};

const calculateTotal = () =>
    ingredients.reduce((total, ing) => total + 5 + (ing.added ? ing.price : 0), 0);

const updateUI = () => {
    updateBurgerPreview();
    updateIngredientsList();
    totalPriceElement.textContent = `INR ${calculateTotal()}`;
    optionButtons.forEach(btn => {
        const ing = ingredients.find(i => i.name === btn.dataset.ingredient);
        btn.classList.toggle('selected', ing.added);
    });
};

optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const ing = ingredients.find(i => i.name === btn.dataset.ingredient);
        if (ing) ing.added = !ing.added;
        updateUI();
    });
});

checkoutButton.addEventListener('click', () => {
    const selected = ingredients.filter(i => i.added).map(i => i.name);
    alert(`Thank you! You've ordered a burger with: ${selected.join(', ')}.\nTotal: INR ${calculateTotal()}`);
});

updateUI();
