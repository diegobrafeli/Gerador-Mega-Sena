import { useState } from "react";
import { ButtonCount } from "../ButtonCount";
import { DisplayCounter } from "../DisplayCounter";
import styles from "./styles.module.css";

export function ScreenButton(){

    const [amount, setAmount] = useState(0);

    const plusAmount = () => setAmount(amount + 1);
    const minusAmount = () => setAmount(amount - 1);

    return(
        <div className={styles.card}>
            <h1>Counter</h1>
            <DisplayCounter amount= {amount} />
            <div className={styles.windowButton} >
                <ButtonCount symbol="+" color="rgb(133, 240, 119)" setAmount={plusAmount} /> 
                <ButtonCount symbol="-" color="rgb(240, 68, 68)" setAmount={minusAmount}/> 
            </div>
        </div>
    )

}