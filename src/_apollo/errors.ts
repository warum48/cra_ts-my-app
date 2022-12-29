export const er1 = {
  name: "ApolloError",
  graphQLErrors: [
    {
      message: "User is not authenticated",
      locations: [{ line: 33, column: 3 }],
      path: ["getTeStatus"],
    },
  ],
  clientErrors: [],
  networkError: null,
  message: "User is not authenticated",
};

export const errorTransformator = (apolloError:any) => {
    if(apolloError.message=="User is not authenticated"){
       return "Пользователь не авторизован"
    }
    return JSON.stringify(apolloError, null, 3)
}
