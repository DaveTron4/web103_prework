import { useNavigate } from 'react-router';
import { FaExternalLinkAlt, FaEdit, FaTrash  } from "react-icons/fa"; // icons
import { supabase } from "../client"; 
import "../App.css";

const CreatorComponent = ({name, url, description, imageURL, onDelete }) => {
    const navigate = useNavigate();

    // Truncate description to 30 words
    const getTruncatedDescription = (text) => {
        if (!text) return "";
            const words = text.split(" ");
        if (words.length <= 10) return text;
            return words.slice(0, 10).join(" ") + " ...";
    };

    // Delete function
    const handleDelete = async (e) => {
        e.stopPropagation(); // prevent routing
        const { error } = await supabase
            .from("creators")
            .delete()
            .eq("name", name); // assuming your table has 'id' as PK

        if (error) {
            console.error("Error deleting creator:", error.message);
        } else {
            console.log("Creator deleted successfully!");
            if (onDelete) onDelete(id); // update UI if parent passes callback
        }
    };

    return (
        <div className="creator-card" onClick={() => navigate(`/viewCreator/${name}`)}>
            {/* Image Section */}
            <img src={imageURL} alt={`${name}'s avatar`} className="creator-image" />

            {/* Content Section */}
            <div className="creator-content">
                <h2 className="creator-name">{name}</h2>
                <p className="creator-description">{getTruncatedDescription(description)}</p>

                {/* Buttons */}
                <div className="creator-actions">
                    <a 
                        href={url} 
                        className="creator-link" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()} // prevent routing
                    >
                        <FaExternalLinkAlt /> Visit Page
                    </a>

                    <button 
                        className="edit-btn" 
                        onClick={(e) => {
                            e.stopPropagation(); // prevent routing to view
                            navigate(`/editCreator/${name}`);
                        }}
                    >
                        <FaEdit /> Edit
                    </button>

                    <button 
                        className="delete-btn" 
                        onClick={handleDelete}
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatorComponent;