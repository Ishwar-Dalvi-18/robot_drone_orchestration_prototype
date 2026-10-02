import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { LiveOpsPage } from '../features/live-ops/LiveOpsPage';
import { MissionPlannerPage } from '../features/planner/MissionPlannerPage';
import { FleetManagementPage } from '../features/fleet/FleetManagementPage';
import { TaskBoardPage } from '../features/tasks/TaskBoardPage';
import { ReplanningPage } from '../features/replanning/ReplanningPage';
import { CommsPage } from '../features/comms/CommsPage';
import { RiskPage } from '../features/risk/RiskPage';
import { DecisionLogPage } from '../features/decisions/DecisionLogPage';
import { SettingsPage } from '../features/settings/SettingsPage';

export const router = createBrowserRouter([
  { path: "/", element: <PageLayout><DashboardPage /></PageLayout> },
  { path: "/planner", element: <PageLayout><MissionPlannerPage /></PageLayout> },
  { path: "/live", element: <PageLayout><LiveOpsPage /></PageLayout> },
  { path: "/fleet", element: <PageLayout><FleetManagementPage /></PageLayout> },
  { path: "/tasks", element: <PageLayout><TaskBoardPage /></PageLayout> },
  { path: "/replanning", element: <PageLayout><ReplanningPage /></PageLayout> },
  { path: "/comms", element: <PageLayout><CommsPage /></PageLayout> },
  { path: "/risk", element: <PageLayout><RiskPage /></PageLayout> },
  { path: "/decisions", element: <PageLayout><DecisionLogPage /></PageLayout> },
  { path: "/settings", element: <PageLayout><SettingsPage /></PageLayout> },
]);
