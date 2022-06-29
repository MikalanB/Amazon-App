import { PayPalButton } from "react-paypal-button-v2";

const Paypal = (props) => {
    const {amount, user} = props; 
        return (
        <PayPalButton
            amount= {amount}
            options= {{clientId: "AdGh3MYVSaLJbuoJul49mwLzfSDETVpy-c3H4plAtr3OBKeQrLbjZnrdreNSHpV20VHU-ecv1M3VGlWB", currency: "USD"}}
            shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
            onSuccess={(details, data) => {
            alert("Transaction completed by " + user.firstName);

            // OPTIONAL: Call your server to save the transaction
            // return fetch("/paypal-transaction-complete", {
            //     method: "post",
            //     body: JSON.stringify({
            //     orderID: data.orderID
            //     })
            // });
            }}
        />
        );
}

export default Paypal;