import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import './RestaurantList.css';

const RestaurantList = () => (
  <Query
    query={gql`
      {
        restaurants (name: "Neighbor's Kitchen & Yard") {
          name
          cuisines
          webiste
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error</p>;

      return (
          <div className="RestaurantList">
          <h1>Restaurants:</h1>
        <ul>
          {data.restaurants.map(({name}, i) => (
          <li key={i}>{name}</li>
          ))}
        </ul>
        </div>
      );
    }}
  </Query>
);

export default RestaurantList;
