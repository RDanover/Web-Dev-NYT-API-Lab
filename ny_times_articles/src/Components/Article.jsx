import React from 'react'
import "./Article.css"

const Article = ({ number, title, date, img_url, abs }) => {

  return (
    <div className = "article">
        <div className = "article-title">
            <span className = "article-number">{number}</span>
            <span className = "article-title-full">{title}</span>
            <span className = "article-date" >{date}</span>
        </div>
        <div className = "article-content">
            <img className = "article-image" src = {img_url} alt = "default"></img>
            <span className = "article-abstract" >{abs}</span>
        </div>
    </div>
  )
}

export default Article;
