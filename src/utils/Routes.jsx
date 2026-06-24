import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Number from "../pages/Number/Number.jsx";
import Campaign from "../pages/Campaign/Campaign.jsx";
import Automation from "../pages/Automation/Automation.jsx";
import Help from "../pages/Help/Help.jsx";
import Agent from "../pages/Agent/Agent.jsx";
import Integration from "../pages/Integration/Integration.jsx";
import Patient from "../pages/Patient/Patient.jsx";
import Task from "../pages/Task/Task.jsx";
import User from "../pages/User/User.jsx";
import Setting from "../pages/Setting/Setting.jsx";
import CreateAgent from "../pages/Agent/CreateAgent.jsx";
import CreateCampaignWorkspace from "../pages/Campaign/CreateCampaignWorkspace.jsx";
import Role from "../pages/User/Role.jsx";
import CreateAutomation from "../pages/Automation/CreateAutomation.jsx";

export const ROUTES = [
  {
    path: "/",
    element: Dashboard,
  },
  {
    path: "/patients",
    element: Patient,
  },
  {
    path: "/agents",
    element: Agent,
  },
  {
    path: "/campaigns",
    element: Campaign,
  },
  {
    path: "/numbers",
    element: Number,
  },
  {
    path: "/settings",
    element: Setting,
  },
  {
    path: "/automations",
    element: Automation,
  },
  {
    path: "/integrations",
    element: Integration,
  },
  // {
  //   path: "/help",
  //   element: Help,
  // },
  {
    path: "/tasks",
    element: Task,
  },
  {
    path: "/users",
    element: User,
  },
  {
    path: "/agent/create",
    element: CreateAgent,
  },
  {
    path: "/campaign/create",
    element: CreateCampaignWorkspace,
  },
  {
    path: "/user/role",
    element: Role,
  },
  {
    path: "/automation/create",
    element: CreateAutomation,
  },
];
