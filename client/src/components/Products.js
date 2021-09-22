import React, { useState,useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_ALL_PRODUCTS } from "../utils/queries";
import { Image, Container, Card, Row, Button, ButtonGroup, Dropdown } from "react-bootstrap";
import banana from '../assets/images/banana.jpeg'
import blueberry from '../assets/images/blueberry.jpeg'
import fujiapple from '../assets/images/fujiapple.jpg'
import honeycrispapple from '../assets/images/honeycrispapple.jpg'
import lemon from '../assets/images/lemon.jpeg'
import mango from '../assets/images/mango.jpeg'
import peach from '../assets/images/peach.jpeg'
import raspberry from '../assets/images/raspberry.jpeg'
import tangerine from '../assets/images/tangerine.jpeg'
import watermelon from '../assets/images/watermelon.jpeg'


function Products() {
  const fruitImages = [banana, blueberry, fujiapple, honeycrispapple, lemon, mango, peach, raspberry, tangerine, watermelon]
  const products = useSelector((state) => state.products);
  const [categoryList, updateCategoryList] = useState(0)
  const dispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_ALL_PRODUCTS);

  useEffect(() => {
    if (data) {
      var productArr = data.products
      var updatedProductArr = productArr.map(element => {
        return { ...element, imageLink: fruitImages.filter(fruit => fruit.includes(element.name.toLowerCase().replace(' ', '')) === true) }
      })
      // eslint-disable-next-line
      dispatch({
        type: UPDATE_PRODUCTS,
        products: updatedProductArr,
      });
    }
    // eslint-disable-next-line
    var allCategories = []
    products.forEach((element)=>{
      if(allCategories.indexOf(element.categories[0].name) === -1){
        allCategories.push(element.categories[0].name)
      }
    })
   return updateCategoryList(allCategories)
  }, [data, loading, dispatch]);

  useEffect(() => {
    var allCategories = []
    products.forEach((element)=>{
      if(allCategories.indexOf(element.categories[0].name) === -1){
        allCategories.push(element.categories[0].name)
      }
    })
   return updateCategoryList(allCategories)
  }, [products])
  if (!products?.length) {
    return <h1>There are no products!</h1>;
  }
  return (
    <Container>
      <ButtonGroup aria-label="Basic example">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
            <Button variant="secondary">Category</Button>
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            {categoryList.map((product) => {
              return(<Dropdown.Item key={product} >{product}</Dropdown.Item>)
            })}
            <Dropdown.Divider />
            <Dropdown.Item >Reset</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="secondary">Price Ascending</Button>
        <Button variant="secondary">Alphabetical</Button>
      </ButtonGroup>
      <Row>
        {products.map((product) => {
          return (
            <Card key={product.name} style={{ width: "18rem", margin: "10px" }}>
              <Image alt={product.name} variant='top' src={product.imageLink} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {product.categories[0].name}
                </Card.Subtitle>
                <Card.Text>Quantity: {product.stock}</Card.Text>
                <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                <Card.Link href="#">Add to cart</Card.Link>
              </Card.Body>
            </Card>
          );
        })}
      </Row>
    </Container>
  );
}

export default Products;
