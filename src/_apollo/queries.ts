//import { filtersVar, searchInputVar, startDateVar, endDateVar } from "_apollo/state";
//import { filtersVar } from "_apollo/state";
import { gql, useReactiveVar } from "@apollo/client";

//-------------------MAIN TABLE-----------
export const GET_TE = gql`
  query MyQuery ($page:Int!, $filters:TeFilters, $search:String, $startDate:Date, $endDate:Date, $ascSortBy:String, $descSortBy:String ) {
    getTasksExecutions(filters: $filters, pages: {pageNumber: $page, limit: 100}, search:$search, startDate:$startDate, endDate:$endDate, ascSortBy: $ascSortBy, descSortBy: $descSortBy) {
      pagesCount
      earliestDate
      teList {
        dateEnd
        dateStart
        source
        storeId
        userId
        taskId
        status
        statusDescription
        id
        user {
          name
          surname
        }
        store {
          address
        }
      }
    }

    getTeStatus {
      statusesList {
        description
        status
      }
    }

    getTasksNames {
      tasksNamesList {
        id
        name
      }
    }

  }
  `
// sory by:
/*
Значения параметров должны быть:
'teId'
'taskId'
'dateStart'
'dateEnd'
'userId'
'storeId'
'source'
'status'*/

//---EARLIEST DATE--- used in DateFilters ---
export const GET_EARLIEST_DATE = gql`
  query MyQuery ($page:Int!) {
    getTasksExecutions(pages: {pageNumber: $page, limit: 1}) {
      earliestDate     
    }
  }
  `

//-------------------DETAILS---------------
//TODO:extract 
export const GET_TE_DETAILS = gql`
  query TeDetailsQuery($id: Int!) {
    getTeSteps(teId: $id) {
      teStepsList {
        dateEnd
        id
        dateStart
        isSkip
        name
        stepType
        stepTypeDescription
        taskId
      }
    }
    getTeAssortment(teId: $id) {
      teAssortmentList {
        avail
        constructorStepName
        goodId
        id
        taskId
        good {
          code
          description
          id
          name
        }
      }
    }
    getTasksExecutionsById(teId: $id) {
      comments
      commentsInternal
      commentsStatus
      dateEnd
      dateStart
      id
      distance
      latitude
      longitude
      money
      moneySource
      source
      status
      storeId
      taskId
      userId
      statusDescription
      task {
        id
        name
      }
      store {
        address
        id
        latitude
        longitude
      }
      user {
        name
        surname
      }
    }
  }
`;
/*
      statusDescription
      task {
        id
        name
      }
      */

export const GET_STEPS_TE_BYID = gql`
query stepsQuery ($id: Int!) {
  getTeSteps(teId: $id) {
    teStepsList {
      dateEnd
      id
      dateStart
      isSkip
      name
      stepType
      taskId
    }
  }
}
`;

export const GET_ASSORTMENT_TE_BYID = gql`
query assortmentQuery ($id: Int!) {
  getTeAssortment(teId: $id) {
    teAssortmentList {
      avail
      constructorStepName
      goodId
      id
      taskId
      good {
        code
        description
        id
        name
      }
    }
  }
}
`;

export const GEO_TE_BYID = gql`
  query geoQuery($id: Int!) {
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
`;
