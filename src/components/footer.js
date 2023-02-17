import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import "./footer.css"

export default function App() {
  return (
    <MDBFooter bgColor='dark'  className='text-center text-lg-start text-muted'>
      <section  className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block' id='logo2'>
          <span>Get connected with us on social networks:</span>
          <img src="images/logo.png" alt="Logo Goes Here" className='logo'/>
          
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className='footer2'>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3"/>
                React Social Group Project
              </h6>
              <p>
                This is our React Social Group Project.
              </p>
            </MDBCol>
						 
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4 footertext1'>
        © 2023 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          ReactSocialMediaProject
        </a>
      </div>
    </MDBFooter>
  );
}