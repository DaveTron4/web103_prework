import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";
import { FaExternalLinkAlt } from "react-icons/fa";

const ViewCreator = () => {
  const { name } = useParams();
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    const fetchCreator = async () => {
      let { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("name", name)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
      } else {
        setCreator(data);
      }
    };

    fetchCreator();
  }, [name]);

  if (!creator) return <p>Loading...</p>;

  return (
    <div className="view-creator-container">
      <div className="view-creator-card">
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="view-creator-image"
        />
        <div className="view-creator-info">
          <h1 className="view-creator-name">{creator.name}</h1>
          <a
            href={creator.url}
            className="view-creator-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaExternalLinkAlt /> Visit Creator Page
          </a>
          <p className="view-creator-description">{creator.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;