"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import AdminJobForm from "@/components/admin/AdminJobForm";

export default function NovaVagaPage() {
  return (
    <AdminLayout title="Nova vaga">
      <AdminJobForm />
    </AdminLayout>
  );
}
