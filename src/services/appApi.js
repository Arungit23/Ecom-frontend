import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// create the api
// export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const appApi = createApi({
 reducerPath: "appApi",

// baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5050" }),

baseQuery: fetchBaseQuery({ baseUrl: "https://long-ruby-chiton-cape.cyclic.cloud" }),




  endpoints: (builder) => ({
     signup: builder.mutation({
         query: (user) => ({
             url: "/users/Signup",
             method: "POST",
             body: user,
         }),
     }),
   

   login: builder.mutation({
    query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
    }),
}),






 // creating product
 createProduct: builder.mutation({
    query: (product) => ({
        url: "/products",
        body: product,
        method: "POST",
    }),
}),

deleteProduct: builder.mutation({
    query: ({ product_id, user_id }) => ({
        url: `/products/${product_id}`,
        body: {
            user_id,
        },
        method: "DELETE",
    }),
}),

updateProduct: builder.mutation({
    query: (product) => ({
        url: `/products/${product.id}`,
        body: product,
        method: "PATCH",
    }),
}),



 // add to cart
 addToCart: builder.mutation({
    query: (cartInfo) => ({
        url: "/products/add-to-cart",
        body: cartInfo,
        method: "POST",
    }),
}),
  // remove from cart
  removeFromCart: builder.mutation({
    query: (body) => ({
        url: "/products/remove-from-cart",
        body,
        method: "POST",
    }),
}),
   // increase cart
   increaseCartProduct: builder.mutation({
    query: (body) => ({
        url: "/products/increase-cart",
        body,
        method: "POST",
    }),
}),

// decrease cart
decreaseCartProduct: builder.mutation({
    query: (body) => ({
        url: "/products/decrease-cart",
        body,
        method: "POST",
    }),
}),

 // create order

createOrder: builder.mutation({
    query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
    }),
}),


update: builder.mutation({
    query:(user) => ({
        url: `/users/${user.userId}/profile`,
        method: "PATCH",
        body: user
    })
}),



}),
});




export const {useSignupMutation,
 useLoginMutation,  useCreateProductMutation,  useAddToCartMutation,
 useRemoveFromCartMutation,
 useIncreaseCartProductMutation,
 useDecreaseCartProductMutation, 
 useDeleteProductMutation,
 useUpdateMutation,
  useCreateOrderMutation, useUpdateProductMutation,} = appApi;


 export default appApi;



