import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar'
import './index.scss'
import Canvas from '../Canvas'

const Layout = () => {
  return (
    <div className="App">
      <Canvas />
      <Sidebar />
      <div className="page">
        <span className="tags top-tags">&lt;body&gt;</span>

        <Outlet />

        <span className="tags bottom-tags">
          &lt;body&gt;
          <br />
          <span className="bottom-tag-html">&lt;/html&gt;</span>
        </span>
        <footer className="footer"></footer>
      </div>
    </div>
  )
}

export default Layout
