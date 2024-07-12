$(document).ready(function() {
    let products = [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Fetch product data
    $.getJSON('./myimg/products.json', function(data) {
        products = data;
        console.log(products.image);
        displayProducts(products);
    });

    // Display products
    function displayProducts(productList) {
        $('#product-list').empty();
        productList.forEach(product => {
            $('#product-list').append(`
                <div class="product-card" data-id="${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <div class="priceValue">
                    <p class="old_price">$${product.old_price}</p>
                    <p class="new_price">$${product.new_price}</p>
                    </div>
                    <p>${product.description}</p>
                    <button class="details-button">Buy</button>
                    </div>
            `);
        });
    }

    // Search functionality
    $('#search').on('input', function() {
        const query = $(this).val().toLowerCase();
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
        displayProducts(filteredProducts);
    });

    // Sorting functionality
    $('#sort').on('change', function() {
        const sortBy = $(this).val();
        const sortedProducts = [...products].sort((a, b) => {
            if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'price') {
                return a.price - b.price;
            }
        });
        displayProducts(sortedProducts);
    });
});


document.getElementById('companylogo').addEventListener('click', function(){
    window.location.href="https://www.18pixels.com/"
})