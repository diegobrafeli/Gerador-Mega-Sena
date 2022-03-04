import Head from 'next/head'
import { useEffect, useState } from "react"
import { BolaMegaSena } from "../components/BolaMegaSena";
import { ButtonMega } from "../components/ButtonMega";
import { TextNumberMega } from "../components/TextNumberMega";
import { TitleMega } from "../components/TitleMega";
import styles from "../styles/MegaSena.module.css"


export default function MegaSena(){

  const [numberDigit, setNumberDigit] = useState(6);

  const [listaMegaSenaOficial, setlistaMegaSenaOficial] = useState([]);

  useEffect(() => {
      listaMega(numberDigit)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const chooseNumber = (maxNumber: number) => {
      return(Math.trunc(Math.random() * maxNumber + 1))
  }


  const listaMega = (qtdNumber = 6) =>{

      console.log("qtd", qtdNumber);
      console.log("-------------");

      let newNumber = 0;
      //const qtdNumberInt = parseInt(qtdNumber);
      const qtdNumberInt = +qtdNumber;

      if(qtdNumberInt < 6 || qtdNumberInt > 15 ){
          alert("Você tem que apostar entre 6 a 15 números");
          return
      }

      const lista = Array(qtdNumberInt).fill(0);
      console.log("lista",lista);

      const arrayListaMega = lista.reduce((acumulate)=>{

          do{
             
              newNumber = chooseNumber(60);

              console.log("novo",newNumber)
              console.log("teste", 
                  acumulate.includes(newNumber) ,
                  !!acumulate.find((item: number) => item === newNumber )
              )

          } while ( acumulate.includes(newNumber) )
          //while ( !!acumulate.find((item) => item === newNumber ))
          

          acumulate.push(newNumber)

          console.log("acumulador",acumulate)

          return acumulate.sort((a: number , b: number ) => a - b);

      },[]);

      setlistaMegaSenaOficial(arrayListaMega);

      
  }

  const showNumbers = (lista:number[] ) => lista.map((item, index) => {
          return(<li key={index}>{item}</li>)
  })

  const keyPressEnter = (event: any) => {
      if(event.key == "Enter")
      {
          listaMega(numberDigit)
      }
  }
  


  return(
    <>
      <Head>
          <title>Gerador Mega Sena</title>
      </Head>

      <div className={styles.main}>
          <div className={styles.container}>
              
              <TitleMega />

              <BolaMegaSena functionShowNumbers={showNumbers(listaMegaSenaOficial)}  />
              
              <div className={styles.controleMega}>

                  <TextNumberMega 
                      numberDigitProps={numberDigit} 
                      handleClickButtonProps = {(e: any) => setNumberDigit(e.target.value)} 
                      handleEnterTextProps = {(e: any)=>{keyPressEnter(e)}}
                  />

                  <ButtonMega handleClickButtonMegaProps = {()=>listaMega(numberDigit)} />

              </div>
              
          </div>
      </div>
    </>
  )
}
