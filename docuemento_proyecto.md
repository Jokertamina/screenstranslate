Documento de EspecificaciÃ³n del Producto Final
Herramienta de Captura-TraducciÃ³n de Pantalla (â€œScreensTranslate Proâ€)
1. IntroducciÃ³n
1.1 PropÃ³sito

Este documento describe en detalle todas las funcionalidades, caracterÃ­sticas, comportamientos, interfaces y restricciones de la versiÃ³n final del producto â€œScreensTranslate Proâ€. Sirve como referencia definitiva para el equipo de desarrollo, diseÃ±o, QA, operaciones y demÃ¡s stakeholders involucrados.

1.2 Alcance del Producto

El producto permitirÃ¡ al usuario de escritorio seleccionar una regiÃ³n de la pantalla mediante un atajo o gesto, capturar el contenido visual, extraer los textos visibles, traducirlos a un idioma destino y superponer la traducciÃ³n sobre la pantalla (overlay) de forma fluida, para luego volver al uso normal. Cubre Windows y macOS. La versiÃ³n inicial no incluye traducciÃ³n de voz ni funciones de realidad aumentada.

1.3 Definiciones, AcrÃ³nimos y Abreviaturas

OCR: Optical Character Recognition (Reconocimiento Ã“ptico de Caracteres)

DPI: Dots Per Inch (resoluciÃ³n de pantalla)

Overlay: Capa visual superpuesta sobre la interfaz de usuario principal

Hotkey: CombinaciÃ³n de teclas para activar la funciÃ³n

UI: Interfaz de Usuario

1.4 Audiencia Prevista

Desarrolladores, diseÃ±adores, testadores, gerentes de producto, operaciones, marketing.

1.5 Referencias

Plantillas y guÃ­as para documentos de especificaciÃ³n de software. 
boardmix.com
+1

Plantilla de documentado de especificaciÃ³n en markdown. 
GitHub

2. VisiÃ³n General del Producto
2.1 Perspectiva del Producto

ScreensTranslate Pro actÃºa como capa de productividad sobre el escritorio del usuario: sin interrumpir el flujo habitual, permite al usuario traducir texto visible en pantalla sin necesidad de copiar-pegar o cambiar de aplicaciÃ³n.

2.2 Objetivos del Producto

TraducciÃ³n rÃ¡pida de contenido visual en pantalla con un atajo.

Minimizar la fricciÃ³n del usuario: selecciÃ³n rÃ¡pida, resultado claro, volver al trabajo inmediatamente.

Compatibilidad con mÃºltiples resoluciones, escalados de pantalla, mÃºltiples monitores.

Alta calidad de traducciÃ³n y extracciÃ³n de texto, incluso en condiciones variadas.

Modelo de negocio: versiÃ³n bÃ¡sica gratuita + versiÃ³n Pro con funciones avanzadas.

2.3 PÃºblico Objetivo

Usuarios que consumen software, juegos o contenidos en idiomas extranjeros.

Profesionales que requieren traducciÃ³n rÃ¡pida al trabajar en apps no localizadas.

Estudiantes de idiomas que desean ver traducciones al vuelo de lo que aparece en pantalla.

2.4 CaracterÃ­sticas del Usuario

Persona con nivel medio-alto de manejo de ordenador.

Prefiere fluidez y sencillez al cambiar entre idiomas.

ValorarÃ¡ rapidez y precisiÃ³n por encima de configuraciÃ³n compleja.

2.5 Restricciones del Producto

Solo plataformas de escritorio (Windows, macOS).

Depende de motores de OCR y traducciÃ³n que podrÃ­an requerir conexiÃ³n a internet (en funciones online).

Overlay y captura deben respetar las polÃ­ticas de permisos de cada sistema operativo.

2.6 Suposiciones y Dependencias

El usuario concede permisos de captura de pantalla y creaciÃ³n de ventanas â€œalways on topâ€.

El sistema operativo permite acceso a la pantalla, regiones, ventanas superpuestas.

El motor de traducciÃ³n soporta los idiomas destino seleccionados.

2.7 Escenarios de Uso

Escenario A: El usuario estÃ¡ leyendo un documento en inglÃ©s, pulsa el hotkey, selecciona la zona de texto, obtiene la traducciÃ³n al espaÃ±ol superpuesta, pulsa Esc y continÃºa.
Escenario B: El usuario juega a un videojuego en japonÃ©s; pulsa el hotkey, selecciona la zona de diÃ¡logo, lee la traducciÃ³n, vuelve a jugar sin pestaÃ±ear.

