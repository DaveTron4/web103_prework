import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState({
        name: "",
        url: "",
        description: "",
        imageURL: ""
    });

    // Fetch creator info
    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from("creators")
                .select("*")
                .eq("name", name)
                .single();

            if (error) console.error(error);
            else setCreator(data);
        };

        fetchCreator();
    }, [name]);

     // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCreator((prev) => ({ ...prev, [name]: value }));
    };

    // Update in Supabase
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { error } = await supabase
        .from("creators")
        .update({
            name: creator.name,
            url: creator.url,
            description: creator.description,
            imageURL: creator.imageURL
        })
        .eq("name", name);

        if (error) {
            console.error(error);
        } else {
            navigate("/creators"); // go back to creators list
        }
    };

    return (
        <div>
            <h1>Edit Creator</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Name:</label>
                <input name="name" value={creator.name} onChange={handleChange} />
                </div>
                <div>
                <label>URL:</label>
                <input name="url" value={creator.url} onChange={handleChange} />
                </div>
                <div>
                <label>Description:</label>
                <textarea
                    name="description"
                    value={creator.description}
                    onChange={handleChange}
                />
                </div>
                <div>
                <label>Image URL:</label>
                <input
                    name="imageURL"
                    value={creator.imageURL}
                    onChange={handleChange}
                />
                </div>
                <button type="submit">Update Creator</button>
            </form>
            </div>
    )
}

export default EditCreator