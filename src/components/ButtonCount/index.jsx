import styles from "./styles.module.css"

export function ButtonCount(props)
{
    return (
        <button 
            className={styles.buttonAmount} 
            style={{background: props.color}}
            onClick= {()=>{props.setAmount()}}
        >
            {props.symbol}
        </button>
    )
}