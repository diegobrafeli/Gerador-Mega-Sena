export function DisplayCounter(props)
{
    return(
        <div style={{
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center",
            color: "#FFF",
            background:"#000",
            width: "60px",
            height: "60px",
            borderRadius:"50%",
            margin: "15px"
        }}>
            {props.amount}
        </div>
    )
}