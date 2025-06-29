export default function getCart(){
    let cart = localStorage.getItem("cart");
    if(cart == null){
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        return [];
    }
    cart = JSON.parse(cart);
    return cart;
}

export function addToCart(product, quantity){
    const cart = getCart();

    const productIndex = cart.findIndex((prdct) => prdct.productId === product.productId);
    //-1, index
    if(productIndex == -1){
        cart.push(
            {
                productId : product.productId,
                name : product.productName,
                altName : product.altName,
                price : product.price,
                lebeledPrice : product.lebeledPrice,
                image : product.images[0],
                quantity : quantity,
            }
        )
    }else{
        cart[productIndex].quantity += quantity;
        if(cart[productIndex].quantity <= 0){
            cart = cart.filter((prdct) => prdct.productId !== product.productId)
        }
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}

export function removeFromCart(productId){
    let cart = getCart();
    cart = cart.filter((product) => product.productId !== productId);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
}