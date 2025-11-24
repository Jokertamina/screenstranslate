# Infraestructura de licencias (Supabase)

Esta carpeta contiene todo lo relacionado con el backend de licencias de **ScreensTranslate Pro** sobre Supabase:

- Esquema SQL de tablas (`sql/001_create_licenses.sql`).
- CÃ³digo de la Edge Function `activate-license` (`functions/activate-license/index.ts`).

La app de escritorio **no** accede directamente a la base de datos: solo llama a la Edge Function por HTTP.

## Tablas principales

El fichero `sql/001_create_licenses.sql` crea:

- **licenses**
  - `license_key` (texto mostrado al usuario, por ejemplo `STP-XXXX-YYYY`).
  - `email` (opcional, para facturaciÃ³n/soporte).
  - `plan` (`basic` / `pro`).
  - `status` (`active` / `revoked`).
  - `daily_limit` (lÃ­mite de traducciones/dÃ­a para ese plan; `NULL` = ilimitado).
  - `max_devices` (nÃºmero mÃ¡ximo de equipos donde se puede activar la licencia).

- **license_activations**
  - Relaciona `license_id` con `device_id` (UUID generado por la app en local).

## Edge Function: `activate-license`

Ruta pÃºblica (ejemplo):

- `https://<PROJECT_REF>.supabase.co/functions/v1/activate-license`

Contrato esperado por el cliente (app de escritorio):

- **Request JSON**:
  - `license_key`: clave que introduce el usuario.
  - `device_id`: identificador local del dispositivo (UUID almacenado en `config.json`).
  - `app_version`: versiÃ³n de ScreensTranslate Pro.

- **Response JSON (Ã©xito)**:
  - `success`: `true`.
  - `message`: texto para mostrar al usuario.
  - `plan`: `"basic"` o `"pro"`.
  - `daily_limit`: `null` para ilimitado o nÃºmero para lÃ­mite diario.
  - `max_devices`: mÃ¡ximo de dispositivos permitidos para la licencia.

- **Response JSON (error)**:
  - `success`: `false`.
  - `message`: motivo del fallo (licencia no encontrada, revocada, caducada, etc.).

## Variables de entorno de la funciÃ³n

Definir en Supabase â†’ Edge Functions â†’ `activate-license` â†’ Secrets:

- `SUPABASE_URL`
  - Normalmente creada automÃ¡ticamente por Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`
  - Service role key del proyecto (solo para backend, nunca para el cliente).
- `LICENSE_SHARED_SECRET`
  - Secreto largo y aleatorio que compartes con la app de escritorio.
  - La funciÃ³n comprueba `Authorization: Bearer <LICENSE_SHARED_SECRET>`.

## Variables de entorno en la app de escritorio

Definir antes de lanzar la app (por ejemplo en PowerShell):

```powershell
$env:SCREENSTRANSLATE_LICENSE_API_URL = "https://<PROJECT_REF>.supabase.co/functions/v1/activate-license"
$env:SCREENSTRANSLATE_LICENSE_API_KEY = "<MISMO LICENSE_SHARED_SECRET>"
```

- La app **nunca** conoce `SUPABASE_SERVICE_ROLE_KEY`.
- Solo conoce la URL de la funciÃ³n y el `LICENSE_SHARED_SECRET`.

## Flujo general

1. El usuario compra en la web â†’ backend/webhook crea una fila en `licenses` con un `license_key` Ãºnico.
2. El usuario recibe esa clave por correo.
3. En ScreensTranslate Pro:
   - Pega la clave en el campo **Licencia Pro**.
   - Pulsa **Activar Pro**.
4. La app llama a `activate-license` con `license_key` y `device_id`.
5. La funciÃ³n valida contra Supabase y devuelve el plan.
6. La app actualiza `config.json` (`license_key`, `is_pro`, `plan`, etc.) y desbloquea las funciones Pro.

