const renderPortfolio = (portfolio) => {
  return (
    <div className="images-container">
      {portfolio.map((port, idx) => {
        return (
          <div className="image-box" key={idx}>
            <img className="portfolio-image" src={port.image} alt="porfolio" />
            <div className="content">
              <p className="title">{port.name}</p>
              <h4 className="description">{port.description}</h4>
              <button className="btn" onClick={() => window.open(port.url)}>
                View
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default renderPortfolio
