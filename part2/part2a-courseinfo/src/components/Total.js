

const Total = ({parts}) => {
    
    const sumFunction = (sum, part) => {
        return sum+part.exercises
    }
    return (
        <p> Number of exercises {parts.reduce(sumFunction,0)} </p>
    )

}

export default Total