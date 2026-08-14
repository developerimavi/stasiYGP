import { SimpleListPage } from "@/components/admin/SimpleListPage";
import { Badge } from "@/components/ui/Badge";
import { getRowsAdmin } from "@/lib/admin/queries";
import { deleteRow } from "@/lib/admin/actions";
import type { WelcomeSlide } from "@/types/database";

const MAX_SLIDES = 3;

export default async function AdminSambutanPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const { success } = await searchParams;
  const rows = await getRowsAdmin<WelcomeSlide>("welcome_slides");

  async function handleDelete(id: string) {
    "use server";
    await deleteRow("welcome_slides", id, "/admin/sambutan", ["/"]);
  }

  return (
    <SimpleListPage
      title="Sambutan (Modal Beranda)"
      newHref={rows.length < MAX_SLIDES ? "/admin/sambutan/baru" : undefined}
      newLabel="Tambah Sambutan"
      rows={rows}
      onDelete={handleDelete}
      success={success}
      editHrefBase="/admin/sambutan"
      emptyMessage="Belum ada sambutan."
      columns={[
        { header: "Judul Tab", cell: (r) => r.title },
        { header: "Nama", cell: (r) => r.name ?? "-" },
        {
          header: "Status",
          cell: (r) => (
            <Badge className={r.status === "draft" ? "bg-gold-500/10 text-gold-600" : undefined}>
              {r.status}
            </Badge>
          ),
        },
      ]}
    />
  );
}
