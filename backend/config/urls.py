from django.contrib import admin
from django.urls import include, path


urlpatterns = [
    path("admin/", admin.site.urls),

    # Autenticación
    path("api/auth/", include("apps.users.urls")),

    # Cuentas
    path("api/accounts/", include("apps.accounts.urls")),

    path("api/transactions/", include("apps.transactions.urls")),

    path("api/categories/", include("apps.categories.urls")),
]