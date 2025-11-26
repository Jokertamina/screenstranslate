; Inno Setup script for ScreensTranslate Pro
; Genera un instalador que copia la carpeta generada por PyInstaller
; dist\ScreensTranslatePro a Archivos de programa y crea accesos directos.

[Setup]
AppId={{F96F8C3B-0A5B-4E6B-9E0C-6F9F4E2F3F10}}
AppName=ScreensTranslate Pro
AppVersion=1.0.0
AppPublisher=ScreensTranslate
AppPublisherURL=https://screenstranslate.com
AppSupportURL=https://screenstranslate.com
AppUpdatesURL=https://screenstranslate.com
DefaultDirName={pf}\ScreensTranslate Pro
DefaultGroupName=ScreensTranslate Pro
DisableProgramGroupPage=yes
OutputDir=.
OutputBaseFilename=SetupScreensTranslatePro
Compression=lzma
SolidCompression=yes
WizardStyle=modern
; Icono principal del instalador (si existe el .ico)
SetupIconFile=..\assets\screenstranslate.ico

[Languages]
Name: "spanish"; MessagesFile: "compiler:Languages\Spanish.isl"

[Tasks]
Name: "desktopicon"; Description: "Crear un icono en el escritorio"; GroupDescription: "Tareas adicionales:"; Flags: unchecked

[Files]
; Copia todo el contenido generado por PyInstaller
Source: "..\dist\ScreensTranslatePro\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
; Acceso directo en el menú Inicio
Name: "{group}\ScreensTranslate Pro"; Filename: "{app}\ScreensTranslatePro.exe"; WorkingDir: "{app}"
; Acceso directo opcional en el escritorio
Name: "{commondesktop}\ScreensTranslate Pro"; Filename: "{app}\ScreensTranslatePro.exe"; WorkingDir: "{app}"; Tasks: desktopicon

[Run]
; Ejecutar la aplicación al terminar la instalación (opcional)
Filename: "{app}\ScreensTranslatePro.exe"; Description: "Iniciar ScreensTranslate Pro"; Flags: nowait postinstall skipifsilent
