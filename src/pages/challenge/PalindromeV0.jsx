export default function Test(){

    

    function isPalindrome(arrayTest, sub) {
        // Write your code here

        const numberLetters  = {
            pair : 0,
            odd : 0
        }

        let test = false

        const sizeArray = arrayTest.length

        arrayTest.sort()

        arrayTest.forEach((item, index, array)=>{

            //the last letter of array or the group
            if(index === sizeArray - 1 || item !== array[index + 1]){

                numberLetters[item] ? numberLetters[item]++ : numberLetters[item] = 1;

                (numberLetters[item] % 2 === 0) ?
                numberLetters.pair += numberLetters[item] :
                numberLetters.odd += numberLetters[item];
                //console.log("pair:",numberLetters.pair, "odd:",numberLetters.odd);
                
            } else {
                numberLetters[item] ? numberLetters[item]++ : numberLetters[item] = 1;
            }
        })

        if(sizeArray % 2 === 0 && sizeArray === numberLetters.pair){
            test = true
        } else if(sizeArray % 2 !== 0 && (sizeArray === numberLetters.pair + 1)){
            test = true
        }
        
        if( sub > 0 && !test){
            if(sub >= Math.ceil(numberLetters.odd/2) && sizeArray % 2 === 0)
            {
                test = true
            }
            else if(sub >= Math.ceil((numberLetters.odd - 1)/2) && sizeArray % 2 !== 0){
                test = true
            }
        }

        return test
        
    }

    
    const palindromeChecker =  (s, q ,startIndex, endIndex, subIndex) =>{
        
        let arrayS = s.split('');
        let arrayTest
        
        const arrayResult = Array(q).fill(0);

        startIndex.forEach((item, index) => {

            arrayTest = arrayS.slice(item, endIndex[index]+1)

            if(isPalindrome(arrayTest, subIndex[index])){
                arrayResult[index] = 1
            }

        });

        console.log(arrayResult)
    }

    palindromeChecker("cbac", 3 ,[ 0, 2, 1 ], [ 3, 3, 3 ], [ 0, 2, 2 ])
    //0, 1, 1
    palindromeChecker("bcba", 3 ,[1, 2, 1], [ 3, 3, 1], [ 2, 0, 0 ])
    //1, 0, 1
    palindromeChecker("cbac", 3 ,[0, 2, 1], [ 3, 3, 3], [ 0, 2, 2])
    //0, 1, 1
    palindromeChecker("bcbab", 3 ,[1, 1, 2], [ 4, 3, 3], [ 3, 3, 0])
    //1, 1, 0
    palindromeChecker("cdecd", 4 ,[0, 0, 0, 0], [ 0, 1, 2, 3], [ 0, 1, 1, 0])
    //1, 1, 1, 0
    palindromeChecker("xxdnssuqevu", 1 ,[0], [ 10 ], [ 3])

    return(<h1>Test</h1>)
}