import Container from 'react-bootstrap/Container';
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer() {
    return (
        <MDBFooter bgColor='dark' className='text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' , color: 'white'}}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-light' href='mailto:pradeep991004@gmail.com'>
          pradeep991004@gmail.com
        </a>
      </div>
    </MDBFooter>
    )
}

export default Footer