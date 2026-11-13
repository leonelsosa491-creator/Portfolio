# Portafolio de Leonel Sosa

Portafolio web hecho con Django. Incluye la presentación de Leonel, el proyecto
Stocky, publicaciones y un asistente local con respuestas predefinidas.

## Desarrollo local

Usá Python 3.13 y un entorno virtual:

```powershell
py -3.13 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Stocky se crea con las migraciones, por lo que también aparece en una base de
datos nueva. El logo del proyecto está incluido en `media/`.

## Deploy en PythonAnywhere

1. Creá un repositorio GitHub llamado `portafolio`, clonalo desde una consola
   Bash de PythonAnywhere y entrá a la carpeta:

   ```bash
   git clone https://github.com/<tu-usuario>/portafolio.git
   cd portafolio
   ```

2. Creá el entorno con la versión de Python elegida al crear la Web app
   (Python 3.13 según la guía del proyecto) e instalá las dependencias:

   ```bash
   mkvirtualenv --python=/usr/bin/python3.13 venv
   workon venv
   pip install -r requirements.txt
   ```

3. En **Web**, elegí configuración manual con la misma versión de Python,
   asigná el código a `/home/<tu-usuario>/portafolio` y el virtualenv a
   `/home/<tu-usuario>/.virtualenvs/venv`.

4. En el archivo WSGI de la Web app, antes de crear la aplicación Django,
   agregá la ruta del proyecto y las variables de entorno. Generá una clave
   secreta nueva con:

   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```

   ```python
   import os
   import sys

   project_home = "/home/<tu-usuario>/portafolio"
   if project_home not in sys.path:
       sys.path.insert(0, project_home)

   os.environ["DJANGO_SETTINGS_MODULE"] = "django_portfolio.settings"
   os.environ["DJANGO_SECRET_KEY"] = "<clave-generada-en-el-servidor>"
   os.environ["DJANGO_DEBUG"] = "False"
   os.environ["DJANGO_ALLOWED_HOSTS"] = "<tu-usuario>.pythonanywhere.com"
   os.environ["DJANGO_CSRF_TRUSTED_ORIGINS"] = "https://<tu-usuario>.pythonanywhere.com"

   from django.core.wsgi import get_wsgi_application

   application = get_wsgi_application()
   ```

   Reemplazá todos los marcadores por tus valores. La clave se configura solo
   en el WSGI del servidor: no la guardes en GitHub ni en este archivo.

5. Desde la consola Bash, aplicá migraciones, reuní los archivos estáticos y
   creá un administrador si lo necesitás:

   ```bash
   python manage.py migrate
   python manage.py collectstatic --noinput
   python manage.py createsuperuser
   ```

6. En **Web > Static files**, agregá estos mapeos:

   | URL | Directorio |
   | --- | --- |
   | `/static/` | `/home/<tu-usuario>/portafolio/staticfiles` |
   | `/media/` | `/home/<tu-usuario>/portafolio/media` |

   Activá HTTPS desde la pestaña **Web** y recargá la aplicación. Si usás un
   dominio propio, actualizá `DJANGO_ALLOWED_HOSTS` y
   `DJANGO_CSRF_TRUSTED_ORIGINS` en el WSGI con ese dominio.

   En producción Django fuerza HTTPS y marca las cookies como seguras. El
   portafolio no envía correos actualmente; si agregás esa función, configurá
   `DJANGO_EMAIL_HOST`, `DJANGO_EMAIL_PORT`, `DJANGO_EMAIL_USERNAME`,
   `DJANGO_EMAIL_PASSWORD` y `DJANGO_EMAIL_USE_TLS` en el WSGI del servidor.

## Asistente del portafolio

El asistente actual es local y no es un LLM: sus respuestas y temas están en
`portfolio/static/portfolio/chat.js`. No transmite las preguntas a servicios
externos. Para personalizar su presentación, actualizá allí las respuestas con
información real sobre Leonel; no se debe inventar experiencia o credenciales.
