from django.contrib import admin

# Register your models here.
from django.contrib import admin

from .models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = (
        "date",
        "user",
        "account",
        "category",
        "transaction_type",
        "amount",
        "status",
    )

    list_filter = (
        "transaction_type",
        "status",
        "date",
    )

    search_fields = (
        "description",
        "notes",
        "user__email",
        "account__name",
        "category__name",
    )

    ordering = ("-date", "-created_at")