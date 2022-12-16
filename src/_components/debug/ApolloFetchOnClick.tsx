import { useQuery, gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export function ApolloFetchOnClick() {
 
  const [getCountries, { loading, error, data }] = useLazyQuery(GET_LOCATIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <button onClick={() => getCountries()}>-ЗАПРОСИТЬ APOLLO QUERY-</button>
      {data && <div>data{JSON.stringify(data.locations)}</div>}
      {data &&
        data.locations.map(({ id, name, description, photo }: any) => (
          <div key={id}>
            <h3>{name}</h3>
            <img
              width="400"
              height="250"
              alt="location-reference"
              src={`${photo}`}
            />
            <br />
            <b>About this location:</b>
            <p>{description}</p>
            <br />
          </div>
        ))}
    </>
  );
}
