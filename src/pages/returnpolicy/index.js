import React, {useEffect} from 'react'
import Footer from '../../Components/Footer/Footer';
import '../../css/returnpolicy.css';

function index() {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

  return (
    <>
    <section className='return-policy-section'>
        <div className='container'>
            <div className='row'>
                <div className='col-md-12'>
                    <div className='return-box'>
                        <h2 className="footer-inner-page-subheading">Return policy</h2>
                        <p className='return-para'><b>last updated December 01, 2022</b></p>
                        <h2 className="footer-inner-page-subheading">Refund</h2>
                        <p className='return-para'>All sales are final and no refund will be issued.</p>
                        <h2 className="footer-inner-page-subheading">Questions?</h2>
                        <p className='return-para'>If you have any questions concerning our return policy, please contact us at : <br/> <b>Info@modernhouseofantiques.com</b></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer/>
    </>
  )
}

export default index