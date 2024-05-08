//TO DO: Implement Pagination
import './App.css';
import { useState, useEffect } from 'react';
import Article from './Components/Article';
import Title from './Components/Title';
import SideBar from './Components/SideBar';
import default_img from './Components/default-placeholder.png'

const App = () =>{
    const [sortOption, setSortOption] = useState("Most Viewed");
    const [timeOption, setTimeOption] = useState("Day");
    const [amountOption, setAmountOption] = useState("6");
    const [evenArticlesData, setEvenArticles] = useState([])
    const [oddArticlesData, setOddArticles] = useState([])

    const handleSortChange = (option) => {
        setSortOption(option);
      };

    const handleTimeChange = (option) => {
        setTimeOption(option);
      };

    const handleAmountChange = (option) =>{
        const num = parseInt(option);
        if (!isNaN(num) && num >= 1 && num <= 15) {
          setAmountOption(option);
        } else {
          alert("Please enter a number between 1 and 15");
        }
    };

      const getArticles = async () => {
        var key = 'VimoDG1qozWj4hmfMfLa7jvp050RhDzQ';
        var time_frame_selection;
        var sort_by_selection;

        if(timeOption==="Day"){
          time_frame_selection = '1';
        }
        else if(timeOption==="Week"){
            time_frame_selection = '7';
        }
        else if(timeOption==="Month"){
            time_frame_selection = '30';
        }

        if(sortOption==="Most Viewed"){
            sort_by_selection = 'viewed';
        }
        else if(sortOption==="Most Shared"){
            sort_by_selection = 'shared';
        }
        else if(sortOption==="Most Emailed"){
            sort_by_selection = 'emailed';
        }

        var url;
        if(sort_by_selection==='shared'){
            url = "https://api.nytimes.com/svc/mostpopular/v2/shared/"+time_frame_selection+"/facebook.json?api-key="+key;
        }
        else{
            url = "https://api.nytimes.com/svc/mostpopular/v2/"+sort_by_selection+"/"+time_frame_selection+".json?api-key="+key;
        }
          
          const response = await fetch(url);
  
          const data = await response.json();
  
          console.log(data); // you can view if a response went through in developer mode. 
          var odd_articles = [];
          var even_articles = [];
          if (data.results && data.results.length > 0) {
            var i = -1;
            var article_count = -1;
            var article_title;
            var article_abstract;
            var article_date;
            var article_image_url;
            while(article_count+1 < amountOption){
                try{
                    i++;
                    article_title = data.results[i].title;
                    console.log("Title: ");
                    console.log(article_title);
                    article_title = data.results[i].title;
                    console.log("Title: ");
                    console.log(article_title);
                    article_abstract = data.results[i].abstract;
                    console.log("Abstract: ");
                    console.log(article_abstract);
                    article_date = data.results[i].published_date;
                    console.log("published_date: ");
                    console.log(article_date);
                    article_image_url = data.results[i].media[0]["media-metadata"][0].url;
                    console.log("image url: ");
                    console.log(article_image_url);
                    article_count ++;
                }
                catch(error){
                    article_title = "Article not available";
                    article_image_url = {default_img};
                    article_date = "0000-00-00";
                    article_abstract = error.message;
                    console.error("Error occurred while processing article:", error.message);
                    article_count++;
                }

                const article = {
                  title: article_title,
                  abs: article_abstract,
                  date: article_date,
                  img_url: article_image_url,
                  number:article_count+1
                };

                if(i%2===0){//since i=0 when article # = 1
                  odd_articles.push(article);
                }
                else{
                  even_articles.push(article);
                }
                
            }
            setOddArticles(odd_articles); 
            setEvenArticles(even_articles);
          } 
        else {
            console.log("No articles found.");
        }
      };

      useEffect(() => {
        getArticles();
      }, [sortOption,timeOption,amountOption]); //get articles when the values are updated, including default values 

  return (
    <div className="App">
      <div className = "body">
        <Title titleL={sortOption} titleR={timeOption}/>
        <div className = "content">
          <SideBar SortChange={handleSortChange} TimeChange={handleTimeChange} AmountChange={handleAmountChange}/>
          <div className = "articles">
            <div className = "article-column" id='Left-Column'>
              {oddArticlesData.map((article, index) => (
                                <Article
                                    number={article.number}
                                    date={article.date}
                                    abs={article.abs}
                                    img_url={article.img_url}
                                    title={article.title}
                                />
                            ))}
            </div>
            <div className = "article-column" id='Right-Columns'>
            {evenArticlesData.map((article, index) => (
                                <Article
                                    number={article.number}
                                    date={article.date}
                                    abs={article.abs}
                                    img_url={article.img_url}
                                    title={article.title}
                                />
                            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
