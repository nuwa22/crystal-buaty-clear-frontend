export default function ProdctCard(props){
    console.log(props);

    return (
        <div className="bg-red-900 text-white flex flex-col items-center justify-center">
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p>{props.price}</p>
            <button>Add to Cart</button>
        </div>
    )
}