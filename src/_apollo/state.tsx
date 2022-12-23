
import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";
import { FilterVintageSharp } from "@mui/icons-material";
//import { Todos } from "./models/Todos";
//import { VisibilityFilter, VisibilityFilters } from "./models/VisibilityFilter";

interface IFilters {
    status?: string | number | undefined
    source?: string | number | undefined
    taskId?: string | number | undefined
    regionId?: string | number | undefined
    testvalue?: string
}
//filters: {regionId: 10, source: "", status: 10, taskId: 10}

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        filters: {
            read(){
                return filtersVar();
            }
        }
        /*todos: {
          read () {
            return todosVar();
          }
        },
        visibilityFilter: {
          read () {
            return visibilityFilterVar();
          },
        }*/
      }
    }
  }
});

/**
 * Set initial values when we create cache variables.
 */

/*const todosInitialValue: Todos = [
  {
    id: 0,
    completed: false,
    text: "Use Apollo Client 3"
  }
]

export const todosVar: ReactiveVar<Todos> = makeVar<Todos>(
  todosInitialValue
);

export const visibilityFilterVar = makeVar<VisibilityFilter>(
  VisibilityFilters.SHOW_ALL
)*/

const filtersInitValue = {}
export const filtersVar: ReactiveVar<IFilters> = makeVar<IFilters>(
    filtersInitValue
  );