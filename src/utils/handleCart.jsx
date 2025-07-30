const getCart = async () => {
    const response = fetch('http://localhost:5000/api/cart', {
        methog: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch cart items');
            }
            return response.json();
        })
        .catch((err) => {
            console.error(`Error in getCart: ${err}`);
        });
}

const addToCart = (id) => {
    console.log(id);
    const token = localStorage.getItem("token");
    let response = fetch('http://localhost:5000/api/cart', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${token}`,
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: 1
                })
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not add to cart");
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                console.log(data);
            })
            .catch((err) => {
                console.error(`Login Error: ${err}`);
            })
}

const increaseQuantity = async(id) => {
    console.log(id);
    const token = localStorage.getItem("token");
    const fuse = `http://localhost:5000/api/cart/${id}`;
    console.log(fuse);
    let response = fetch(fuse, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${token}`,
                },
                body: JSON.stringify({
                    quantity: 1
                })
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Could not add more");
                }
                return response.json();
                // response.json();
            })
            .then((data) => {
                console.log(data);
                return data;
            })
            .catch((err) => {
                console.error(`Login Error: ${err}`);
            })
}

export {getCart, addToCart, increaseQuantity};