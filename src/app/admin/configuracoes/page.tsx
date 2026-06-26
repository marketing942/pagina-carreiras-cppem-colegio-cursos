"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { createClient } from "@/lib/supabase/client";
import type { SiteSettings } from "@/lib/types";

type Editable = Partial<SiteSettings>;

export default function ConfiguracoesPage() {
  const [settings, setSettings] = useState<Editable>({});
  const [id, setId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          setSettings(data as SiteSettings);
          setId((data as SiteSettings).id);
        }
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const payload = { ...settings };
    delete (payload as Record<string, unknown>).id;
    delete (payload as Record<string, unknown>).created_at;
    delete (payload as Record<string, unknown>).updated_at;

    let result;
    if (id) {
      result = await supabase
        .from("site_settings")
        .update(payload)
        .eq("id", id);
    } else {
      result = await supabase.from("site_settings").insert(payload);
    }

    setMessage(
      result.error
        ? `Erro ao salvar: ${result.error.message}`
        : "Configurações salvas com sucesso!"
    );
    setSaving(false);
  }

  return (
    <AdminLayout title="Configurações">
      {loading ? (
        <p className="text-brand-500">Carregando...</p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
          {message && (
            <p
              className={`rounded-lg px-4 py-3 text-sm ${
                message.startsWith("Erro")
                  ? "bg-accent-50 text-accent-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {message}
            </p>
          )}

          {/* Página pública */}
          <Card title="Textos da página pública">
            <Field label="Nome da empresa">
              <input
                className="input"
                value={settings.company_name ?? ""}
                onChange={(e) => set("company_name", e.target.value)}
              />
            </Field>
            <Field label="Texto 'Sobre'">
              <textarea
                className="input min-h-32"
                value={settings.about_text ?? ""}
                onChange={(e) => set("about_text", e.target.value)}
              />
            </Field>
          </Card>

          {/* Indicadores */}
          <Card title="Indicadores institucionais">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Indicador 1">
                <input
                  className="input"
                  value={settings.stat_years ?? ""}
                  onChange={(e) => set("stat_years", e.target.value)}
                />
              </Field>
              <Field label="Indicador 2">
                <input
                  className="input"
                  value={settings.stat_students ?? ""}
                  onChange={(e) => set("stat_students", e.target.value)}
                />
              </Field>
              <Field label="Indicador 3">
                <input
                  className="input"
                  value={settings.stat_team ?? ""}
                  onChange={(e) => set("stat_team", e.target.value)}
                />
              </Field>
              <Field label="Indicador 4">
                <input
                  className="input"
                  value={settings.stat_extra ?? ""}
                  onChange={(e) => set("stat_extra", e.target.value)}
                />
              </Field>
            </div>
          </Card>

          {/* Formulário Notion */}
          <Card title="Formulário de candidatura (Notion)">
            <Field label="Link do formulário (botões)">
              <input
                className="input"
                value={settings.form_url ?? ""}
                onChange={(e) => set("form_url", e.target.value)}
              />
            </Field>
            <Field label="URL do formulário incorporado (iframe)">
              <input
                className="input"
                value={settings.form_embed_url ?? ""}
                onChange={(e) => set("form_embed_url", e.target.value)}
              />
            </Field>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.show_form_embed ?? false}
                onChange={(e) => set("show_form_embed", e.target.checked)}
                className="h-4 w-4 rounded border-brand-300"
              />
              <span className="text-sm text-brand-800">
                Exibir formulário incorporado na página pública
              </span>
            </label>
          </Card>

          {/* Redes sociais */}
          <Card title="Redes sociais e contato">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="WhatsApp">
                <input
                  className="input"
                  value={settings.whatsapp_url ?? ""}
                  onChange={(e) => set("whatsapp_url", e.target.value)}
                  placeholder="https://wa.me/55..."
                />
              </Field>
              <Field label="Instagram">
                <input
                  className="input"
                  value={settings.instagram_url ?? ""}
                  onChange={(e) => set("instagram_url", e.target.value)}
                />
              </Field>
              <Field label="YouTube">
                <input
                  className="input"
                  value={settings.youtube_url ?? ""}
                  onChange={(e) => set("youtube_url", e.target.value)}
                />
              </Field>
              <Field label="TikTok">
                <input
                  className="input"
                  value={settings.tiktok_url ?? ""}
                  onChange={(e) => set("tiktok_url", e.target.value)}
                />
              </Field>
              <Field label="LinkedIn">
                <input
                  className="input"
                  value={settings.linkedin_url ?? ""}
                  onChange={(e) => set("linkedin_url", e.target.value)}
                />
              </Field>
            </div>
          </Card>

          {/* Institucional */}
          <Card title="Informações institucionais (rodapé)">
            <Field label="Endereço / localização">
              <input
                className="input"
                value={settings.address ?? ""}
                onChange={(e) => set("address", e.target.value)}
              />
            </Field>
            <Field label="Descrição do rodapé">
              <textarea
                className="input min-h-20"
                value={settings.footer_description ?? ""}
                onChange={(e) => set("footer_description", e.target.value)}
              />
            </Field>
          </Card>

          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? "Salvando..." : "Salvar configurações"}
          </button>
        </form>
      )}
    </AdminLayout>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="card space-y-4 p-6">
      <legend className="px-2 text-sm font-semibold text-brand-500">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}
