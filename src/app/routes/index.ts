import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
import { InfluencerRoute } from '../modules/influencer/influencer.route';
import { BrandRoutes } from '../modules/brand/brand.route';
import { PlanRoutes } from '../modules/plan/plan.route';
import { SubscriptationRoutes } from '../modules/subscriptation/subscriptation.route';

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
  {
    path: '/plan',
    route: PlanRoutes,
  },
  {
    path: '/subscriptation',
    route: SubscriptationRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
