// src/routes.js
import { lazy } from 'react';

// Import pages
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));

// Define routes
const routes = [
  {
    path: '/',
    component: HomePage,
    exact: true,
    protected: true
  },
  {
    path: '/login',
    component: LoginPage,
    exact: true,
    protected: false
  },
  {
    path: '/categories',
    component: CategoryPage,
    exact: true,
    protected: true
  },
  {
    path: '/profile',
    component: ProfilePage,
    exact: true,
    protected: true
  },
  {
    path: '/about',
    component: AboutPage,
    exact: true,
    protected: false
  },
  {
    path: '/contact',
    component: ContactPage,
    exact: true,
    protected: false
  },
  {
    path: '/privacy',
    component: PrivacyPage,
    exact: true,
    protected: false
  }
];

export default routes;