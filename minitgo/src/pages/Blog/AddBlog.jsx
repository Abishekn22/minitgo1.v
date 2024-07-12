import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const AddBlog = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
      },[])

    const [formData, setFormData] = useState({
        title: "",
        description_1: "",
        description_2: "",
        description_3: "",
        image_1: "",
        image_2: "",
        image_3: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({
                ...formData,
                [name]: files[0].name,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                "https://minitgo.com/api/insert_blog.php",
                formData
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div
            className="container p-5 d-flex flex-column gap-4 shadow-lg"
            style={{ marginBlock: "10rem" }}
        >
            <h1 className="text-center fw-bold">Add a new Blog Post</h1>
            <Form className=" d-flex flex-column gap-3">
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="image_1">
                    <Form.Label>Image 1</Form.Label>
                    <Form.Control
                        type="file"
                        name="image_1"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="description_1">
                    <Form.Label>Description 1</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description_1"
                        value={formData.description_1}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="image_2">
                    <Form.Label>Image 2</Form.Label>
                    <Form.Control
                        type="file"
                        name="image_2"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="description_2">
                    <Form.Label>Description 2</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description_2"
                        value={formData.description_2}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="image_3">
                    <Form.Label>Image 3</Form.Label>
                    <Form.Control
                        type="file"
                        name="image_3"
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="description_3">
                    <Form.Label>Description 3</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="description_3"
                        value={formData.description_3}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={handleSubmit}
                    className="mt-3 mx-auto"
                    style={{ width: "max-content" }}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default AddBlog;
