export default function Test(){


    function numbersCompare(a, b) {
        return b - a;
    }

    function destruction(arrayStones){

        let restWeight = 0;
        let arrayWeights = [...arrayStones]
        arrayWeights.sort(numbersCompare);

        if(arrayWeights.length === 1){
            
            return arrayWeights[0]

        } else if(arrayWeights.length === 2)
        {
            restWeight = arrayWeights[0] - arrayWeights[1] 
            return restWeight
        }  
        else {

            restWeight = arrayWeights[0] - arrayWeights[1];

            restWeight > 0 ? arrayWeights.push(restWeight) : false;

            arrayWeights.splice(0,2);

            return destruction(arrayWeights);
        }


    }

    
    function lastStoneWeight(weights) {
        // Write your code here
        return destruction(weights); 

    }

    console.log(lastStoneWeight([2, 4, 5, 6, 7, 8, 25 ,2 , 65, 3 ,28, 90, 5, 28,2, 4, 5, 6, 7, 8, 25 ,2 , 65, 3 ,28, 90, 5, 28, 2, 4, 5, 6, 7, 8, 25 ,2 , 65, 3 ,28, 90, 5, 28,2, 4, 5, 6, 7, 8, 25 ,2 , 65, 3 ,28, 90, 5, 28]));

    return(<h1>Test</h1>)

    let array = [1,2,3].sp
}