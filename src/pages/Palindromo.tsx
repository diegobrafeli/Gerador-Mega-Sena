import { wrap } from "module";
import { useState } from "react";
import { checkServerIdentity } from "tls";

export default function Palindromo(){

    //Constraints

    // 1 ≤ length of the given string ≤ 100000
    // s contains only lowercase letters , ascii[a-z]
    // 1 ≤ q ≤ 100000
    // 0 ≤ startIndex[i], endIndex[i] < length of s
    // startIndex[i]  ≤ endIndex[i]
    // 0 ≤ subs[i] ≤ length of s[startIndex[i]:endIndex[i]]

    //--------------------------------

    //Input Format for Custom Testing
    //Input from stdin will be processed as follows and passed to the function.

    // 1- The first line contains a string s, the working string.
    // 2- The next line contains an integer q, the size of the startIndex array.
    // 3- The next q lines each contain an element startIndex[i] where 0 ≤ i < q.
    // 4- The next line contains an integer q, the size of the endIndex array.
    // 5- The next q lines each contain an element endIndex[i] where 0 ≤ i < q.
    // 6- The next line contains an integer q, the size of the subs array.
    // 7- The next q lines each contain an element subs[i] where 0 ≤ i < q.

    const [textPalindromo, setTextPalindromo] = useState("");
    const [qPalindromo, setQPalindromo] = useState<number>(0);

    const [palindromoResult, setPalindromoResult] = useState([]);

    const [palindromoStart, setPalindromoStart] = useState<string>("");
    const [palindromoEnd, setPalindromoEnd] = useState<string>("");
    const [palindromoSub, setPalindromoSub] = useState<string>("");


    const isPalindrome = (arrayTest:string[]) =>{

        const sizeArray = arrayTest.length;
        const halfArray = Math.floor(sizeArray/2);
        let test = 1;

        if( halfArray === 0) return test = 1 

        for (let i = 0; i < halfArray; i++) {
            if(arrayTest[i] !== arrayTest[sizeArray - (i+1)]){
                test = 0;
            }
        }

        return test
    }

    const checkAnagram = (arrayTestFixed:string[], arrayTestVariable:string[]):number =>{

        let arrayFixed:string[] = []
        let arrayVariable:string[] = []
        
        let test = 0;

        arrayTestVariable.forEach((item,index) => {

            if(test) return

            arrayFixed = [...arrayTestFixed, item]
            arrayVariable = [...arrayTestVariable]
            arrayVariable.splice(index,1)

            console.log("testInicio", test,"arrayFixed",arrayFixed,"arrayVariable",arrayVariable);

            
            if(arrayVariable.length === 0){
                console.log("ok",arrayFixed,"arrayVariable",arrayVariable, "test",test)

                if(isPalindrome(arrayFixed)){    
                    
                    console.log("isPalindrome:",1)
                    test = 1
                }
                
            } else if(checkAnagram(arrayFixed, arrayVariable)){

                console.log("TesteFIM", test,"arrayFixed",arrayFixed,"arrayVariable",arrayVariable, "test",test);
                
                test = 1
            }
                  


        });


        return test

    }


    const changeLetter = (arrayForChange:string[] , numberChanged:number): number =>{

        if( numberChanged == 0) return

        let arrayChange = [...arrayForChange]
        let test = 0

        numberChanged = numberChanged -1;

        arrayForChange.forEach((item) => {

            if(test === 1) return 

            for (let i = 0; i < arrayForChange.length; i++) {

                if(item !== arrayForChange[i]){
                    arrayChange = [...arrayForChange]
                    arrayChange.splice(i,1,item)
                    console.log("REPETECO",arrayChange,"isPalindrome:", isPalindrome(arrayChange),"q:", numberChanged + 1);

                    if(isPalindrome(arrayChange)){
                        test = 1
                        break
                    }
                    else if(checkAnagram([],arrayChange)){
                        test = 1
                        break
                    } else if(numberChanged  > 0) changeLetter(arrayChange,numberChanged)
                }
            }
            
        });

        return test
    }
   
   

    const palindromeChecker = (s: string, q: number, startArray: string, endArray: string, subArray: string) =>{


        if(s.length > 100000 || s.length < 1){
            alert("Input a value between 1 and 100000")
            return
        }

        let arrayS:string[] = s.trim().split('');
        let arrayTest:string[]
        


        const arrayStartIndex = startArray.split(",");  //Array(q) //0 ≤ startIndex[i], endIndex[i] < length of s
        const arrayEndIndex = endArray.split(",");   //Array(q); //endIndex[i] < length of s
        const arraySubs =   subArray.split(","); //Array(q); // 0 ≤ subs[i] ≤ length of s[startIndex[i]:endIndex[i]]
        const arrayResult:number[] = Array(q).fill(0)


        //Create the arrayTest
        arrayStartIndex.forEach((item, index) => {
            arrayTest = arrayS.slice(Number(item),Number(arrayEndIndex[index])+1)

            console.log("INICIAL",arrayTest,"isPalindrome:", isPalindrome(arrayTest),"sub",arraySubs[index])

             
            if(isPalindrome(arrayTest)){
                arrayResult[index] = 1
            }else if(checkAnagram([],arrayTest)){
                arrayResult[index] = 1
            }else{
                if(changeLetter(arrayTest,Number(arraySubs[index])) ){
                    arrayResult[index] = 1
                }
            }

        });


        
        
        setPalindromoResult(arrayResult);        

    }



    return(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", marginTop:"2rem"}}>
            <h1>Palindromo</h1>
            <input 
                type="text" 
                placeholder="Text Palindromo" 
                value={textPalindromo} 
                onChange={(e)=> setTextPalindromo(e.target.value)}
                style={{display:"flex", marginTop:"2rem"}}
            />

            <input 
                type="number" 
                placeholder="q size Arrays" 
                value={qPalindromo} 
                onChange={(e)=> setQPalindromo(Number(e.target.value))}
                style={{display:"flex", marginTop:"1rem"}}
            />

            <input 
                type="text" 
                placeholder="startIndex, ex: 1,1,2" 
                value={palindromoStart} 
                onChange={(e)=> setPalindromoStart(e.target.value)}
                style={{display:"flex", marginTop:"1rem"}}
            />

            <input 
                type="text" 
                placeholder="endIndex, ex: 3,4,5" 
                value={palindromoEnd} 
                onChange={(e)=> setPalindromoEnd(e.target.value)}
                style={{display:"flex", marginTop:"1rem"}}
            />

            <input 
                type="text" 
                placeholder="subIndex, ex: 1,1,0"
                value={palindromoSub} 
                onChange={(e)=> setPalindromoSub(e.target.value)}
                style={{display:"flex", marginTop:"1rem"}}
            />



            <button 
                onClick={()=> palindromeChecker(textPalindromo, qPalindromo, palindromoStart, palindromoEnd, palindromoSub)}
                style={{display:"flex", marginTop:"1rem"}}
            >
                Serch
            </button>
            <h2>Result:</h2>

            <ul style={{display:"flex", marginTop:"1rem", alignItems:"center", justifyContent:"center", background:"#7c8fc47b"}}>{palindromoResult.map((item, index)=>{
                const text = <li key={index} style={{display:"flex", minWidth: "2rem", justifyContent:"center"}}>{item}</li>
                return(text)
            })}</ul>
        </div>
        
    )
}