import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const AllSalaries = React.lazy(() => import('./views/salaries/allSalaries'));
const AddSalarie = React.lazy(() => import('./views/salaries/addSalarie'));
const ProfilSalarie = React.lazy(() => import('./views/salaries/profilSalarie'));
const AllAdresses = React.lazy(() => import('./views/adresses/allAdresses'));
const Adresse = React.lazy(() => import('./views/adresses/Adresse'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/salaries', exact: true, name: 'Salaries', component: AllSalaries },
  { path: '/salaries/liste', name: 'Listes des salaries', component: AllSalaries },
  { path: '/salaries/add-salarie', name: 'Ajout dun salarie', component: AddSalarie },
  { path: '/salaries/profil/:id', exact: true, name: 'Profil', component: ProfilSalarie },
  { path: '/adresses', exact: true, name: 'Adresses', component: AllAdresses },
  { path: '/adresses/liste',exact: true, name: 'Listes des adresses', component: AllAdresses },
  { path: '/adresses/:id',exact: true, name: 'Une adresse', component: Adresse }
];

export default routes;
