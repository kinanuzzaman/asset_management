
const routes = [
  {
    path: '/',
    component: () => import('layouts/Login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'reqpass', component: () => import('pages/Reqpass.vue') }
     
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'home', component: () => import('pages/Index.vue') },
      { path: 'users', component: () => import('pages/Users.vue') },
      { path: 'users/add', component: () => import('pages/UserAdd.vue') },
     
      { path: 'users/details/:id', component: () => import('pages/UserDetails.vue') },
     
      { path: 'users/details/edit/:id', component: () => import('pages/UserEdit.vue') },
      { path: 'users/details/assign/:id', component: () => import('pages/Assign.vue') },
      { path: 'equipments', component: () => import('pages/Equipments.vue') },
      { path: 'equipments/add', component: () => import('src/pages/EquipmentAdd.vue') },
      { path: 'equipments/details/:id', component: () => import('pages/EquipmentDetails.vue') },
      { path: 'equipments/details/edit/:id', component: () => import('pages/EquipmentEdit.vue') },
      
      { path: '', component: () => import('pages/Index.vue') }
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
