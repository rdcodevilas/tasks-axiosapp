const routes = [{
  path: "/",
  redirect: {
    name: "my-tasks",
  },
  // the my-tasks route is a child of the root route, so it will be rendered inside the MainLayout component when the user navigates to the my - tasks route.
  component: () => import("layouts/MainLayout.vue"),
  children: [{
      path: "my-tasks",
      name: "my-tasks",
      component: () => import("pages/MyTasks.vue"),
    },
    // the finished-tasks route is a child of the root route, so it will be rendered inside the MainLayout component when the user navigates to the finished-tasks route.
    {
      path: "finished-tasks",
      name: "finished-tasks",
      component: () => import("pages/FinishedTasks.vue"),
    },
    // the deleted-tasks route is a child of the root route, so it will be rendered inside the MainLayout component when the user navigates to the deleted-tasks route.
    {
      path: "deleted-tasks",
      name: "deleted-tasks",
      component: () => import("pages/DeletedTasks.vue"),
    },
  ],
}, ]

export default routes
