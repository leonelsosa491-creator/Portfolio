from django.db import migrations


def create_stocky_project(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Project.objects.get_or_create(
        title="Stocky",
        defaults={
            "description": (
                "Sistema de gestión de inventario con resumen general, "
                "detalle de stock y control de acceso."
            ),
            "image": "portfolio/images/stocky-logo.png",
            "url": "https://github.com/lucerolasala/Stocky",
        },
    )


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_stocky_project, migrations.RunPython.noop),
    ]
