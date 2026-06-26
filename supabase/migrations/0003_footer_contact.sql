-- ==============================================================
-- 0003 — Informações de rodapé e grupo de WhatsApp de vagas
-- Idempotente. Em instalações novas, a 0001 já cria tudo.
-- ==============================================================

alter table public.site_settings
  add column if not exists whatsapp_group_url text,
  add column if not exists cnpj               text,
  add column if not exists maps_url           text;

-- Preenche os valores oficiais caso estejam vazios
update public.site_settings
set
  whatsapp_group_url = coalesce(whatsapp_group_url, 'https://chat.whatsapp.com/JKlwbSeG38ECLh5UJSRGl3?mode=gi_t'),
  cnpj               = coalesce(cnpj, '57.347.872/0001-48'),
  maps_url           = coalesce(maps_url, 'https://links.cppem.com.br/localiza%C3%A7%C3%A3o-maps'),
  address            = case
                         when address is null or address = 'Caruaru-PE'
                         then 'Praça Presidente Getúlio Vargas, 1119 – Caruaru, Pernambuco, Prédio de 5 andares'
                         else address
                       end;
