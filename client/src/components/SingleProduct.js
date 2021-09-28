import { useState } from "react";
import { Card, Image, Button, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
} from "../utils/actions";
import { idbPromise } from "../utils/helpers";

function SingleProduct(item) {
  const { _id, name, description, price, stock, unit, categories, imageLink } = item;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCart = (e) => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    console.log(e)
    if (itemInCart && itemInCart.purchaseQuantity >= stock) {
      itemInCart.purchaseQuantity = stock;
      return <div>no more!!</div>;
    } else if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity),
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Card key={name} style={{ width: "18rem", margin: "10px" }}>
      <Image className="productImage" alt={name} variant="top" src={imageLink} onClick={handleShow}/>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {categories[0].name}
        </Card.Subtitle>
        <Card.Text>Quantity: {stock}</Card.Text>
        <Card.Text>
          Price: ${price.toFixed(2)} per {unit}
        </Card.Text>
        <Button onClick={addToCart}>Add to cart</Button>
        {' '}
        <Button variant="secondary" onClick={handleShow}>Details</Button>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header>
          <Modal.Title>{name}</Modal.Title>
          <Modal.Title>{categories[0].name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Quantity: {stock}</h5>
          <h5>Price: ${price.toFixed(2)} per {unit}</h5>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={addToCart}>Add To Cart</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SingleProduct;
