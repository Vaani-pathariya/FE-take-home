import React, { useEffect, useState } from "react";
import axios from "axios";
import left from "../assets/left_arrow.png";
import right from "../assets/right_arrow.png";
import toast from "react-hot-toast";
import * as XLSX from "xlsx"
function Comments() {
  interface Comment {
    body: String;
    email: String;
    id: String;
    name: String;
  }
  const [size, setSize] = useState<number>(25);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState<Comment[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const handleComments = async () => {
    toast.promise(
      axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response)=>{
        setComments(response.data);
      setCurrentPage(1);
      setPages(Math.ceil(response.data.length / size));
      })
      .catch((error)=>{
        console.log("Error regrieving Comments",error.message)
        throw new Error("");
      }),{
        loading:"Loading",
        success:"Successfully retrieved comments",
        error:"Error loading comments"
      }
    )
  };
  const UpPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const DownPage = () => {
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handlePageSizing = (e: any) => {
    if (e.target.value && e.target.value <= comments.length) {
      setSize(Number(e.target.value));
      setPages(Math.ceil(comments.length / Number(e.target.value)));
      setCurrentPage(1);
    }
  };
  const downloadData=()=>{
    const sheet = XLSX.utils.json_to_sheet(data);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book,sheet,"comments");
    XLSX.writeFile(book,"data.xlsx");
  }
  useEffect(() => {
    handleComments();
  }, []);
  useEffect(() => {
    setData(comments.slice(size * (currentPage - 1), size * currentPage));
  }, [currentPage, size]);
  return (
    <div>
      <label>Data size</label>
      <input
        type="number"
        placeholder="enter data size"
        onChange={handlePageSizing}
        value={size}
        className="bg-purple-200 text-center ml-2 rounded-md my-2 border-2"
      ></input>
      <div className="grid grid-cols-[1fr_2fr_2fr_4fr] border border-1">
        <div className="p-1 text-center">ID</div>
        <div className=" p-1">Name</div>
        <div className=" p-1">Email</div>
        <div className=" p-1">Body</div>
      </div>
      <div className="grid grid-cols-[1fr_2fr_2fr_4fr]">
        {data.map((item) => (
          <React.Fragment key={`${item.id}`}>
            <div className="border border-1 p-1 text-center">{item.id}</div>
            <div className="border border-1 p-1">{item.name}</div>
            <div className="border border-1 p-1">{item.email}</div>
            <div className="border border-1 p-1">{item.body}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="text-center">
      <button className="bg-purple-200 p-2 rounded-md mt-2" onClick={downloadData}>Download</button>
      </div>
      <div className="flex overflow-hidden">
        <img src={left} onClick={DownPage}></img>
        {Array.from({ length: pages }, (_, index) => (
          <button
            className={`px-2 py-1 border border-1 rounded-md m-2 ${
              index + 1 == currentPage && "bg-purple-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <img src={right} onClick={UpPage}></img>
      </div>
    </div>
  );
}

export default Comments;
