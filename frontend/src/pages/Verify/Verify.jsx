import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const { backendUrl } = useContext(StoreContext);

    const [searchParams] = useSearchParams();

    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const navigate = useNavigate();

    const verifyPayment = async () => {
        const response = await axios.post(backendUrl + "/api/order/verify", { success, orderId });

        if (response.data.success) {
            navigate('/my-orders');
        } else {
            navigate('/');
        }
    }

    useEffect(() => {
        verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='verify'>
            <div className="spinner"></div>
        </div>
    )
}

export default Verify