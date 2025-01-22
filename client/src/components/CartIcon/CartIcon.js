import React from 'react';
import * as Icon from 'react-bootstrap-icons';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function CartIcon() {
  // Access the cart data from Redux
  const cart = useSelector((state) => state.cart.data);

  // Calculate the total quantity of items in the cart
  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="position-relative d-inline-block">
      {/* Cart Icon */}
      <Icon.Cart size={24} />

      {/* Badge for the number of items */}
      {totalQuantity > 0 && (
        <Badge
          pill
          bg="danger"
          className="position-absolute"
          style={{
            top: '-5px',
            right: '-10px',
            fontSize: '0.8rem',
          }}
        >
          {totalQuantity}
        </Badge>
      )}
    </div>
  );
}

export default CartIcon;
