import styles from "./styles.module.css"

export function TextNumberMega({numberDigitProps, handleClickButtonProps, handleEnterTextProps}){
    
    return(
        <input 
            className={styles.inputMega}
            min={6}
            max={15}
            type="number" 
            value={numberDigitProps} 
            onChange={ handleClickButtonProps } 
            onKeyPress={handleEnterTextProps}
        />
    )
}