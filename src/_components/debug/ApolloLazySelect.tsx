import { useQuery, gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";
import Select, {
    //ValueType,
    ActionMeta,
  } from "react-select";
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

export function ApolloLazySelect() {
 
  const [getCountries, { loading, error, data }] = useLazyQuery(GET_LOCATIONS);

  //if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      
      <Select
      onFocus={() => getCountries()}
              isMulti={true}
                //defaultValue={options[0] }
                //onChange={handleChangeTasks}
                options={data?.locations || []}
               // value={selectedOptionTasks}
                placeholder={"Выберите шаг задачи"}
                noOptionsMessage={() => "Загрузка"} //({inputValue}) => !inputValue ? noOptionsText : 
                // styles={select_styles}
                /*classNamePrefix={
                  theme.palette.mode === "dark"
                    ? "react-select-dark"
                    : "react-select"
                }*/
              />
      {data && <div>data{JSON.stringify(data.locations)}</div>}
      {data &&
<>


        {/*data.locations.map(({ id, name, description, photo }: any) => (
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
        ))*/}
        </>
    }
    </>
  );
}