3. Requisitos del Sistema
3.1 Interfaces Externas

Interfaz de usuario de configuraciÃ³n: ventana donde se seleccionan idioma origen/destino, atajo, opciones de overlay.

Hotkey global configurable para activar la captura.

Overlay sin bordes que muestra traducciÃ³n sobre la pantalla.

Historial de traducciones: interfaz donde el usuario puede ver traducciones previas.

3.2 Requisitos Funcionales

RF-F1: Al pulsar el hotkey configurado, la aplicaciÃ³n entra en modo â€œselecciÃ³n de regiÃ³nâ€.

RF-F2: El usuario puede dibujar un rectÃ¡ngulo de regiÃ³n en pantalla que desea traducir.

RF-F3: La aplicaciÃ³n captura la imagen de la regiÃ³n seleccionada.

RF-F4: La aplicaciÃ³n realiza OCR sobre la imagen para extraer bloques de texto, cada uno con sus coordenadas.

RF-F5: La aplicaciÃ³n envÃ­a los textos extraÃ­dos al motor de traducciÃ³n y recibe la traducciÃ³n para cada bloque.

RF-F6: La aplicaciÃ³n despliega el overlay en la misma regiÃ³n, dibujando cada bloque traducido en su posiciÃ³n relativa, con estilo legible.

RF-F7: El usuario puede cerrar el overlay pulsando otro hotkey o Esc, y el sistema vuelve al modo normal.

RF-F8: La aplicaciÃ³n guarda en el historial local: texto original, texto traducido, fecha/hora, idioma origen/destino.

RF-F9: En la versiÃ³n Pro, el usuario puede copiar el texto traducido al portapapeles y exportar el historial.

RF-F10: Soporte para mÃºltiples idiomas para origen y destino (mÃ­nimo espaÃ±ol, inglÃ©s, japonÃ©s, coreano, chino) en versiÃ³n Pro.

3.3 Requisitos No Funcionales

RNF-N1: El tiempo desde la pulsaciÃ³n del hotkey hasta la presentaciÃ³n del overlay no debe superar los 3 segundos en condiciones normales.

RNF-N2: La aplicaciÃ³n debe operar correctamente en pantallas con escalado de 100 % a 300 % DPI y en configuraciones de mÃºltiples monitores.

RNF-N3: La UI de configuraciÃ³n debe estar disponible en espaÃ±ol e inglÃ©s; soporte para otros idiomas en futuras versiones.

RNF-N4: La aplicaciÃ³n no debe consumir mÃ¡s del 10 % de CPU adicional en modo activo de captura/traducciÃ³n.

RNF-N5: La captura de pantalla, almacenamiento del historial y traducciÃ³n deben cumplir con polÃ­ticas de privacidad: no se almacenan imÃ¡genes completas sin consentimiento.

3.4 Requisitos de Seguridad y Privacidad

RS-S1: Todo el trÃ¡fico hacia motores de traducciÃ³n debe enviarse mediante conexiÃ³n segura (HTTPS/TLS).

RS-S2: El usuario debe poder borrar todo el historial local desde la aplicaciÃ³n.

RS-S3: El producto debe respetar la protecciÃ³n de datos de cada sistema operativo y solicitar los permisos pertinentes al instalarse.

4. DiseÃ±o de Interfaz de Usuario (UI)
4.1 Pantalla de ConfiguraciÃ³n

Idioma origen: desplegable.

Idioma destino: desplegable.

Hotkey: campo editable para configurar.

BotÃ³n â€œProbar capturaâ€: activa modo selecciÃ³n de regiÃ³n para test.

SecciÃ³n â€œHistorialâ€: botÃ³n para abrir el historial de traducciones.

BotÃ³n â€œComprar versiÃ³n Proâ€ (si no es versiÃ³n Pro).

4.2 Modo SelecciÃ³n de RegiÃ³n

Pantalla se atenua ligeramente.

Cursor cambia a una cruz.

Usuario hace clic y arrastra para definir la regiÃ³n.

Al soltar, se inicia la captura automÃ¡tica.

4.3 Overlay de TraducciÃ³n

Se muestra en la regiÃ³n seleccionada.

Fondo semitransparente, texto con alto contraste.

BotÃ³n â€œCopiarâ€ (versiÃ³n Pro) y botÃ³n â€œCerrarâ€ (Esc o clic).

4.4 Historial de Traducciones

Lista ordenada por fecha/hora.

Columnas: original, traducido, idioma origen, idioma destino, botÃ³n â€œCopiarâ€.

