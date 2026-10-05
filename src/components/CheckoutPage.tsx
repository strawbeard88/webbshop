import { useContext, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartProductList from './CartProductList';
import { createOrder } from '../api/api';
import type { NewOrder } from '../types/types';
import CustomerInformationForm, {
    type CustomerInformationValues,
} from './checkout/CustomerInformationForm';
import ShippingMethodForm from './checkout/ShippingMethodForm';
import PaymentMethodForm from './checkout/PaymentMethodForm';
import '../styling/cartpage.css';
import '../styling/checkoutPage.css';
import { formatPrice, getUnitPrice } from '../utils/pricing';

export default function CheckoutPage() {
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();
    const [isCustomerInformationValid, setIsCustomerInformationValid] =
        useState(false);
    const [isShippingMethodValid, setIsShippingMethodValid] = useState(false);
    const [isPaymentMethodValid, setIsPaymentMethodValid] = useState(false);
    const [customerInformation, setCustomerInformation] =
        useState<CustomerInformationValues>({
            name: '',
            address: '',
        });
    const [shippingMethod, setShippingMethod] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!cartContext) {
        throw new Error('CheckoutPage måste ligga inuti CartProvider');
    }

    const { cart, clearCart } = cartContext;
    const totalPrice = useMemo(
        () =>
            cart.reduce(
                (total, item) => total + getUnitPrice(item.product) * item.quantity,
                0
            ),
        [cart]
    );

    const canPay =
        cart.length > 0 &&
        isCustomerInformationValid &&
        isShippingMethodValid &&
        isPaymentMethodValid &&
        !isSubmitting;

    const handlePay = async () => {
        if (!canPay) {
            return;
        }

        setSubmitError('');
        setIsSubmitting(true);

        const orderPayload: NewOrder = {
            orderNumber: `ORD-${Date.now()}`,
            items: cart.map((item) => ({
                productId: item.product.id,
                title: item.product.title,
                quantity: item.quantity,
                price: getUnitPrice(item.product),
            })),
            customer: {
                name: customerInformation.name,
                address: customerInformation.address,
            },
            shipping: shippingMethod,
            payment: paymentMethod,
            date: new Date().toISOString(),
        };

        try {
            const createdOrder = await createOrder(orderPayload);
            clearCart();
            navigate(`/order-confirmation/${createdOrder.id}`, {
                state: { order: createdOrder },
            });
        } catch (error) {
            setSubmitError('Något gick fel vid skapandet av ordern. Försök igen.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="cart-page">
            <h1>Checkout</h1>

            {cart.length === 0 ? (
                <>
                    <p>Din kundvagn är tom.</p>
                    <Link to="/" className="cart-link-button">
                        Tillbaka till produkter
                    </Link>
                </>
            ) : (
                <>
                    <CartProductList cart={cart} showActions={false} />
                    <p className="cart-total-price">
                        Totalpris: {formatPrice(totalPrice)}
                    </p>

                    <div className="checkout-forms">
                        <CustomerInformationForm
                            onValidityChange={setIsCustomerInformationValid}
                            onDataChange={setCustomerInformation}
                        />
                        <ShippingMethodForm
                            onValidityChange={setIsShippingMethodValid}
                            onDataChange={(values) =>
                                setShippingMethod(values.shipping)
                            }
                        />
                        <PaymentMethodForm
                            onValidityChange={setIsPaymentMethodValid}
                            onDataChange={(values) => setPaymentMethod(values.payment)}
                        />
                    </div>

                    {submitError ? (
                        <p className="checkout-error checkout-submit-error">
                            {submitError}
                        </p>
                    ) : null}

                    <button
                        type="button"
                        className="checkout-pay-button"
                        onClick={handlePay}
                        disabled={!canPay}
                    >
                        {isSubmitting ? 'Skapar order...' : 'Betala'}
                    </button>
                </>
            )}
        </section>
    );
}