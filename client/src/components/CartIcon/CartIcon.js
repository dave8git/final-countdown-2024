import React, { useState } from 'react';
import *  as Icon  from 'react-bootstrap-icons';
import { Badge } from 'react-bootstrap';

function CartIcon() {
  // Example state for the number of items in the cart
  const [itemCount, setItemCount] = useState(5); // Replace with your logic

  return (
    <div className="position-relative d-inline-block">
      {/* Cart Icon */}
      <><Icon.Cart size={24} />  </>{/* This line was commented out in your original code */}

      {/* Badge for the number of items */}
      {itemCount > 0 && (
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
          {itemCount}
        </Badge>
      )}
    </div>
  );
}

export default CartIcon;