Filtro por idioma, exportar CSV (versiÃ³n Pro).

5. Arquitectura General del Sistema

(Esta secciÃ³n describe los mÃ³dulos lÃ³gicos aunque no incluimos detalle tÃ©cnico del stack)

MÃ³dulo de Hotkey/ActivaciÃ³n.

MÃ³dulo de SelecciÃ³n de RegiÃ³n y Captura.

MÃ³dulo de OCR.

MÃ³dulo de TraducciÃ³n.

MÃ³dulo de Overlay.

MÃ³dulo de ConfiguraciÃ³n y Almacenamiento (historial, preferencias).

MÃ³dulo de Licencia/VersiÃ³n Pro.

6. Flujo de Uso / Procesos

Usuario pulsa hotkey â†’ MÃ³dulo de ActivaciÃ³n.

MÃ³dulo de SelecciÃ³n de RegiÃ³n: usuario define zona.

Captura de la imagen de la regiÃ³n.

OCR extrae los textos + coordenadas.

TraducciÃ³n de los textos al idioma destino.

Overlay despliega traducciÃ³n sobre la regiÃ³n.

Usuario interactÃºa (leer, copiar, cerrar).

Historial se almacena.

Usuario cierra overlay â†’ vuelve al entorno normal.

7. GestiÃ³n de Licencias y MonetizaciÃ³n

VersiÃ³n gratuita (â€œBasicâ€): funcionalidad completa de captura + traducciÃ³n, pero con lÃ­mite de X usos/dÃ­a (por ejemplo 5 capturas/dÃ­a).

VersiÃ³n â€œProâ€: uso ilimitado, idiomas extra, opciÃ³n de exportar historial, copiar al portapapeles, estilos de overlay adicionales, soporte offline.

Modelo de pago: suscripciÃ³n (mensual/anual) o pago Ãºnico para licencia de por vida.

IntegraciÃ³n de sistema de pago seguro (por ejemplo vÃ­a Stripe).

8. Mantenimiento, Actualizaciones y Soporte

Actualizaciones automÃ¡ticas o manuales segÃºn el sistema operativo.

Registro de errores y seguimiento para mejorar OCR/traducciÃ³n con el tiempo.

Sistema de soporte: FAQs, foro o chat de usuarios, sistema de tickets para versiÃ³n Pro.

PolÃ­tica de privacidad y tÃ©rminos de uso claramente publicados.

9. Cronograma de Lanzamiento

VersiÃ³n 1.0 â€œGeneral Releaseâ€ â€“ lanzamiento global para Windows + macOS.

VersiÃ³n 1.1 â€“ mejoras de rendimiento, idiomas adicionales, soporte multi-monitor ampliado.

VersiÃ³n 2.0 â€“ soporte offline, integraciÃ³n con navegador, funciÃ³n ventana completa.

10. AceptaciÃ³n y Criterios de Ã‰xito

La aplicaciÃ³n debe alcanzar un tiempo de respuesta inferior a 3 s en 90 % de los casos.

Compatibilidad con resoluciones tÃ­picas (1080p, 1440p, 4K) y escalados de 100 %-300%.

PrecisiÃ³n OCR mÃ­nima del 90 % para textos con buen contraste (alfabeto latino) en condiciones normales.

TraducciÃ³n correcta (evaluaciÃ³n manual/verificada) en al menos 95 % de los casos para los idiomas principales.

Historial funcional y sistema de licencia correctamente operativo.

Tasa de error/caÃ­da inferior al 1 % en uso cotidiano bÃ¡sico.


GuÃ­a TÃ©cnica para AprobaciÃ³n y Seguridad de DistribuciÃ³n
1. Windows â€“ SmartScreen / Application Reputation

Requisitos clave:

El ejecutable y el instalador deben estar firmados con un certificado de firma de cÃ³digo vÃ¡lido. 
DigiCert
+2
Advanced Installer
+2

Para evitar advertencias de SmartScreen de â€œaplicaciÃ³n no reconocidaâ€, idealmente usar un certificado EV (Extended Validation). 
Stack Overflow
+1

SmartScreen evalÃºa la â€œreputaciÃ³n de la aplicaciÃ³nâ€: cuÃ¡ntas veces se ha descargado, cuÃ¡ntos usuarios la usan, etc. Si la reputaciÃ³n es baja, aparecerÃ¡n advertencias. 
Microsoft Learn
+1

Es posible enviar el archivo para anÃ¡lisis de â€œfalso positivoâ€ a Microsoft si ves que los usuarios reciben advertencias. 
Advanced Installer
+1

