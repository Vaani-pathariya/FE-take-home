import React, { useState } from "react";
import axios from "axios";
import Posts from "./components/Posts";
import Comments from "./components/Comments";
import downArrow from "./assets/down.png"
import { Toaster } from "react-hot-toast";
const App: React.FC = () => {
  const [datatype, setDataType] = useState("none");

  return (
    <div>
      <Toaster 
      position="top-right"
      reverseOrder={false}/>
      <div className="my-4 ml-5 font-semibold">Dynamic Content Manager</div>
      <hr></hr>
      <div>
        <div className="ml-5 my-3 font-semibold">Fetch Content</div>
        <div className="border border-1 w-max m-2 p-3 rounded-sm">
        <div className="bg-gray-300 rounded-md p-2 flex">
          <div>Select content type</div>
          <img src={downArrow}></img>
        </div>
        <div className="bg-gray-300 mt-2 rounded-md p-1">
        <div className={`${datatype=="posts"?"bg-purple-200":""} rounded-md cursor-pointer p-1`} onClick={()=>setDataType("posts")}>Posts</div>
        <div className={`${datatype=="comments"?"bg-purple-200":""} rounded-md cursor-pointer p-1`} onClick={()=>setDataType("comments")}>Comments</div>
        </div>
        </div>
        <div className=" ml-2 border border-1 p-3 rounded-sm">
        <div className="font-semibold">Displaying Content</div>
        {datatype=="none"&&<div>Please select a data type</div>}
        {datatype=="posts" &&<Posts/>}
        {datatype=="comments"&&<Comments/>}
        </div>
      </div>
    </div>
  );
};

export default App;
