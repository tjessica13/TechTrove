import { useState } from "react"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import { PersonalForm } from "./PersonalForm";
import { PaymentForm } from "./PaymentForm";
import { ReviewOrder } from "./ReviewOrder";
import { OrderConfirmation } from "./OrderConfirmation";
import { ProgressBar } from "./ProgressBar";

import { translate } from '../App';

export const CheckoutForm = ({items}) => {

    const [page, setPage] = useState(0);

    const [userDetails, setUserDetails] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        street: "",
        city: "",
        province: "",
        postalCode: "",
        ccName: "",
        ccNum: "",
        ccExpiry: "",
        ccCVV: "",
    });
    
    const pageTitles = [
        translate('personalinfo'),
        translate('paymentinfo'),
        translate('revieworder'),
        translate('orderconfirm')
    ]

    const PageDisplay = () => {

        if (page === 0)
            return <PersonalForm userDetails={userDetails} setUserDetails={setUserDetails} handleNext={handleNext}/>
        
        else if (page === 1)
            return <PaymentForm userDetails={userDetails} setUserDetails={setUserDetails} handleNext={handleNext} handleBack={handleBack}/>

        else if (page === 2)
            return <ReviewOrder userDetails={userDetails} items={items} handleNext={handleNext} handleBack={handleBack}/>
        
        else if (page === 3)
            return <OrderConfirmation userDetails={userDetails}/>


    }

    const handleNext = () => {
        setPage((page) => page + 1)
    }

    const handleBack = () => {
        setPage((page) => page - 1)
    }
    
    return (
        
        
        <div className="container">
            <ProgressBar page={page}/>

            <Card>
                <Card.Header as={"h1"}>{pageTitles[page]}</Card.Header>

                {PageDisplay()}

            </Card>
        </div>



    )









}