// All components mapping with path for internal routes

import { lazy } from 'react'
const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const Page404 = lazy(() => import('../pages/protected/404'))
const Blank = lazy(() => import('../pages/protected/Blank'))
const Charts = lazy(() => import('../pages/protected/Charts'))
const Leads = lazy(() => import('../pages/protected/Leads'))
const Integration = lazy(() => import('../pages/protected/Integration'))
const Calendar = lazy(() => import('../pages/protected/Calendar'))
const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
const Bills = lazy(() => import('../pages/protected/Bills'))
const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
const GettingStarted = lazy(() => import('../pages/GettingStarted'))
const DocFeatures = lazy(() => import('../pages/DocFeatures'))
const DocComponents = lazy(() => import('../pages/DocComponents'))
const BrandHeader = lazy(() => import('../features/brand/components/BrandHeader.js'))
const BrandListHeader = lazy(()=> import('../features/brand/components/BrandListHeader.js'))
const BrandEdit = lazy(()=> import('../features/brand/page/BrandEdit.js'))
const CategoriesHeader = lazy(()=> import('../features/category/components/CategoryHeader.js'))
const CategoriesListHeader = lazy(()=> import('../features/category/components/CategoryListHeader.js'))
const CategoryEdit = lazy(()=> import('../features/category/pages/CategoryEdit.js'))
const SubcategoryHeader = lazy(()=> import('../features/subcategory/components/SubcategoryHeader.js'))
const SubcategoryListHeader = lazy(()=> import('../features/subcategory/components/SubcategoryListHeader.js'))
const SubcategoryEdit = lazy(()=> import('../features/subcategory/pages/SubcategoryEdit.js'))
const ProductHeader = lazy(()=> import('../features/product/components/ProductHeader.js'))
const ProductListHeader = lazy(()=> import('../features/product/components/ProductListHeader.js'))
const ProductEdit = lazy(()=> import('../features/product/pages/ProductEdit.js'))
const ProductView = lazy(()=> import('../features/product/pages/ProductView.js'))

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  //brand-Create
  {
    path : '/brand-create',
    component : BrandHeader 
  },
  //brand-list
  {
    path : '/brand-list',
    component : BrandListHeader 
  },
  //brand-edit
  {
    path : '/brand-edit/:id',
    component : BrandEdit
  },
  //category-create
  {
    path : '/category-create',
    component :CategoriesHeader 
  },
  //category-list
  {
    path : '/category-list',
    component :CategoriesListHeader 
  },
  //category-edit
  {
    path : '/category-edit/:id',
    component :CategoryEdit 
  },
  //subcategory-create
  {
    path : '/subcategory-create',
    component :SubcategoryHeader 
  },
  //subcategory-list
  {
    path : '/subcategory-list',
    component :SubcategoryListHeader 
  },
  //category-edit
  {
    path : '/subcategory-edit/:id',
    component :SubcategoryEdit 
  },
  //product-create
  {
    path : '/product-create',
    component :ProductHeader 
  },
  //subcategory-list
  {
    path : '/product-list',
    component :ProductListHeader 
  },
  {
    path : '/product-view/:id',
    component :ProductView 
  },
  //category-edit
  {
    path : '/product-edit/:id',
    component :ProductEdit 
  },
  {
    path: '/leads',
    component: Leads,
  },
  {
    path: '/settings-team',
    component: Team,
  },
  {
    path: '/calendar',
    component: Calendar,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  {
    path: '/settings-profile',
    component: ProfileSettings,
  },
  {
    path: '/settings-billing',
    component: Bills,
  },
  {
    path: '/getting-started',
    component: GettingStarted,
  },
  {
    path: '/features',
    component: DocFeatures,
  },
  {
    path: '/components',
    component: DocComponents,
  },
  {
    path: '/integration',
    component: Integration,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes
