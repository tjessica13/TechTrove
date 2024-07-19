import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { translate } from '../App';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }


const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

function noItems(getCartTotal){
    if(getCartTotal()==0){
        return translate('noitems.');
    }
    
}

const Cart = ({ items, addToCart, removeFromCart, getCartTotal, removeAllItemFromCart, state }) => {
    return (
        <div style={{ margin: 20 }}>
            <div className="row">
                <div className="col-sm-8">
                    <div className="card">
                        <div className="card-body">
                            <h1>{translate('shoppingcart')}</h1>
                            <hr></hr>
                            <h5>{noItems(getCartTotal)}</h5>
                            <ul className="list-group">
                                {
                                    items.map(item => {
                                        if (item.inCart > 0) {
                                            return (
                                                <li className="list-group-item">


                                                    <div className="d-flex justify-content-between align-items-center"><h3>{item.name}</h3>
                                                        <button className="btn btn-outline-dark" title="Delete Item From Cart" onClick={() => { removeAllItemFromCart(item.id) }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                            </svg>
                                                        </button>
                                                    </div>


                                                    <h4>${(item.price * item.inCart).toFixed(2)}</h4> <br />
                                                    <div className="justify-content-between align-items-center">
                                                        <img src={images[item.imageSrc]} style={{ width: 100, margin: 10 }} />
                                                        <span>
                                                            {translate('quantity')}:<button className="btn btn-outline-dark" style={{ margin: 10 }} title="Remove 1" onClick={() => { removeFromCart(item.id) }}>-</button>
                                                            {item.inCart}
                                                            <button className="btn btn-outline-dark" style={{ margin: 10 }} title="Add 1" onClick={() => { addToCart(item.id) }}>+</button>
                                                            (${item.price} {translate('each')})
                                                        </span>
                                                    </div>

                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body" style={{ backgroundColor: "#fdd3de" }}>
                            <h3 className="card-title">{translate('summary')}</h3>
                            <hr />
                            <ul className="list-group" style={{ margin: 10 }}>
                                {
                                    items.map(item => {
                                        if (item.inCart > 0) {
                                            return (
                                                <li className="list-group-item">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h6>{item.name}</h6>
                                                        <h6>${(item.price * item.inCart).toFixed(2)}</h6>

                                                    </div>
                                                    <span>{translate('quantity')}: {item.inCart} (${item.price} {translate('each')})</span>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>{translate('subtotal')}:</h5>
                                <h5>${getCartTotal()}</h5>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>{translate('taxes')}:</h5>
                                <h5>${(getCartTotal() * 0.13).toFixed(2)}</h5>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <h5>Total:</h5>
                                <h5>${(getCartTotal() * 1.13).toFixed(2)}</h5>
                            </div>
                            <h6>({translate('shippingnotinc')})</h6>
                        </div>
                        {/* <Link className='d-grid' style={{textDecoration:"none"}} to="/Checkout"> */}
                        <Button className="m-3" style={{ backgroundColor: "#B9274A", border: "none" }} onClick={() => state("Checkout")}>{translate('proceedtocheckout')}</Button>
                        {/* </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart