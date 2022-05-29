import Content from './Content' 
import Header from './Header'
import Total from './Total'

const Course = ({ course }) => {

    return (
        <>
        <div>
           <h1> Web Development </h1>
        </div>
   
        <div>
        
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
        </>
        )
}

export default Course