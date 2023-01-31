import React from "react";
import AddPostCard from "./../../PostCard";

const AddClient = () => {
    const formData = [
        { id: "company", fieldName: "Clinic ", isFieldRequired: true },
        { id: "title", fieldName: "Title", isFieldRequired: false },
        { id: "firstName", fieldName: "First Name", isFieldRequired: true },
        { id: "lastName", fieldName: "Last Name", isFieldRequired: true },
        { id: "address1", fieldName: "Address 1", isFieldRequired: true },
        { id: "state", fieldName: "State", isFieldRequired: true },
        { id: "country", fieldName: "Country", isFieldRequired: false },
        { id: "city", fieldName: "City", isFieldRequired: true },
        { id: "email", fieldName: "Email", isFieldRequired: true },
        { id: "phone", fieldName: "Phone No", isFieldRequired: true },
        { id: "phonetype", fieldName: "Phone Type", isFieldRequired: true },
        { id: "address2", fieldName: "Address 2", isFieldRequired: false },
    ];

    return <AddPostCard formData={formData}></AddPostCard>;
};

export default AddClient;
