import { createFileRoute } from "@tanstack/react-router";
import { Admin } from "@/admin/admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin - LuxGen Nepal" }],
  }),
  component: Admin,
});
