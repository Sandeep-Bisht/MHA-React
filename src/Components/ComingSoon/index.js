import React from 'react'
import '../../css/comingsoon.css';
import NoProduct from '../../images/noproduct.png';

function ComingSoon() {
  return (
    <>
    <section className='coming-soon'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='no-product-image'>
                    <img src={NoProduct} alt='' className="img-fluid" />
                </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ComingSoon