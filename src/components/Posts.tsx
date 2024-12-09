import React, { useEffect, useState } from "react";
import axios from "axios";
import left from "../assets/left_arrow.png";
import right from "../assets/right_arrow.png";
import toast from "react-hot-toast";
import * as XLSX from "xlsx"
function Posts() {
  interface Post {
    id: String;
    title: String;
  }
  const [posts, setPosts] = useState<Post[]>([]);
  const [pages, setPages] = useState(0);
  const [data, setData] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const handlePosts = async () => {
    toast.promise(
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          setPages(Math.ceil(response.data.length / 10));
          setCurrentPage(1);
          setPosts(response.data);
        })
        .catch((error) => {
          console.log("Error fetching Posts", error.message);
          throw new Error("");
        }),
      {
        loading: "Loading",
        success: "Posts retrieved successfully",
        error: "Error loading posts",
      }
    );
  };
  const downloadData=()=>{
    const sheet = XLSX.utils.json_to_sheet(data);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book,sheet,"posts");
    XLSX.writeFile(book,"data.xlsx");
  }
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
  useEffect(() => {
    handlePosts();
  }, []);
  useEffect(() => {
    setData(posts.slice(10 * (currentPage - 1), 10 * currentPage));
  }, [currentPage]);
  return (
    <div>
      <div className="grid grid-cols-[1fr_3fr] mt-2 border border-1">
        <div className=" text-center p-1">ID</div>
        <div className="p-1">Title</div>
      </div>
      <div className="grid grid-cols-[1fr_3fr]">
        {data.map((item) => (
          <React.Fragment key={`${item.id}`}>
            <div className="border border-1 text-center p-1">{item.id}</div>
            <div className="border border-1 p-1">{item.title}</div>
          </React.Fragment>
        ))}
      </div>
      <div className="text-center">
      <button className="bg-purple-200 p-2 rounded-md mt-2" onClick={downloadData}>Download</button>
      </div>
      <div className="flex mt-2">
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

export default Posts;
