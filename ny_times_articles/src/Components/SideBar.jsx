import React, { useState } from 'react';
import "./SideBar.css";

const SideBar = ({ SortChange, TimeChange, AmountChange}) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyPress = () => {
      AmountChange(inputValue);
      };

  return (
    <div className="options">
        <div className="text-entry">
        <input
          type="text"
          placeholder="Enter a value 1 - 15"
          onChange={(event) => setInputValue(event.target.value)}
          value={inputValue}
        />
        <button
        onClick={handleKeyPress}>ENTER</button>
      </div>
      <span className="filter">Filter</span>
      <span className="sortby-timeframe">Sort By:</span>
      <label className="radio-button">
        <input type="radio" name="Sort By" value="option1" defaultChecked onChange={() => SortChange("Most Viewed")} />
        Most Viewed
      </label>
      <label className="radio-button">
        <input type="radio" name="Sort By" value="option2" onChange={() => SortChange("Most Shared")} />
        Most Shared
      </label>
      <label className="radio-button">
        <input type="radio" name="Sort By" value="option3" onChange={() => SortChange("Most Emailed")} />
        Most Emailed
      </label>
      <span className="sortby-timeframe">Time Frame:</span>
      <label className="radio-button">
        <input type="radio" name="Time Frame" value="option4" defaultChecked onChange={() => TimeChange("Day")} />
        Day
      </label>
      <label className="radio-button">
        <input type="radio" name="Time Frame" value="option5" onChange={() => TimeChange("Week")} />
        Week
      </label>
      <label className="radio-button">
        <input type="radio" name="Time Frame" value="option6" onChange={() => TimeChange("Month")} />
        Month
      </label>
    </div>
  )
}

export default SideBar;
