import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


import { translate } from '../App';

export const OrderConfirmation = ({userDetails}) => {

    return(

        <Card.Body>
            <Container>
                <Card.Text as={"h4"}>{translate('orderplacesuccess')}.</Card.Text>
                <Card.Text>An order confirmation has been sent to {userDetails.email}.</Card.Text>
            </Container>
            <Container className="d-flex flex-row-reverse">

                    <Button style={{width:"13rem", height:"3rem", backgroundColor:"#B9274A", border:"none"}} onClick={() => window.location.reload()}>{translate('returntohp')}</Button> 

            </Container>
        </Card.Body>
    )

}