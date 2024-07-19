import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { translate } from '../App';

import Button from 'react-bootstrap/Button';

import { useForm } from "react-hook-form"

export const PersonalForm = ({userDetails, setUserDetails, handleNext}) => {

    const { register, formState: {errors}, handleSubmit } = useForm({mode: "all", reValidateMode: "onBlur"});

    const onSubmit = handleNext;

    return(

        <Card.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>{translate('firstname')}</Form.Label>
                            <Form.Control type="text" placeholder="John" value={userDetails.firstName} 
                                {...register("firstName", {required: true, pattern: /^[a-zA-Z ,.'-]+$/ }) } 
                                aria-invalid={() => errors.firstName ? true: false }  
                                onChange={(e) => setUserDetails({...userDetails, firstName: e.target.value})}
                                style= { errors.firstName && {border: "1px solid red"}}
                            />
                            {errors.firstName && <p className="error">{translate('firstNameError')}</p>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>{translate('lastname')}</Form.Label>
                            <Form.Control type="text" placeholder="Doe" value={userDetails.lastName} 
                                {...register("lastName", {required: true, pattern: /^[a-zA-Z ,.'-]+$/ })}
                                aria-invalid={errors.lastName ? "true": "false"}  
                                onChange={(e) => setUserDetails({...userDetails, lastName: e.target.value})}
                                style= { errors.lastName && {border: "1px solid red"}}
                            />
                            {errors.lastName && <p className="error">{translate('lastNameError')}</p>}       
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>{translate('phone')}</Form.Label>
                            <Form.Control type="text" placeholder="(123)456-7890" value={userDetails.phoneNumber}
                                {...register("phoneNumber", {required: true, pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/ })} 
                                aria-invalid={errors.phoneNumber ? "true": "false"}
                                onChange={(e) => setUserDetails({...userDetails, phoneNumber: e.target.value})}
                                style= { errors.phoneNumber && {border: "1px solid red"}}
                            />
                            {errors.phoneNumber && <p className="error">{translate('phoneError')}</p>} 
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>{translate('email')}</Form.Label>
                            <Form.Control type="email" placeholder="johndoe@email.com" value={userDetails.email} 
                                {...register("email", {required: true, pattern: /^[A-Za-z0-9]+\@[A-Za-z0-9]+\.[A-Za-z]{2,}/ })}
                                aria-invalid={errors.email ? "true": "false"}
                                onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                                style= { errors.email && {border: "1px solid red"}}
                            />
                            {errors.email && <p className="error">{translate('emailError')}</p>} 
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group>
                            <Form.Label>{translate('street')}</Form.Label>
                            <Form.Control type="text" placeholder="123 Example Street" value={userDetails.street}x
                                {...register("street", {required: true})}
                                aria-invalid={errors.street ? "true": "false"} 
                                onChange={(e) => setUserDetails({...userDetails, street: e.target.value})}
                                style= { errors.street && {border: "1px solid red"}}
                            />
                            {errors.street && <p className="error">{translate('addressError')}</p>} 
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>{translate('city')}</Form.Label>
                            <Form.Control type="text" placeholder="Ottawa" value={userDetails.city}
                                {...register("city", {required: true})}
                                aria-invalid={errors.city ? "true": "false"} 
                                onChange={(e) => setUserDetails({...userDetails, city: e.target.value})}
                                style= { errors.city && {border: "1px solid red"}}
                            />
                            {errors.city && <p className="error">{translate('cityError')}</p>} 
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>{translate('province')}</Form.Label>
                            <Form.Select {...register("province", {required: true})} value={userDetails.province} onChange={(e) => setUserDetails({...userDetails, province: e.target.value})}>
                                <option value=""></option> 
                                <option value="AB">Alberta</option>
                                <option value="BC">British Columbia</option>
                                <option value="MB">Manitoba</option>
                                <option value="NB">New Brunswick</option>
                                <option value="NL">Newfoundland and Labrador</option>
                                <option value="NS">Nova Scotia</option>
                                <option value="NT">Northwest Territories</option>
                                <option value="NU">Nunavut</option>
                                <option value="ON">Ontario</option>
                                <option value="PE">Prince Edward Island</option>
                                <option value="QC">Quebec</option>
                                <option value="SK">Saskatchewan</option>
                                <option value="YT">Yukon</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>{translate('postalcode')}</Form.Label>
                            <Form.Control type="text" placeholder="A1A 1A1" value={userDetails.postalCode} 
                                {...register("postalCode", {required: true, pattern: /[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]/ })}
                                aria-invalid={errors.postalCode ? "true": "false"}
                                onChange={(e) => setUserDetails({...userDetails, postalCode: e.target.value})}
                                style= { errors.postalCode && {border: "1px solid red"}}
                            />
                            {errors.postalCode && <p className="error">{translate('postalError')}</p>} 
                        </Form.Group>
                    </Col>
                </Row>
                <Container style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button className="m-2" style={{width:"6rem", height:"3rem", backgroundColor:"#B9274A", border:"none"}} disabled="true"> {translate('back')} </Button>
                    <Button className="m-2" style={{width:"6rem", height:"3rem", backgroundColor:"#B9274A", border:"none"}} type="submit"> {translate('next')} </Button>
                </Container>
    
            </Form>
        </Card.Body>
    )




}