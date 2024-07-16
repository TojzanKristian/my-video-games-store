import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { payPalId } from "../../config";
import PurchaseService from "../../services/Purchase/PurchaseService";
import { useCart } from "../Cart context/CartContext";

interface PayPalButtonProps {
    amount: number;
    lotOfGameNames: string;
    onSuccess: (details: any) => void;
}

const PayPalButton: React.FC<PayPalButtonProps> = ({ amount, lotOfGameNames, onSuccess }) => {

    const { clearCart } = useCart();
    const paypalOptions = {
        "client-id": payPalId
    };

    // Funkcija za slanje zahetva na server za uspešnu kupovinu i pražnjenje korpe
    const handleSuccess = async (details: any) => {
        try {
            const totalAmount = amount + ' USD';
            const response = await PurchaseService.processingPurchase(lotOfGameNames, totalAmount);
            alert(response.message);
            clearCart();
        } catch (error) {
            console.error('Error recording purchase on server:', error);
        }
        onSuccess(details);
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
                            handleSuccess(details);
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