import React, { useState } from 'react';

export default function Form(props) {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        education: "",
        bio: "",
        dob: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.firstName.length === 0) {
            alert("First Name is required...");
        } else if (formData.lastName.length === 0) {
            alert("Last Name is required...");
        } else if (formData.email.length === 0) {
            alert("Email is required...");
        } else if (formData.education.length === 0) {
            alert("Education is required...");
        } else if (formData.bio.length === 0) {
            alert("Bio is required...");
        } else if (formData.dob.length === 0) {
            alert("Date Of Birth is required...");
        } else {
            let data = "\nForm data:\n" +
                "\nFirst Name: " + formData.firstName +
                "\nLast Name: " + formData.lastName +
                "\nEmail: " + formData.email + 
                "\nEducation: " + formData.education + 
                "\nBio: " + formData.bio + 
                "\nDOB: " + formData.dob;
            alert(data);
            props.changeIsSubmit();
        }
    };

    return (
        <div className="container my-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label for="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                </div>
                <div className="mb-3">
                    <label for="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} id="lastName" />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" value={formData.email} onChange={handleChange} className="form-control" name="email" placeholder="Email" id="email" />
                </div>
                <div className="mb-3">
                    <label for="education" className="form-label">Education</label>
                    <input type="text" className="form-control" name="education" value={formData.education} onChange={handleChange} placeholder="Education" id="education" />
                </div>
                <div className="mb-3">
                    <label for="bio" className="form-label">Bio</label>
                    <textarea className="form-control" id="bio" value={formData.bio} onChange={handleChange} name="bio" rows="3" placeholder="Bio"></textarea>
                </div>
                <div className="mb-3">
                    <label for="dob" className="form-label">DOB</label>
                    <input type="date" className="form-control" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} id="dob" max={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="mb-3 text-center">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}
