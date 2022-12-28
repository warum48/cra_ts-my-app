//import { filtersVar, searchInputVar, startDateVar, endDateVar } from "_apollo/state";
//import { filtersVar } from "_apollo/state";
import { gql, useReactiveVar } from "@apollo/client";

export const GEO_TE_BYID = gql`
query geoQuery ($id: Int!) {
    getTasksExecutionsById(teId: $id) {
      store {
        address
        latitude
        longitude
      }
      latitude
      longitude
      distance
    }
  }
  `