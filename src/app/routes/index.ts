import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { InfluencerRoute } from '../modules/influencer/influencer.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/user',
    route: UserRoute,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/influencer',
    route: InfluencerRoute,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
