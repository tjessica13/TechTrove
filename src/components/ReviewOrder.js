import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import { translate } from '../App';


export const ReviewOrder = ({userDetails, items, handleNext, handleBack}) => {

    const calculateSubtotal = () =>{

        let total = 0;
        for(var i=0; i<items.length;i++){
            if(items[i].inCart !== 0){
            total = total + (items[i].inCart*items[i].price)
            }
        }
        return total;
        
    }

    const calculateTax = () => {
        
        const province = userDetails.province;
        var rate = 0;
        
        switch(province){
            case "AB":
                rate = 0.05
                break;
            case "BC":
                rate = 0.05
                break;
            case "MB":
                rate = 0.05
                break;
            case "NB":
                rate = 0.15
                break;
            case "NL":
                rate = 0.15
                break;
            case "NS":
                rate = 0.15
                break;
            case "NT":
                rate = 0.05
                break;
            case "NU":
                rate = 0.05
                break;
            case "ON":
                rate = 0.13
                break;
            case "PE":
                rate = 0.15
                break;
            case "QC":
                rate = 0.05
                break;
            case "SK":
                rate = 0.05
                break;
            case "YT":
                rate = 0.05
                break;
            default:
                rate = 0.13
        }

        return Math.round(((calculateSubtotal() + 20) * rate) * 100)/100
    }
    console.log(userDetails)
    return(

        <Card.Body>
            <Container>
                <Row>
                    <Col>
                        <Card className='p-2'>
                            <Card.Title>{translate('products')}</Card.Title>
                            <Card.Body>
                                <ListGroup>
                                    {   
                                        items.map(item => {if (item.inCart>0) return (
                                            <ListGroup.Item>
                                                <Container>
                                                    <Row>
                                                        <Col>
                                                            {item.name}
                                                            <Row className='quantity'>
                                                                {translate('quantity')} x{item.inCart}
                                                            </Row>
                                                        </Col>
                                                        <Col md="auto">
                                                            {item.price*item.inCart}
                                                        </Col>
                                                    </Row>
                               
                                                </Container>
                           
                                            </ListGroup.Item>
                                        ) })
                                    }
                                </ListGroup>
              
                            </Card.Body>
                        </Card>
                        <Card className='p-2'>
                            <Card.Title>{translate('paymentinfo')}</Card.Title>
                            <Card.Body>
                                <Card.Text>{translate('cardholder')}: {userDetails.ccName}</Card.Text>
                                <Card.Text>{translate('cardnum')}: {userDetails.ccNum}</Card.Text>
                                <Card.Text>{translate('cexpiry')}: {userDetails.ccExpiry}</Card.Text>
                                <Card.Text>CVV: {userDetails.ccCVV}</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card className='p-2'>
                            <Card.Title>{translate('deliveryaddress')}</Card.Title>
                            <Card.Body>
                                <Card.Text>{translate('name')}: {userDetails.firstName} {userDetails.lastName}</Card.Text>
                                <Card.Text>{translate('email')}: {userDetails.email}</Card.Text>
                                <Card.Text>{translate('phone')}: {userDetails.phoneNumber}</Card.Text>
                                <Card.Text>{translate('address')}: {userDetails.street}, {userDetails.city}, {userDetails.province}, {userDetails.postalCode}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md="3">
                        <Card className='p-2'>
                            <Card.Title>{translate('summary')}</Card.Title>
                            <Card.Body>
                                <Container>
                                    <Row style={{paddingBottom: '8px'}}>
                                        <Col>{translate('subtotal')}:</Col>
                                        <Col style={{display:"flex", justifyContent:"flex-end"}} >${calculateSubtotal()}</Col>
                                    </Row>
                                    <Row style={{paddingBottom: '8px'}}>
                                        <Col>{translate('shipping')}:</Col>
                                        <Col style={{display:"flex", justifyContent:"flex-end"}}>$20</Col>
                                    </Row>
                                    <Row style={{paddingBottom: '8px'}}>
                                        <Col>{translate('tax')}:</Col>
                                        <Col style={{display:"flex", justifyContent:"flex-end"}}>${calculateTax()}</Col>
                                    </Row>
                                    <Row style={{paddingBottom: '8px'}}>
                                        <Col>{translate('total')}:</Col>
                                        <Col style={{display:"flex", justifyContent:"flex-end"}}>${calculateTax() + 20 + calculateSubtotal()}</Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Container style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button className="m-2" style={{width:"6rem", height:"3rem", backgroundColor:"#B9274A", border:"none"}} onClick={() => handleBack()}> {translate('back')} </Button>
                    <Button className="m-2" style={{width:"7rem", height:"3rem", backgroundColor:"#169F3C", border:"none"}} onClick={() => handleNext()}> {translate('placeOrder')} </Button>
                </Container>
            </Container>
        </Card.Body>
    )




}