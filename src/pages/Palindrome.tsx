import { wrap } from "module";
import { useState } from "react";
import { checkServerIdentity } from "tls";

export default function Palindrome(){

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

    const [textPalindrome, setTextPalindrome] = useState("");
    const [qPalindrome, setQPalindrome] = useState<number>(0);

    const [palindromeResult, setPalindromeResult] = useState([]);

    const [palindromeStart, setPalindromeStart] = useState<string>("");
    const [palindromeEnd, setPalindromeEnd] = useState<string>("");
    const [palindromeSub, setPalindromeSub] = useState<string>("");


    const isPalindrome = (arrayTest:string[]) =>{

        const sizeArray = arrayTest.length;
        const halfArray = Math.floor(sizeArray/2);
        let test = true;

        if( halfArray === 0) return test = true 

        for (let i = 0; i < halfArray; i++) {
            if(arrayTest[i] !== arrayTest[sizeArray - (i+1)]){
                test = false;
            }
        }

        return test
    }

    const checkAnagram = (arrayTestFixed:string[], arrayTestVariable:string[]):boolean =>{

        let arrayFixed:string[] = []
        let arrayVariable:string[] = []
        
        let test = false;

        for (let index = 0; index < arrayTestVariable.length; index++) {
            
            if(test) break

            arrayFixed = [...arrayTestFixed, arrayTestVariable[index]]
            arrayVariable = [...arrayTestVariable]
            arrayVariable.splice(index,1)

            //console.log("anagramInitial", test,"arrayFixed",arrayFixed,"arrayVariable",arrayVariable);

            
            if(arrayVariable.length === 0){
                //console.log("ok",arrayFixed,"arrayVariable",arrayVariable, "test",test)

                if(isPalindrome(arrayFixed)){    
                    
                    //console.log("isPalindromeX:",1)
                    test = true
                    break
                }
                
            } else {
                //console.log("Recursive Anagram","arrayFixed",arrayFixed,"arrayVariable",arrayVariable);

                if(checkAnagram(arrayFixed, arrayVariable)){
                    test = true
                    //entry lenght - 1 times after stop because for create a new string with recusive
                    //console.log("anagramEnd", test,"arrayFixed",arrayFixed,"arrayVariable",arrayVariable, "test",test);
                    break
                }
               
            }
            
        }

        return test

    }


    const changeLetter = (arrayForChange:string[] , numberOfChanges:number): boolean =>{

        if( numberOfChanges == 0) return

        let arrayChange = [...arrayForChange]
        let test = false

        numberOfChanges = numberOfChanges -1;

        for (let i = 0; i < arrayForChange.length; i++) {
       
            if(test) break

            for (let j = 0; j < arrayForChange.length; j++) {

                if(arrayForChange[i] !== arrayForChange[j]){
                    arrayChange = [...arrayForChange]
                    arrayChange.splice(j,1,arrayForChange[i])
                    //console.log("REPETECO",arrayChange,"isPalindrome:", isPalindrome(arrayChange),"q:", numberOfChanges + 1);

                    if(isPalindrome(arrayChange)){
                        test = true
                        break
                    }
                    else if(checkAnagram([],arrayChange)){
                        test = true
                        break
                    } else if(numberOfChanges  > 0) changeLetter(arrayChange,numberOfChanges)
                }
            }
            
        }

        

        return test
    }
   
   

    const palindromeChecker = (s: string, q: number, startArray: string, endArray: string, subArray: string) =>{


        s = s.trim().toLowerCase()

        if( !s.match(/^[a-z]+$/) ){
            alert("Input oly letters in your text")
            return
        }

        if(s.length > 100000 || s.length < 1){
            alert("Input a number of letter between 1 and 100000")
            return
        }

        if(q > 100000 || q < 1){
            alert("Input a value of q between 1 and 100000")
            return
        }


        let arrayS:string[] = s.split('');
        let arrayTest:string[]
        
        const arrayStartIndex = startArray.split(",");  //Array(q) //0 ≤ startIndex[i], endIndex[i] < length of s
        const arrayEndIndex = endArray.split(",");   //Array(q); //endIndex[i] < length of s
        const arraySubs =   subArray.split(","); //Array(q); // 0 ≤ subs[i] ≤ length of s[startIndex[i]:endIndex[i]]
        const arrayResult:number[] = Array(q).fill(0)

        if(arrayStartIndex.length !== q ||arrayEndIndex.length !== q ||arraySubs.length !== q){
            alert("Input array the order the same size of the q")
            return
        }

        const testArrays = {
            failedStartIndex: false,
            failedEndIndex: false,
            failedSubs: false,
            failedStartBigerEnd: false
        };

        for (let i = 0; i < q; i++) {

            0 <= Number(arrayStartIndex[i]) ? false : testArrays.failedStartIndex = true;
            Number(arrayEndIndex[i]) < arrayS.length ? false : testArrays.failedEndIndex = true;
            Number(arrayStartIndex[i]) <= Number(arrayEndIndex[i]) ? false : testArrays.failedStartBigerEnd = true;

            0 <= Number(arraySubs[i]) && 
            Number(arraySubs[i]) <= 
            (Number(arrayEndIndex[i]) - Number(arrayStartIndex[i]) + 1) ?
            false : testArrays.failedSubs = true
        }

        let errorText= ""

        Object.keys(testArrays).forEach((key) => {
            //console.log(testArrays[key]);
            testArrays[key] ? (errorText += key +", ") : false
        });

        if(errorText !== ""){
            alert(errorText)
        }

        
        //console.log(testArrays)

        //Create the arrayTest
        arrayStartIndex.forEach((item, index) => {

            arrayTest = arrayS.slice(Number(item),Number(arrayEndIndex[index])+1)

            //console.log("INICIAL",arrayTest,"isPalindrome:", isPalindrome(arrayTest),"sub",arraySubs[index])

       
            if(isPalindrome(arrayTest)){
                arrayResult[index] = 1
            }
            else if(checkAnagram([],arrayTest)){
                arrayResult[index] = 1
            }
            else{
                if(changeLetter(arrayTest,Number(arraySubs[index])) ){
                    arrayResult[index] = 1
                }
            }

        });


        
        
        setPalindromeResult(arrayResult);        

    }



    return(
        
        <div style={{display:"flex", marginTop: "1rem", flexDirection:"column",justifyContent:"center",  alignItems:"center"}}>
            <h1>Palindrome</h1>
            
            <div style={{
                display:"flex", textAlign:"left", flexDirection:"column",
                justifyContent:"left",  marginTop:"2rem"
            }}>
                
                <label>Text</label>
                <input 
                    type="text" 
                    placeholder="Text Palindrome" 
                    value={textPalindrome} 
                    onChange={(e)=> setTextPalindrome(e.target.value)}
                    style={{display:"flex",  marginBottom:"0.5rem"}}
                />
                <label>q (size of arrays)</label>
                <input 
                    type="number" 
                    placeholder="q size Arrays" 
                    value={qPalindrome} 
                    onChange={(e)=> setQPalindrome(Number(e.target.value))}
                    style={{display:"flex", marginBottom:"0.5rem"}}
                />
                <label>Array Start</label>
                <input 
                    type="text" 
                    placeholder="startIndex, ex: 1,1,2" 
                    value={palindromeStart} 
                    onChange={(e)=> setPalindromeStart(e.target.value)}
                    style={{display:"flex", marginBottom:"0.5rem"}}
                />
                <label>Array End</label>
                <input 
                    type="text" 
                    placeholder="endIndex, ex: 3,4,5" 
                    value={palindromeEnd} 
                    onChange={(e)=> setPalindromeEnd(e.target.value)}
                    style={{display:"flex", marginBottom:"0.5rem"}}
                />
                <label>Array Sub</label>
                <input 
                    type="text" 
                    placeholder="subIndex, ex: 1,1,0"
                    value={palindromeSub} 
                    onChange={(e)=> setPalindromeSub(e.target.value)}
                    style={{display:"flex", marginBottom:"0.5rem"}}
                />



                <button 
                    onClick={()=> palindromeChecker(textPalindrome, qPalindrome, palindromeStart, palindromeEnd, palindromeSub)}
                    style={{display:"flex", margin:"1rem 0", width:"50px"}}
                >
                    Serch
                </button>
                <h2>Result:</h2>

                <ul style={{display:"flex", marginTop:"1rem", alignItems:"center", justifyContent:"center", background:"#7c8fc47b"}}>{palindromeResult.map((item, index)=>{
                    const text = <li key={index} style={{display:"flex", minWidth: "2rem", justifyContent:"center"}}>{item}</li>
                    return(text)
                })}</ul>
            </div>

        </div>
    )
}