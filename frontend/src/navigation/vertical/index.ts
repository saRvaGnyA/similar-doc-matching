// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Dashboard",
      icon: "mdi:home-outline",
      children: [
        {
          title: "CRM",
          path: "/dashboards/crm",
        },
      ],
    },
    {
      title: "Insurance Claim",
      icon: "mdi:file-document-outline",
      children: [
        {
          title: "Admin Panel",
          path: "/apps/invoice/admin",
        },
      ],
    },
    {
      title: "Charts",
      icon: "mdi:chart-donut",
      children: [
        {
          title: "Analysis",
          path: "/charts/analysis",
        },
      ],
    },
  ];
};

export default navigation;
