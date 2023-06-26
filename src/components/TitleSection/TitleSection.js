// компонент для заголовков 
import './TitleSection.css';

function TitleSection({ title }) {
  return (
    <h2 className='title'>{ title }</h2>
  )
}

export default TitleSection;