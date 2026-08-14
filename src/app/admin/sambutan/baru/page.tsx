import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SimpleForm } from "@/components/admin/SimpleForm";
import { createRow } from "@/lib/admin/actions";
import { formToValues } from "@/lib/admin/form-helpers";
import { getRowsAdmin } from "@/lib/admin/queries";
import type { WelcomeSlide } from "@/types/database";

const MAX_SLIDES = 3;

export default async function NewWelcomeSlidePage() {
  const existing = await getRowsAdmin<WelcomeSlide>("welcome_slides");
  if (existing.length >= MAX_SLIDES) redirect("/admin/sambutan");

  async function action(formData: FormData) {
    "use server";
    const values = formToValues(formData, { numberFields: ["sort_order"] });
    await createRow("welcome_slides", values, "/admin/sambutan", ["/"]);
  }

  return (
    <Container className="max-w-2xl px-6 py-10 lg:px-10">
      <h1 className="font-display text-2xl text-parish-900">Sambutan Baru</h1>
      <div className="mt-6">
        <SimpleForm
          cancelHref="/admin/sambutan"
          action={action}
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
