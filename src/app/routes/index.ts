import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { InfluencerRoute } from '../modules/influencer/influencer.route';
import { BrandRoutes } from '../modules/brand/brand.route';

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
  {
    path: '/brand',
    route: BrandRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
