

export default {
    name:'hotels',
    component: () => import(/* webpackChunkName: "hotel" */ '@/modules/hotel/layouts/HotelLayout.vue'),
    children: [
        {
            path: '',
            name: 'hotel-list',
            component: () => import(/* webpackChunkName: "hotel-list" */ '@/modules/hotel/views/HotelList.vue')
        },
        {
            path: ':id',
            name: 'hotel',
            props: (route) => {
                return {
                    id: route.params.id
                }
            },
            component: () => import(/* webpackChunkName: "hotel-create" */ '@/modules/hotel/views/HotelCreate.vue')
        },
        {
            path: 'hotel-rooms/:id',
            name: 'hotel-rooms',
            props: true,
            component: () => import(/* webpackChunkName: "hotel-rooms" */ '@/modules/hotel/views/HotelRooms.vue')
        },
    ]
}