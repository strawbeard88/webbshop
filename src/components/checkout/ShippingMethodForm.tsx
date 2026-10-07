import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const shippingMethodSchema = z.object({
    shipping: z
        .string()
        .min(1, 'Välj ett fraktsätt.')
        .refine(
            (value) => ['DHL', 'Schenker', 'Postnord'].includes(value),
            'Välj ett giltigt fraktsätt.'
        ),
});

export type ShippingMethodValues = z.infer<typeof shippingMethodSchema>;

type ShippingMethodFormProps = {
    onValidityChange: (isValid: boolean) => void;
    onDataChange: (values: ShippingMethodValues) => void;
};

export default function ShippingMethodForm({
    onValidityChange,
    onDataChange,
}: ShippingMethodFormProps) {
    const {
        register,
        watch,
        formState: { errors, isValid },
    } = useForm<ShippingMethodValues>({
        resolver: zodResolver(shippingMethodSchema),
        mode: 'onChange',
        defaultValues: {
            shipping: undefined,
        },
    });

    useEffect(() => {
        onValidityChange(isValid);
    }, [isValid, onValidityChange]);

    useEffect(() => {
        const subscription = watch((value) => {
            onDataChange({
                shipping: value.shipping ?? '',
            });
        });

        return () => subscription.unsubscribe();
    }, [watch, onDataChange]);

    return (
        <section className="checkout-step">
            <h2>2. Fraktsätt</h2>
            <label>
                <input type="radio" value="DHL" {...register('shipping')} />
                DHL
            </label>
            <label>
                <input type="radio" value="Schenker" {...register('shipping')} />
                Schenker
            </label>
            <label>
                <input type="radio" value="Postnord" {...register('shipping')} />
                Postnord
            </label>
            {errors.shipping ? (
                <p className="checkout-error">{errors.shipping.message}</p>
            ) : null}
        </section>
    );
}
