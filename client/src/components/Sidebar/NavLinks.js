// sidebar nav links
export default {
   category1: [
     {
       menu_title: 'sidebar.dashboard',
       menu_icon: 'zmdi zmdi-view-dashboard',
       path: '/app/dashboard',
       new_item: false,
       type_multi: null,
     }
   ],
   category2: [
     {
       menu_title: 'sidebar.user',
       menu_icon: 'zmdi zmdi-accounts',
       path: '/app/user',
       new_item: false,
       type_multi: null,
     },
     {
       menu_title: 'sidebar.rol',
       menu_icon: 'zmdi zmdi-male-female',
       path: '/app/rol',
       new_item: false,
       type_multi: null,
     },
   ],
   category3: [
     {
       menu_title: 'sidebar.place',
       menu_icon: 'zmdi zmdi-globe-alt',
       path: '/app/place',
       new_item: false,
       type_multi: null,
     },
     {
       menu_title: 'sidebar.location',
       menu_icon: 'zmdi zmdi-pin',
       path: '/app/location',
       new_item: false,
       type_multi: null,
     },
     {
       menu_title: 'sidebar.sublocation',
       menu_icon: 'zmdi zmdi-pin-drop',
       path: '/app/sublocation',
       new_item: false,
       type_multi: null,
     },
   ],
   category4: [
     {
       menu_title: 'sidebar.devices',
       menu_icon: 'zmdi zmdi-smartphone-setup',
       path: '/app/devices',
       new_item: false,
       type_multi: null,
       child_routes: [
         {
           menu_title: 'sidebar.irisys',
           new_item: false,
           path: '/app/devices/irisys',
         },
         {
           path: '/app/devices/thermo',
           new_item: false,
           menu_title: 'sidebar.thermo',
         },
       ],
     },
   ],
};