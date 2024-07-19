import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { translate } from '../App';

import { useForm } from "react-hook-form"

export const PaymentForm = ({userDetails, setUserDetails, handleNext, handleBack}) => {

    const { register, formState: {errors}, handleSubmit } = useForm({mode: "all", reValidateMode: "onBlur"});

    const onSubmit = handleNext;

    return(

        <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>{translate('cardholder')}</Form.Label>
                            <Form.Control type="text" placeholder="John Doe" value={userDetails.ccName}
                                {...register("ccName", {required: true, pattern: /^[a-zA-Z ,.'-]+$/ }) } 
                                aria-invalid={() => errors.ccName ? true: false } 
                                onChange={(e) => setUserDetails({...userDetails, ccName: e.target.value})}
                                style= { errors.ccName && {border: "1px solid red"}}
                            />
                            {errors.ccName && <p className="error">{translate('ccNameError')}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>{translate('cardnum')}</Form.Label>
                            <Form.Control type="text" placeholder="1111-2222-3333-4444" value={userDetails.ccNum} 
                                {...register("ccNum", {required: true, pattern: /^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/ }) } 
                                aria-invalid={() => errors.ccNum ? true: false } 
                                onChange={(e) => setUserDetails({...userDetails, ccNum: e.target.value})}
                                style= { errors.ccNum && {border: "1px solid red"}}
                            />
                            {errors.ccNum && <p className="error">{translate('ccNumError')}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>{translate('cexpiry')}</Form.Label>
                            <Form.Control type="text" placeholder="01/23" value={userDetails.ccExpiry} 
                                {...register("ccExpiry", {required: true, pattern: /^[0-9]{2}\/[0-9]{2}$/ }) } 
                                aria-invalid={() => errors.ccExpiry ? true: false } 
                                onChange={(e) => setUserDetails({...userDetails, ccExpiry: e.target.value})}
                                style= { errors.ccExpiry && {border: "1px solid red"}}
                            />
                            {errors.ccExpiry && <p className="error">{translate('ccExpError')}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>CVV</Form.Label>
                            <Form.Control type="text" placeholder="123" value={userDetails.ccCVV} 
                                {...register("ccCVV", {required: true, pattern: /^[0-9]{3}$/ }) } 
                                aria-invalid={() => errors.ccCVV ? true: false } 
                                onChange={(e) => setUserDetails({...userDetails, ccCVV: e.target.value})}
                                style= { errors.ccCVV && {border: "1px solid red"}}
                            />
                            {errors.ccCVV && <p className="error">{translate('ccCVVError')}</p>}
                        </Form.Group>
                    </Col>
                </Row>
                <Container style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button className="m-2" style={{width:"6rem", height:"3rem", backgroundColor:"#B9274A", border:"none"}} onClick={() => handleBack()}> {translate('back')} </Button>
                    <Button className="m-2" style={{width:"6rem", height:"3rem", backgroundColor:"#B9274A", border:"none"}} type="submit"> {translate('next')} </Button>
                </Container>
            </Form>
        </Card.Body>
    )




}