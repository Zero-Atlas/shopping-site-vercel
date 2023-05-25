const priceString = (price) => {
  return price
    .toString()
    .split("")
    .map((c, i, arr) => ((arr.length - i) % 3 === 0 && i !== 0 ? `.${c}` : c))
    .join("");
};

module.exports = (name, phone, address, cart) => {
  const productList = cart
    .map(
      (item) => `<tr>
  <td>${item.product.name}</td>
  <td style="width: 10rem;"><img src="${item.product.img1}" alt="${
        item.product.name
      }" width="100%" /></td>
  <td>${priceString(item.product.price)} VND</td>
  <td>${item.quantity}</td>
  <td>${priceString(item.product.price * item.quantity)} VND</td>
</tr>`
    )
    .join(" ");

  let html = `<div style="background-color: #333;color: #eee;padding: 1rem; ">
  <h1>Hello ${name}</h1>
  <p>Phone: ${phone}</p>
  <p>Address: ${address}</p>
  <table style="text-align: center;font-size:1.3rem;color: #eee; margin: 1rem; border: none" border>
    <thead>
      <tr>
        <th style="font-weight: 500;padding:0.5rem;">Product Name</th>
        <th style="font-weight: 500;padding:0.5rem;">Image</th>
        <th style="font-weight: 500;padding:0.5rem;">Price</th>
        <th style="font-weight: 500;padding:0.5rem;">Quantity</th>
        <th style="font-weight: 500;padding:0.5rem;">Total</th>
      </tr>
    </thead>
    <tbody>
      ${productList}
    </tbody>
  </table>

  <h2>Total:</h2>
  <h2>${priceString(
    cart.reduce((sum, p) => (sum += p.quantity * p.product.price), 0)
  )} VND</h2>

  <h2 style="margin-top: 1rem">Thank you!</h2>
</div>`;
  return html;
};
