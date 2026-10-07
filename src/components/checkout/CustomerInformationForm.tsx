import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const customerInformationSchema = z.object({
    name: z.string().min(2, 'Namn måste vara minst 2 tecken.'),
    address: z.string().min(5, 'Adress måste vara minst 5 tecken.'),
});

export type CustomerInformationValues = z.infer<
    typeof customerInformationSchema
>;

type CustomerInformationFormProps = {
    onValidityChange: (isValid: boolean) => void;
    onDataChange: (values: CustomerInformationValues) => void;
};

export default function CustomerInformationForm({
    onValidityChange,
    onDataChange,
}: CustomerInformationFormProps) {
    const {
        register,
        watch,
        formState: { errors, isValid },
    } = useForm<CustomerInformationValues>({
        resolver: zodResolver(customerInformationSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            address: '',
        },
    });

    useEffect(() => {
        onValidityChange(isValid);
    }, [isValid, onValidityChange]);

    useEffect(() => {
        const subscription = watch((value) => {
            onDataChange({
                name: value.name ?? '',
                address: value.address ?? '',
            });
        });

        return () => subscription.unsubscribe();
    }, [watch, onDataChange]);

    return (
        <section className="checkout-step">
            <h2>1. Kundinformation</h2>
            <label htmlFor="customer-name">Namn</label>
            <input id="customer-name" type="text" {...register('name')} />
            {errors.name ? (
                <p className="checkout-error">{errors.name.message}</p>
            ) : null}

            <label htmlFor="customer-address">Adress</label>
            <input id="customer-address" type="text" {...register('address')} />
            {errors.address ? (
                <p className="checkout-error">{errors.address.message}</p>
            ) : null}
        </section>
    );
}
