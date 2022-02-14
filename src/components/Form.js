import React, { useState } from "react";
import FormTextArea from "./FormTextArea";
import FormTextField from "./FormTextField";

export default function Form(props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    education: "",
    bio: "",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName.length === 0) {
      alert("First Name is required...");
    } else if (!formData.firstName.match(/^[a-zA-Z]+$/)) {
      alert("First Name should be contain Alphabets only...");
    } else if (formData.lastName.length === 0) {
      alert("Last Name is required...");
    } else if (!formData.lastName.match(/^[a-zA-Z]+$/)) {
      alert("Last Name should be contain Alphabets only...");
    } else if (formData.email.length === 0) {
      alert("Email is required...");
    } else if (
      !formData.email
        .toLowerCase()
        .match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/)
    ) {
      alert("Please Enter Valid Email...");
    } else if (formData.education.length === 0) {
      alert("Education is required...");
    } else if (formData.bio.length === 0) {
      alert("Bio is required...");
    } else if (formData.bio.length < 20) {
      alert("Bio should be atleast 20 character long");
    } else if (formData.dob.length === 0) {
      alert("Date Of Birth is required...");
    } else {
      let data =
        "\nForm data:\n" +
        "\nFirst Name: " +
        formData.firstName +
        "\nLast Name: " +
        formData.lastName +
        "\nEmail: " +
        formData.email +
        "\nEducation: " +
        formData.education +
        "\nBio: " +
        formData.bio +
        "\nDOB: " +
        formData.dob;
      alert(data);
      props.changeIsSubmit();
    }
  };

  return (
    <div className="container my-4">
      <form onSubmit={handleSubmit}>
        <FormTextField
          type="text"
          label="First Name"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          handleChange={handleChange}
          placeholder="First Name"
        />
        <FormTextField
          type="text"
          label="Last Name"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          handleChange={handleChange}
          placeholder="Last Name"
        />
        <FormTextField
          type="text"
          label="Email Address"
          name="email"
          id="email"
          value={formData.email}
          handleChange={handleChange}
          placeholder="Email"
        />
        <FormTextField
          type="text"
          label="Education"
          name="education"
          id="education"
          value={formData.education}
          handleChange={handleChange}
          placeholder="Education"
        />
        <FormTextArea
          label="Bio"
          value={formData.bio}
          id="bio"
          name="bio"
          rows="3"
          placeholder="Bio"
          handleChange={handleChange}
        />
        <FormTextField
          type="date"
          label="DOB"
          name="dob"
          id="dob"
          value={formData.dob}
          handleChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
        />
        <div className="mb-3 text-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
