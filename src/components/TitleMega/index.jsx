import Image from 'next/image'
import logo from "../../assets/logo.png"
import styles from "./styles.module.css"

export function TitleMega(){

    const imageLogo = <Image src={logo} width={30} height={30} alt="logo"/>

    return(
        <div className={styles.titleMega}>
            {imageLogo}
            <h1>Gerador Mega Sena</h1>
        </div>
        
    )
}