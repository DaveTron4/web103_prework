import React from 'react'
import { useState } from "react";
import { supabase } from "../client";

const AddCreator = () => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
        .from("creators")
        .insert([{ name, url, description, imageURL }])
        .select();

        if (error) {
        console.error("Error inserting creator:", error);
        } else {
        console.log("Creator added:", data);
        // Optionally clear form
        setName("");
        setDescription("");
        setImageURL("");
        setUrl("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}

            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Image URL"
                value={imageURL}
                onChange={(e) => setImageURL(e.target.value)}
            />
            <button type="submit">Add Creator</button>
        </form>
    );
}

export default AddCreator