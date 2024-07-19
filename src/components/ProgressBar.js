import styled from 'styled-components'
import { translate } from '../App';

// Adapted from https://www.codevertiser.com/creating-reusable-progress-steps-component-in-reactjs/

const BarContainer = styled.div`
        display: flex;
        justify-content: space-between;
        :before {
            content: '';
            position: absolute;
            height: 4px;
            background: #FCE7EC;
            width: 100%;
            top: 50%;
        }
        :after {
            content: '';
            position: absolute;
            height: 4px;
            width: ${({width}) => width};
            background: #B9274A;
            top: 50%;
            transition: 0.5s ease
        }
    `
const StepStyle = styled.div`

    position:relative;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 3px solid ${({stepState}) => stepState === "current"? "#B9274A":"#F7BDCB"};
    background-color: #FCE7EC;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index:1;
    transition: 0.5s ease
`

const CheckMark = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: #4a154b;
    transform: scaleX(-1) rotate(-46deg) translateX(-0.5px) translateY(-2px);
`

export const ProgressBar = ({page}) => {


    const MainContainer = {

        maxWidth: "700px",
        margin: "15px auto 50px auto",
        padding: "auto",
        position: "relative",
    }


    const StepCount = {
        position: "relative",
    }

    const StepLabel = {
        position: "absolute",
        top:"42px",
    }

    const steps = [

        {
            label: translate('address'),
            step: 1
        },
        {
            label: translate('payment'),
            step: 2
        },
        {
            label: translate('review'),
            step: 3
        },
        {
            label: translate('confirmation'),
            step: 4
        },

    ]

    const width = `${(100 / (3)) * (page)}%`

    return (

        <div style={MainContainer}>

            <BarContainer width={width}>

                {
                    steps.map( ({step,label}) => (
                        <StepStyle key={step} stepState={page >= step-1 ? "current":""}>
                            {
                                page >= step ? (<CheckMark> L </CheckMark>)
                                                :
                                                (<span style={StepCount}>{step}</span>)
                            }
                    
                            <div style={StepLabel}>
                                {label}
                            </div>

                        </StepStyle>
                    ))
                }

            </BarContainer>
        </div>


    )

}