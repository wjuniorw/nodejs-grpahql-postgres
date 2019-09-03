
// const createResolver = (resolver) => {
//   const baseResolver = resolver;
//   baseResolver.createResolver = (childResolver) => {
//     const newResolver = async (parent, args, context, info) => {
//       await resolver(parent, args, context, info);
//       return childResolver(parent, args, context, info);
//     };
//     return createResolver(newResolver);
//   };
//   return baseResolver;
// };
//
// export const requiresAuth = createResolver((parent, args, context) => {
//   if (!context.user || !context.user.id) {
//     throw new Error('Not authenticated');
//   }
// });
//
// export const requiresAdmin = createResolver((parent, args, context) => {
//   if (!context.user.isAdmin) {
//     throw new Error('Requires admin access');
//   }
// });


// ===============================================================
const createReolver = (resolver) => {
  const baseResolver = resolver
  baseResolver.createReolver = (childResolver) => {
    const newResolver = async (parent, args, context, info) => {
      await resolver(parent, args, context, info)
      return childResolver(parent, args, context, info)
    }
    return createReolver(newResolver)
  }
  return baseResolver
}

//requires Auth...........
// export const requiresAuth = createReolver((parent, args, { user}) => {
export default createReolver((parent, args, { user}) => {
  if (!user || !user.id) {
    throw new Error('Nao authenticado!')
  }
})

export const requiresAdmin = createReolver((parent, args, { user}) => {
  if (!user.isAdmin) {
    throw new Error('Requires admin access!')
  }
})
