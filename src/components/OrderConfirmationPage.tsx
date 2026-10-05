import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getOrder } from '../api/api';
import type { Order } from '../types/types';
import '../styling/orderConfirmationPage.css';
import { formatPrice } from '../utils/pricing';

type LocationState = {
    order?: Order;
};

export default function OrderConfirmationPage() {
    const { orderId } = useParams();
    const location = useLocation();
    const state = location.state as LocationState | null;
    const [order, setOrder] = useState<Order | null>(state?.order ?? null);
    const [isLoading, setIsLoading] = useState(!state?.order);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            if (!orderId || order) {
                setIsLoading(false);
                return;
            }

            try {
                const loadedOrder = await getOrder(orderId);
                setOrder(loadedOrder);
            } catch (error) {
                setLoadError('Kunde inte hämta orderdetaljer.');
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, order]);

    const totalPrice = useMemo(() => {
        if (!order) {
            return 0;
        }

        return order.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }, [order]);

    if (isLoading) {
        return <section className="order-confirmation-page">Laddar order...</section>;
    }

    if (loadError || !order) {
        return (
            <section className="order-confirmation-page">
                <h1>Orderbekräftelse</h1>
                <p>{loadError || 'Ordern kunde inte hittas.'}</p>
                <Link to="/" className="cart-link-button">
                    Till startsidan
                </Link>
            </section>
        );
    }

    return (
        <section className="order-confirmation-page">
            <h1>Tack för din beställning!</h1>
            <p>
                <strong>Ordernummer:</strong> {order.orderNumber}
            </p>
            <p>
                <strong>Namn:</strong> {order.customer.name}
            </p>
            <p>
                <strong>Adress:</strong> {order.customer.address}
            </p>
            <p>
                <strong>Leveranssätt:</strong> {order.shipping}
            </p>
            <p>
                <strong>Betalsätt:</strong> {order.payment}
            </p>

            <h2>Produkter</h2>
            <ul className="order-items">
                {order.items.map((item) => (
                    <li key={item.productId}>
                        {item.title} - {item.quantity} st - {formatPrice(item.price)} / st
                    </li>
                ))}
            </ul>

            <p>
                <strong>Total kostnad:</strong> {formatPrice(totalPrice)}
            </p>

            <Link to="/" className="cart-link-button">
                Handla igen
            </Link>
        </section>
    );
}
