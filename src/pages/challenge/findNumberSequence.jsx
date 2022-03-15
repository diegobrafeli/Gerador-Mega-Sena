export default function Test(){

    
    function findNumberSequence(direction) {
        // Write your code here

        let arrayDirection = direction.split("");
        let n = arrayDirection.length;
        let lineSegment = Math.pow(2,n);
        let arraySegment = Array(n);
        let arrayDipolo = [0,lineSegment];
       
        //console.log(arrayDirection, n, lineSegment);

        arrayDirection.forEach((item, index) => {
            //console.log(index, item);
            lineSegment = lineSegment/2;

            if(item == "L"){              
                arrayDipolo[1] -= lineSegment; 
                arraySegment.push({i:index + 1, center: arrayDipolo[1]})
            }else{
                arrayDipolo[0] += lineSegment;
                arraySegment.push({i:index + 1, center: arrayDipolo[0]});
            }
        });

        function numbersCompare(a, b) {
            return a.center - b.center;
        }

        arraySegment.sort(numbersCompare)
        
        let segment = ""
        arraySegment.forEach(({i, center})=>{
            console.log(i, center);
            segment += i;
        })
        console.log(segment);

    }


    //findNumberSequence("LRRLLL")
    //2, 3, 6, 5, 4, 1
    //findNumberSequence("LRLRRL")
    //2, 4, 5, 6, 3, 1
    findNumberSequence("LLLRRLLRLLLLLLLLRRRRRRRLLLRLRL")
    //4, 5, 8, 7, 6, 3, 2, 1

    return(<h1>Test</h1>)
}