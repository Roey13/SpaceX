import { Landings } from './pages/Landings.jsx'
import { LandingDetails } from './pages/LandingDetails.jsx'


export const routes = [{
        path: '/',
        component: Landings,
    },
    {
        path: '/landings/:landingId?',
        component: LandingDetails
    }
]