Checklist:

 Certificado de firma de cÃ³digo adquirido y usado para firmar ejecutable e instalador

 Ideal: Certificado EV para acelerar reputaciÃ³n

 Instalador y binario listos para envÃ­o para anÃ¡lisis de reputaciÃ³n, si es necesario

 Evitar empaquetados u ofuscaciones sospechosas que puedan activar heurÃ­sticas de detecciÃ³n

 Probar la instalaciÃ³n en Windows 10/11 con Defender activo para ver si aparece advertencia de SmartScreen

 Preparar instrucciÃ³n para usuarios sobre â€œejecutar de todos modosâ€ en caso de advertencia temprana

2. macOS â€“ Firmado + NotarizaciÃ³n + Gatekeeper

Requisitos clave:

El software distribuido fuera de la App Store debe estar firmado con un certificado â€œDeveloper IDâ€. 
Microsoft Learn
+1

Debe pasar por el proceso de notarizaciÃ³n de Apple Inc.: el instalador/app es enviado a Apple, revisado, y si pasa obtiene un â€œticketâ€ que se puede â€œstaplearâ€ al binario o paquete. 
Apple Developer
+1

Si no estÃ¡ notarizada, al usuario se le mostrarÃ¡ advertencia y necesitarÃ¡ acciÃ³n manual para abrir la app (â€œApplication cannot be openedâ€). 
Oozou
+1

Checklist:

 Obtener certificado Developer ID de Apple para firma de cÃ³digo

 Habilitar â€œhardened runtimeâ€ si requerido por la versiÃ³n de macOS objetivo 
SentinelOne

 Firmar el ejecutable/paquete antes de notarizaciÃ³n

 Subir el paquete a notarizaciÃ³n de Apple (notarytool / altool)

 Staplear el ticket de notarizaciÃ³n al instalador/binario para que funcione sin conexiÃ³n

 Probar instalaciÃ³n en macOS (versiÃ³n 10.15+ al menos) con Gatekeeper activo para confirmar que no aparece advertencia

 Incluir en el instalador o primer arranque una explicaciÃ³n clara al usuario sobre los permisos de â€œScreen Recordingâ€ o â€œCaptura de pantallaâ€ que la app va a solicitar

3. Permisos y polÃ­ticas de usuario

Asegurarse de que la aplicaciÃ³n solicita Ãºnicamente los permisos necesarios (como pantalla completa/registro de pantalla, overlay, acceso a hotkeys globales).

Presentar al usuario un aviso o explicaciÃ³n (â€œPor quÃ© solicitamos este permisoâ€) antes o durante la instalaciÃ³n para evitar que lo rechacen por desconfiar.

No almacenar datos de usuario que no sean necesarios. Por ejemplo, no almacenar capturas completas sin consentimiento. Esto reduce el riesgo de que la app sea considerada invasiva por antivirus o por polÃ­ticas de privacidad.

En la documentaciÃ³n o pÃ¡gina web del producto, mostrar claramente que estÃ¡ firmado, verificado y notarizado (donde aplique) para ganar confianza.

4. PolÃ­ticas de versiÃ³n y reputaciÃ³n

Mantener consistencia en la firma de cÃ³digo: usar el mismo certificado o entidad editor para todas las versiones, para aprovechar reputaciÃ³n construida. En Windows, cambiar de certificado puede reiniciar reputaciÃ³n. 
Wikipedia
+1

Cada nueva versiÃ³n debe ser firmada, idealmente subir para anÃ¡lisis de reputaciÃ³n si es un cambio mayor.

Monitorear feedback de usuarios sobre advertencias de seguridad y actuar rÃ¡pido para resolverlas (por ejemplo, enviar fichero a Microsoft o Apple si es falso positivo).

Mantener un canal de actualizaciÃ³n automÃ¡tico seguro y firmado.

5. Prueba previa al lanzamiento

En Windows con Defender activado, instalar la versiÃ³n beta del instalador y verificar que no aparece advertencia de SmartScreen para descarga antigua o nueva.

En macOS (versiÃ³n reciente) con Gatekeeper activo, instalar la versiÃ³n notarizada y confirmar que no aparece advertencia de â€œcannot be opened because â€¦â€.

Probar en mÃºltiples escenarios de escalado de pantalla, mÃºltiples monitores, diferentes resoluciones, para asegurar que la app no solicita permisos extra inesperados.

Verificar que el instalador e instalador incremental funcionan correctamente, que la app puede solicitar permisos de captura pantalla/overlay sin bloquearse.
