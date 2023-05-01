import { useState } from "react";
export default function InputShortener({setInputValue}) {

     const [value,setValue]=useState('')
      
const handleClick = (e) => {
  e.preventDefault();
  setInputValue(value);
  setValue("");
};
 return (
    <div className="inputContainer">
      <h1>
        URL <span>Shortener</span>
      </h1>
      <div>
        <form onSubmit={handleClick}>
          <input
            type="text"
            placeholder="Paste a link to shorten it"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></input>
          <button>shorten</button>
        </form>
      </div>
    </div>
  );
}
