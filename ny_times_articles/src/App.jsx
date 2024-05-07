import './App.css';
import { useState, useEffect } from 'react';
import Article from './Components/Article';
import Title from './Components/Title';
import SideBar from './Components/SideBar';
import default_img from './Components/default-placeholder.png'

const App = () =>{
    const [sortOption, setSortOption] = useState("Most Viewed");
    const [timeOption, setTimeOption] = useState("Day");

    const handleSortChange = (option) => {
        setSortOption(option);
      };

    const handleTimeChange = (option) => {
        setTimeOption(option);
      };

  return (
    <div className="App">
      <div className = "body">
        <Title titleL={sortOption} titleR={timeOption}/>
        <div className = "content">
          <SideBar SortChange={handleSortChange} TimeChange={handleTimeChange}/>
          <div className = "articles">
            <div className = "article-column">
              <Article number={0} title={"Title"} date={"0000-00-00"} img_url={default_img} abs={"Abstract"}/>
            </div>
            <div className = "article-column">
            <Article number={1} title={"Title"} date={"0000-00-00"} img_url={default_img} abs={"Abstract"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
