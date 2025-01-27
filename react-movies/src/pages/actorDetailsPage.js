import React from "react";
import { useParams } from 'react-router-dom';
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";
import { useQuery } from "react-query";
import { getActorDetails } from "../api/moviesAPI";

const ActorPage = (props) => {
  const { id } = useParams();
  const { data: actor, error, isLoading, isError } = useQuery(
    ["actor", { id: id }],
    getActorDetails
  );

  if (isLoading) {
    return "Loading";
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {actor ? (
        <>
          <PageTemplate actor={actor}>
            <ActorDetails actor={actor} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default ActorPage;