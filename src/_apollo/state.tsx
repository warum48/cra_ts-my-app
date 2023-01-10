import { InMemoryCache, ReactiveVar, makeVar } from "@apollo/client";

interface IFilters {
  status?: string | number | undefined;
  source?: string | number | undefined;
  taskId?: string | number | undefined;
  regionId?: string | number | undefined;
  testvalue?: string;
}

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        filters: {
          read() {
            return filtersVar();
          },
        },
        currendTEID: {
          read() {
            return currentTEIDVar();
          },
        },
        token: {
          read() {
            return tokenVar();
          },
        },
        //this is uncontrolled textField in Info component that shows mutable value
        inputInternalComment: {
          read() {
            return inputInternalCommentVar();
          },
        },

        searchInput: {
          read() {
            return searchInputVar();
          },
        },

        startDate: {
          read() {
            return startDateVar();
          },
        },

        endDate: {
          read() {
            return endDateVar();
          },
        },

        ascSortBy: {
          read() {
            return ascSortByVar();
          },
        },

        descSortBy: {
          read() {
            return descSortByVar();
          },
        },

        //---HELPERS---(not used in queries)---
        curtSortField: {
          read() {
            return curSortFieldVar();
          },
        },
      },
    },
  },
});

interface ISortField {
  field: string;
  sortType: string; //'desc' | 'asc' | null | undefined
}

//---INIT VALUES---
const filtersInitValue = {};
const currentTEIDInitValue = 4421432;
const tokenInitValue = "";
const inputInternalCommentInitValue = "";
const searchInputInitValue = "";
export const startDateInitValue = "2022-09-01";
export const endDateInitValue = "2222-09-01";
export const ascSortByInitValue = "";
export const descSortByInitValue = "teId";
export const curSortFieldInitValue = { field: "teId", sortType: "desc" };

//---VARS---
export const filtersVar: ReactiveVar<IFilters> =
  makeVar<IFilters>(filtersInitValue);
export const currentTEIDVar: ReactiveVar<Number> =
  makeVar<Number>(currentTEIDInitValue);
export const tokenVar: ReactiveVar<String> = makeVar<String>(tokenInitValue);
export const inputInternalCommentVar: ReactiveVar<String> = makeVar<String>(
  inputInternalCommentInitValue
);
export const searchInputVar: ReactiveVar<String> =
  makeVar<String>(searchInputInitValue);
export const startDateVar: ReactiveVar<String> =
  makeVar<String>(startDateInitValue);
export const endDateVar: ReactiveVar<String> =
  makeVar<String>(endDateInitValue);
export const ascSortByVar: ReactiveVar<String> =
  makeVar<String>(ascSortByInitValue);
export const descSortByVar: ReactiveVar<String> =
  makeVar<String>(descSortByInitValue);
export const curSortFieldVar: ReactiveVar<ISortField> = makeVar<ISortField>(
  curSortFieldInitValue
);
