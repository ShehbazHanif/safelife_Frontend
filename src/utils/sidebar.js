import Dashboard from "../assets/HouseLine.svg";
import Number from "../assets/phone.svg";
import Campaign from "../assets/Megaphone.svg";
import Automation from "../assets/Lightning.svg";
import Help from "../assets/Question.svg";
import Agent from "../assets/GenderNeuter.svg";
import Integration from "../assets/Plug.svg";
import Patient from "../assets/Users.svg";
import Task from "../assets/CheckCircle.svg";
import User from "../assets/Users.svg";
import Setting from "../assets/GearSix.svg";

// Section Constants
export const MAIN = "MAIN";
export const CREATE = "CREATE";
export const TRANSFORM = "TRANSFORM";
export const SETTINGS_SUPPORT = "SETTINGS & SUPPORT";

export const SIDEBAR_ITEMS = [
    {
        path: "/",
        name: "Dashboard",
        icon: Dashboard,
        section: MAIN,
    },
    {
        path: "/patients",
        name: "Patients",
        icon: Patient,
        section: CREATE,
    },
    {
        path: "/agents",
        name: "Agents",
        icon: Agent,
        section: null,
    },
    {
        path: "/campaigns",
        name: "Campaigns",
        icon: Campaign,
        section: null,
    },
    {
        path: "/numbers",
        name: "Numbers",
        icon: Number,
        section: TRANSFORM,
    },
    {
        path: "/automations",
        name: "Automation",
        icon: Automation,
        section: null,
    },
    {
        path: "/integrations",
        name: "Integrations",
        icon: Integration,
        section: null,
    },
    {
        path: "/tasks",
        name: "Tasks",
        icon: Task,
        section: null,
    },
    {
        path: "/users",
        name: "Users",
        icon: User,
        section: SETTINGS_SUPPORT,
    },
    {
        path: "/settings",
        name: "Settings",
        icon: Setting,
        section: null,
    },
    // {
    //     path: "/help",
    //     name: "Help",
    //     icon: Help,
    //     section: null,
    // },
];
