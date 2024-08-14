import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ListGroup, Image, Button } from "react-bootstrap";
import axios from "axios";

function Updates() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://minitgo.com/api/fetch_blog.php"
        );
        setBlogs(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div
      className="container d-flex flex-column gap-1 shadow p-3 mb-5 bg-white rounded"
      style={{ marginBlock: "1rem" }}
    >
      <h2
        className="fs-20 fw-bold mt-3  card border border-1  bg-secondary text-white   "
        style={{ color: "gray" }}
      >
        {" "}
        Updates
      </h2>
      {Array.isArray(blogs) &&
        blogs?.map((blog) => (
          <ListGroup key={blog.id} className=" shadow-lg ">
            <ListGroup.Item className="">
              <h4 className="text-center p-4 ">{blog.title}</h4>
            </ListGroup.Item>
            {blog.description_1?.length > 0 && (
              <ListGroup.Item className="p-4">
                <p>{blog.description_1}</p>
              </ListGroup.Item>
            )}
            {blog.image_1?.length > 0 && (
              <ListGroup.Item className="p-4">
                <Image src={blog.image_1} fluid />
              </ListGroup.Item>
            )}
            {blog.description_2?.length > 0 && (
              <ListGroup.Item className="p-4">
                <p>{blog.description_2}</p>
              </ListGroup.Item>
            )}
            {blog.image_2?.length > 0 && (
              <ListGroup.Item className="p-4">
                <Image src={blog.image_2} fluid />
              </ListGroup.Item>
            )}
            {blog.description_3?.length > 0 && (
              <ListGroup.Item className="p-4">
                <p>{blog.description_3}</p>
              </ListGroup.Item>
            )}
            {blog.image_3?.length > 0 && (
              <ListGroup.Item className="p-4">
                <Image src={blog.image_3} fluid />
              </ListGroup.Item>
            )}
          </ListGroup>
        ))}
    </div>
  );
}

export default Updates;
