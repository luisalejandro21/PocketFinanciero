from django.contrib import admin

from .models import Account


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "user",
        "account_type",
        "institution",
        "initial_balance",
        "currency",
        "is_active",
    )

    list_filter = (
        "account_type",
        "currency",
        "is_active",
    )

    search_fields = (
        "name",
        "institution",
        "user__email",
    )

    ordering = ("name",)