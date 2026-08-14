import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SimpleForm } from "@/components/admin/SimpleForm";
import { getRowByIdAdmin } from "@/lib/admin/queries";
import { updateRow } from "@/lib/admin/actions";
import { formToValues } from "@/lib/admin/form-helpers";
import type { WelcomeSlide } from "@/types/database";

export default async function EditWelcomeSlidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await getRowByIdAdmin<WelcomeSlide>("welcome_slides", id);
  if (!row) notFound();

  async function action(formData: FormData) {
    "use server";
    const values = formToValues(formData, { numberFields: ["sort_order"] });
    await updateRow("welcome_slides", id, values, "/admin/sambutan", ["/"]);
  }

  return (
    <Container className="max-w-2xl px-6 py-10 lg:px-10">
      <h1 className="font-display text-2xl text-parish-900">Edit Sambutan</h1>
      <div className="mt-6">
        <SimpleForm
          cancelHref="/admin/sambutan"
          action={action}
          values={row}
          fields={[
            { type: "text", name: "title", label: "Judul Tab", required: true },
            { type: "image", name: "photo_url", label: "Foto" },
            { type: "text", name: "name", label: "Nama" },
            { type: "richtext", name: "content", label: "Isi Sambutan" },
            {
              type: "select",
              name: "status",
              label: "Status",
              options: [
                { value: "draft", label: "Draft" },
                { value: "published", label: "Published" },
              ],
            },
            { type: "number", name: "sort_order", label: "Urutan Tampil" },
          ]}
        />
      </div>
    </Container>
  );
}
