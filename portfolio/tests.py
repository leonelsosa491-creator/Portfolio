from django.test import TestCase

from .models import Project


class StockyProjectTests(TestCase):
    def test_stocky_is_seeded_by_migrations(self):
        project = Project.objects.get(title="Stocky")

        self.assertEqual(project.image.name, "portfolio/images/stocky-logo.png")
        self.assertEqual(project.url, "https://github.com/lucerolasala/Stocky")

    def test_homepage_presents_stocky(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Stocky")
        self.assertContains(response, "https://github.com/lucerolasala/Stocky")
