// routes
import Dashboard from 'Routes/dashboard';

// async component
import {
   AsyncRolComponent
} from 'Components/AsyncComponent/AsyncComponent';

export default [
   {
      path: 'dashboard',
      component: Dashboard
   },
   {
      path: 'rol',
      component: AsyncRolComponent
   }

]