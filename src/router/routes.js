
const routes = [
  // SubLayout
  {
    path: '/',
    component: () => import('src/layouts/SubLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'reqpass', component: () => import('pages/Reqpass.vue') },
      
      { path: 'users/add/:id', component: () => import('pages/UserAdd.vue') },
      { path: 'users/details/:id/:userId', component: () => import('pages/UserDetails.vue') },
      { path: 'users/details/edit/:id/:userId', component: () => import('pages/UserEdit.vue') },
      { path: 'users/details/assign/:id/:userId', component: () => import('pages/Assign.vue') },

     
      { path: 'equipments/details/:id/:eqId', component: () => import('pages/EquipmentDetails.vue') },
      { path: 'equipments/add/:id/:eqId', component: () => import('src/pages/EquipmentAdd.vue') },
      { path: 'equipments/edit/:id/:eqId/:pId', component: () => import('pages/EquipmentEdit.vue') },
     
    ]
  },
  // Main Layout
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'users/:id', component: () => import('pages/Users.vue') },

      { path: 'equipments/:id', component: () => import('pages/Equipments.vue') },
    
      
    ],
    
  },
  
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
