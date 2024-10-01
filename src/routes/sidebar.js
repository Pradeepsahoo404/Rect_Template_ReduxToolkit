/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'
import { CgExtensionAdd } from "react-icons/cg";
import { HiTemplate } from "react-icons/hi";
import { VscListFlat } from "react-icons/vsc";
import { GiHeptagram } from "react-icons/gi";
import { IoCreateOutline } from "react-icons/io5";
import { IoCreateSharp } from "react-icons/io5";
import { IoMdPricetags } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { GrStorage } from "react-icons/gr";
import { VscGroupByRefType } from "react-icons/vsc";
import { VscUngroupByRefType } from "react-icons/vsc";


const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const routes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },

  {
    path: '', //no url needed as this has submenu
    icon: <GiHeptagram className={`${iconClasses} inline` }/>, // icon component
    name: 'Brand', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/brand-create',
        icon: <IoCreateOutline className={submenuIconClasses}/>,
        // icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Brand-Create',
      },
      {
        path: '/app/brand-list', //url
        icon: <VscListFlat className={submenuIconClasses}/>, // icon component
        name: 'Brand-list', // name that appear in Sidebar
      },
    ]
  }, 

  {
    path: '', //no url needed as this has submenu
    icon: <VscGroupByRefType className={`${iconClasses} inline` }/>, // icon component
    name: 'Categories', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/category-create',
        icon: <IoCreateSharp className={submenuIconClasses}/>,
        // icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Category-Create',
      },
      {
        path: '/app/category-list', //url
        icon: <VscListFlat className={submenuIconClasses}/>, // icon component
        name: 'Category-list', // name that appear in Sidebar
      },
    ]
  },

  {
    path: '', //no url needed as this has submenu
    icon: <VscUngroupByRefType className={`${iconClasses} inline` }/>, // icon component
    name: 'SubCategories', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/subcategory-create',
        icon: <IoCreateOutline className={submenuIconClasses}/>,
        // icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Subcategory-Create',
      },
      {
        path: '/app/subcategory-list', //url
        icon: <VscListFlat className={submenuIconClasses}/>, // icon component
        name: 'Subcategory-list', // name that appear in Sidebar
      },
    ]
  },

  {
    path: '', //no url needed as this has submenu
    icon: <HiTemplate className={`${iconClasses} inline` }/>, // icon component
    name: 'Products', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/product-create',
        icon: <CgExtensionAdd className={submenuIconClasses}/>,
        name: 'Product-Create',
      },
      {
        path: '/app/product-list', //url
        icon: <VscListFlat className={submenuIconClasses}/>, // icon component
        name: 'Product-list', // name that appear in Sidebar
      },
    ]
  },

  {
    path: '', //no url needed as this has submenu
    icon: <GrStorage className={`${iconClasses} inline` }/>, // icon component
    name: 'Inventery', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/stock-create',
        icon: <IoCreateSharp className={submenuIconClasses}/>,
        // icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Warehouse',
      },
      {
        path: '/app/orders-received-list', //url
        icon: <VscListFlat className={submenuIconClasses}/>, // icon component
        name: 'Received Order', // name that appear in Sidebar
      },
    ]
  },

  {
    path: '', //no url needed as this has submenu
    icon: <MdBorderColor className={`${iconClasses} inline` }/>, // icon component
    name: 'Orders', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/order-list',
        icon: <VscListFlat className={submenuIconClasses}/>,
        // icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Order-list',
      },
    ]
  },

  {
    path: '', //no url needed as this has submenu
    icon: <FaFileInvoiceDollar className={`${iconClasses} inline` }/>, // icon component
    name: 'Invoice', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/Invoice-list',
        icon: <VscListFlat className={submenuIconClasses}/>,
        // icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Invoice-list',
      },
    ]
  },

  {
    path: '', //no url needed as this has submenu
    icon: <IoMdPricetags className={`${iconClasses} inline` }/>, // icon component
    name: 'Coupons', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/coupons-add',
        icon: <IoCreateOutline className={submenuIconClasses}/>,
        // icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Coupons-Add',
      },
      {
        path: '/app/coupons-list',
        icon: <VscListFlat className={submenuIconClasses}/>,
        // icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Coupons-List',
      },
    ]
  },

  {
    path: '/app/leads', // url
    icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
    name: 'Leads', // name that appear in Sidebar
  },

  {
    path: '/app/transactions', // url
    icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
    name: 'Transactions', // name that appear in Sidebar
  },
  
  {
    path: '/app/charts', // url
    icon: <ChartBarIcon className={iconClasses}/>, // icon component
    name: 'Analytics', // name that appear in Sidebar
  },
  {
    path: '/app/integration', // url
    icon: <BoltIcon className={iconClasses}/>, // icon component
    name: 'Integration', // name that appear in Sidebar
  },
  {
    path: '/app/calendar', // url
    icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
    name: 'Calendar', // name that appear in Sidebar
  },

  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Pages', // name that appear in Sidebar
    submenu : [
      {
        path: '/login',
        icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
        name: 'Login',
      },
      {
        path: '/register', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Register', // name that appear in Sidebar
      },
      {
        path: '/forgot-password',
        icon: <KeyIcon className={submenuIconClasses}/>,
        name: 'Forgot Password',
      },
      {
        path: '/app/blank',
        icon: <DocumentIcon className={submenuIconClasses}/>,
        name: 'Blank Page',
      },
      {
        path: '/app/404',
        icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
        name: '404',
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Settings', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/settings-profile', //url
        icon: <UserIcon className={submenuIconClasses}/>, // icon component
        name: 'Profile', // name that appear in Sidebar
      },
      {
        path: '/app/settings-billing',
        icon: <WalletIcon className={submenuIconClasses}/>,
        name: 'Billing',
      },
      {
        path: '/app/settings-team', // url
        icon: <UsersIcon className={submenuIconClasses}/>, // icon component
        name: 'Team Members', // name that appear in Sidebar
      },
    ]
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'Documentation', // name that appear in Sidebar
    submenu : [
      {
        path: '/app/getting-started', // url
        icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
        name: 'Getting Started', // name that appear in Sidebar
      },
      {
        path: '/app/features',
        icon: <TableCellsIcon className={submenuIconClasses}/>, 
        name: 'Features',
      },
      {
        path: '/app/components',
        icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
        name: 'Components',
      }
    ]
  },
  
]

export default routes


