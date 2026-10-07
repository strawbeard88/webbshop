import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const paymentMethodSchema = z.object({
    payment: z
        .string()
        .min(1, 'Välj ett betalsätt.')
        .refine(
            (value) => ['Kort', 'Swish', 'Klarna'].includes(value),
            'Välj ett giltigt betalsätt.'
        ),
});

export type PaymentMethodValues = z.infer<typeof paymentMethodSchema>;

type PaymentMethodFormProps = {
    onValidityChange: (isValid: boolean) => void;
    onDataChange: (values: PaymentMethodValues) => void;
};

export default function PaymentMethodForm({
    onValidityChange,
    onDataChange,
}: PaymentMethodFormProps) {
    const {
        register,
        watch,
        formState: { errors, isValid },
    } = useForm<PaymentMethodValues>({
        resolver: zodResolver(paymentMethodSchema),
        mode: 'onChange',
        defaultValues: {
            payment: undefined,
        },
    });

    useEffect(() => {
        onValidityChange(isValid);
    }, [isValid, onValidityChange]);

    useEffect(() => {
        const subscription = watch((value) => {
            onDataChange({
                payment: value.payment ?? '',
            });
        });

        return () => subscription.unsubscribe();
    }, [watch, onDataChange]);

    return (
        <section className="checkout-step">
            <h2>3. Betalsätt</h2>
            <label>
                <input type="radio" value="Kort" {...register('payment')} />
                Kort
            </label>
            <label>
                <input type="radio" value="Swish" {...register('payment')} />
                Swish
            </label>
            <label>
                <input type="radio" value="Klarna" {...register('payment')} />
                Klarna
            </label>
            {errors.payment ? (
                <p className="checkout-error">{errors.payment.message}</p>
            ) : null}
        </section>
    );
}
