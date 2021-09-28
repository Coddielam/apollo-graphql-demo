import React from "react";
import { Layout } from "../components";
import { useQuery, gql } from "@apollo/client";
import TrackCard from "../containers/track-card";
import { QueryResult } from "../components";
/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */

export const TRAKCS = gql`
  query getTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        id
        name
        photo
      }
    }
  }
`;

const Tracks = () => {
  const { data, error, loading } = useQuery(TRAKCS);
  if (loading) return "Loading...";
  if (error) return error.message;
  return (
    <Layout grid>
      <QueryResult error={error} loading={loading} data={data}>
        {data?.tracksForHome?.map((track) => {
          return <TrackCard track={track} />;
        })}
      </QueryResult>
    </Layout>
  );
};

export default Tracks;
