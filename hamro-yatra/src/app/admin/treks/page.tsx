import { connectDB } from "@/lib/db";
import { Region } from "@/models/region";
import AdminLayout from "@/components/admin/admin-layout";
import RegionsManager from "@/components/admin/regions-manager";

export const dynamic = "force-dynamic";

export default async function AdminTreksPage() {
  await connectDB();
  const regions = JSON.parse(
    JSON.stringify(await Region.find().sort({ name: 1 }).lean())
  ) as { _id: string; name?: string; description?: string; image?: string }[];

  return (
    <AdminLayout>
      <RegionsManager regions={regions} />
    </AdminLayout>
  );
}