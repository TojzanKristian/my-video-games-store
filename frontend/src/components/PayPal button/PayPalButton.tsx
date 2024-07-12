import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { payPalId } from "../../config";

interface PayPalButtonProps {
    amount: number;
    onSuccess: (details: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, onSuccess }) => {
    const paypalOptions = {
        "client-id": payPalId
    };

    return (
        <PayPalScriptProvider options={paypalOptions as any}>
            <PayPalButtons
                key={amount}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [{
                            amount: {
                                currency_code: "USD",
                                value: amount.toFixed(2),
                            },
                        }],
                    });
                }}
                onApprove={(data, actions) => {
                    if (actions && actions.order) {
                        return actions.order.capture().then(function (details) {
                            onSuccess(details);
                        });
                    }
                    console.error('Greška kod action.order funkcije!');
                    return Promise.resolve();
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;