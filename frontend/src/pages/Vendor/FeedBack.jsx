import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";
import { Rating } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarContent } from "@mui/material";
const FeedBack = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const [category, setCategory] = useState("Category");

  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:3000/feedback",
      data: {
        name: name,
        email: email,
        message: message,
        rating: rating,
        category: category,
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setName("");
        setEmail("");
        setMessage("");
        setRating(1);
        setCategory("");
      })
      .catch((err) => console.log(err.message));

    let obj = {
      name: name,
      email: email,
      message: message,
      rating: rating,
      category: category,
    };

    setName("");
    setEmail("");
    setMessage("");
    setRating(1);
    setCategory("");

    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="row mt-3">
          <div className="col-lg-14 h-100">
            <div className="p-3 bg-white g_border_radius  ">
              <div>
                <h5 className="fw-bold d-flex gap-2 align-items-center mb-0">
                  <i className="fa-solid fa-hospital"></i>
                  Feed Back
                </h5>
              </div>

              <Form onSubmit={handleSubmit} className="mt-3 d-flex flex-column">
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Your Name"
                  className="mt-4"
                  required
                  minLength={3}
                />
                <Form.Control
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Your Email"
                  className="mt-4"
                  required
                />
                <Form.Control
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Enter Your Message"
                  className="mt-4"
                  minLength={20}
                  required
                />
                <Form.Select
                  value={category}
                  className="mt-4"
                  required
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option value="">Category</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Compliment">Compliment</option>
                  <option value="Question">Question</option>
                  <option value="Bug Report">Bug Report</option>
                </Form.Select>
                <Rating
                  name="simple-controlled"
                  className="mt-4"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                />
                <Button type="submit" className="mt-3">
                  Submit
                </Button>
              </Form>
            </div>
          </div>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          message="Category Deleted Successfully!"
        >
          <SnackbarContent
            sx={{ backgroundColor: "rgb(9, 80, 130)", height: "50px" }}
            message={
              <p>
                {" "}
                <i className="fa fa-info-circle"></i> Feedback added
                Successfully!
              </p>
            }
          />
        </Snackbar>
      </div>
    </>
  );
};

export default FeedBack;
