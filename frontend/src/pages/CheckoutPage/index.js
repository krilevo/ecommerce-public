import React, { useEffect, useState } from 'react';
import Cart from '../../components/Checkout/Cart';
import CheckoutProgressBar from '../../components/Checkout/CheckoutProgressBar';
import DeliveryOptions from '../../components/Checkout/DeliveryOptions';
import PaymentOptions from '../../components/Checkout/PaymentOptions';
import PersonalDetails from '../../components/Checkout/PersonalDetails';
import ConfirmOrder from '../../components/Checkout/ConfirmOrder';
import Popup from '../../components/common/Popup/Popup';
import { useNavigate } from 'react-router';
import { useCartContext } from '../../utils/CartContext';
import './CheckoutPage.css';
import { addOrder, addUserDetails, createOrderAndReduceStock, fetchUserDetails, reduceProductStock } from '../../utils/services/api';
import { useAuth } from '../../utils/AuthContext';

const CheckoutPage = () => {
  const { cartData, setCartData, totalPrice, setTotalPrice, totalQuantity, setTotalQuantity } = useCartContext();
  const [currentStep, setCurrentStep] = useState(0);
  const steps = ['Cart', 'Personal details', 'Delivery', 'Payment', 'Confirm'];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const deliveryOptions = ['Standard Shipping', 'Express Shipping', 'Pickup'];
  const [selectedDeliveryOption, setSelectedDeliveryOption] = useState('');

  const paymentOptions = ['Credit Card', 'PayPal', 'Apple Pay'];
  const [selectedPaymentoption, setSelectedPaymentOption] = useState('');
  const [savePersonalDetails, setSavePersonalDetails] = useState(false);

  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const openErrorPopup = (message) => {
    setPopupMessage(message);
    setIsPopupOpen(true);
  };

  useEffect(() => {
    if (user && user.authenticatedUser) {
      fetchUserDetails(user.authenticatedUser.id)
      .then((data) => {
        const { firstName, lastName, email, address, city, postalCode, country } = data;
        setFormData({
          firstName,
          lastName,
          email,
          address,
          city,
          postalCode,
          country,
        });
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, [user]);

  // Fetch products again when component is mounted, just to be sure
  useEffect(() => {
    const storedCartData = JSON.parse(localStorage.getItem('cart'));
    setCartData(storedCartData || { items: [] });
  }, []);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const confirmOrder = () => {
    const order = {
      ...formData,
      deliveryOption: selectedDeliveryOption,
      paymentOption: selectedPaymentoption,
      totalItemQuantity: totalQuantity,
      totalOrderAmount: totalPrice,
      products: cartData.items
    };

    setIsConfirmingOrder(true);

    createOrderAndReduceStock(order)
    .then(() => {
      setCartData({ items: [] });
      localStorage.removeItem('cart');
      navigate('/thank-you');
    })
    .catch((error) => {
      console.log(error);
      openErrorPopup('Failed to add order');
    })
    .finally(setIsConfirmingOrder(false))

    if (savePersonalDetails) {
      const personalDetails = { ...formData };

      delete personalDetails.email;
      addUserDetails(user.authenticatedUser.id, personalDetails);
    }
  };

  return (
    <div className="checkout-page">
      <CheckoutProgressBar steps={steps} currentStep={currentStep} />
      {currentStep === 0 && <Cart 
        cartData={cartData} 
        setCartData={setCartData}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
        goToNextStep={goToNextStep}
      />}
      {currentStep === 1 && <PersonalDetails
        formData={formData}
        setFormData={setFormData}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
      />}
      {currentStep === 2 && <DeliveryOptions
        options={deliveryOptions}
        selectedOption={selectedDeliveryOption}
        setSelectedDeliveryOption={setSelectedDeliveryOption}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
      />}
      {currentStep === 3 && <PaymentOptions
        options={paymentOptions}
        selectedOption={selectedPaymentoption}
        setSelectedPaymentOption={setSelectedPaymentOption}
        goToPreviousStep={goToPreviousStep}
        goToNextStep={goToNextStep}
      />}
      {currentStep === 4 && <ConfirmOrder
        cartData={cartData}
        totalPrice={totalPrice}
        totalQuantity={totalQuantity}
        personalDetails={formData}
        selectedDelivery={selectedDeliveryOption}
        selectedPayment={selectedPaymentoption}
        goToPreviousStep={goToPreviousStep}
        savePersonalDetails={savePersonalDetails}
        setSavePersonalDetails={setSavePersonalDetails}
        confirmOrder={confirmOrder}
        isConfirmingOrder={isConfirmingOrder}
      />}
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} title="Error">
        {popupMessage}
      </Popup>
    </div>
  )
}

export default CheckoutPage;