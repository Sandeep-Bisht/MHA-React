import React from 'react'
import '../../css/noOrder.css';
import noOrderImage from '../../images/noorder.png';

function index() {
  return (
    <>
    <section className='no-order-page'>
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='no-order-wrapper'>
                    <img src={noOrderImage} alt='' className='img-fluid'/>
                    <h1 className='order-heading'>No order has been placed yet</h1>
                </div>
            </div>
        </div>
    </div>
    </section>
    </>
  )
}

export default index