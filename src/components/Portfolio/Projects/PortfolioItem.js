import { useParams } from 'react-router-dom'
import Cooledtured from './Cooledtured/cooledtured'

function PortfolioItem() {
  let { itemId } = useParams()

  return (
    <div>
      <h2>Portfolio Item: {itemId}</h2>
      <Cooledtured />
    </div>
  )
}

export default PortfolioItem
