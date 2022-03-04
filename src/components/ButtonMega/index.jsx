import styles from "./styles.module.css"

export function ButtonMega({handleClickButtonMegaProps})
{
    return (
        <button className={styles.buttonMega} onClick={handleClickButtonMegaProps}>
            Gerar Número
        </button>
    )
}