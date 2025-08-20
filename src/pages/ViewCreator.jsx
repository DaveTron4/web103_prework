import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // <-- should be react-router-dom
import { supabase } from "../client";

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
    <div>
      <h1>{creator.name}</h1>
      <img src={creator.imageURL} alt={creator.name} />
      <p>{creator.description}</p>
    </div>
  );
};

export default ViewCreator;
