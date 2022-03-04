import styles from "./styles.module.css"

export function BolaMegaSena({functionShowNumbers})
{
    return(
        <div className={styles.displayMega}>
            <ul>{functionShowNumbers}</ul>
        </div>
    )
}