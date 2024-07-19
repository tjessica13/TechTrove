import React from 'react'
import { translate } from '../App';

const FAQ = ({}) => {
  
  return (
      <div>
      <div className='faq'>
        <h4>{translate('q1')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a1')}.</p>
      </div>
      <div className='faq'>
        <h4>{translate('q2')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a2')}.</p>
      </div>
      <div className='faq'>
        <h4>{translate('q3')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a3')}.</p>
      </div>
      <div className='faq'>
        <h4>{translate('q4')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a4')}.</p>
      </div>
      <div className='faq'>
        <h4>{translate('q5')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a5')}.</p>
      </div>
      <div className='faq'>
        <h4>{translate('q6')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a6')}.</p>
      </div>
      <div className='faq'>
        <h4>{translate('q7')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a7')}.</p>
      </div>
      <div className='faq'>
        <h4>{translate('q8')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a8')}.</p>
      </div>
      <div className='faq'>
        <h4>{translate('q9')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a9')}.</p>
      </div>
      <div className='faq'>
        <h4>{translate('q10')}</h4>
        <p style={{fontSize:"20px"}}>{translate('a10')}.</p>
      </div>
    </div>
  );
}

export default FAQ