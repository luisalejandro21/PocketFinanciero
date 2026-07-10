from django.conf import settings
from django.db import models


class Transaction(models.Model):
    class TransactionType(models.TextChoices):
        INCOME = "INCOME", "Ingreso"
        EXPENSE = "EXPENSE", "Gasto"
        TRANSFER = "TRANSFER", "Transferencia"
        ADJUSTMENT = "ADJUSTMENT", "Ajuste"

    class TransactionStatus(models.TextChoices):
        CONFIRMED = "CONFIRMED", "Confirmada"
        PENDING = "PENDING", "Pendiente"
        CANCELLED = "CANCELLED", "Cancelada"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="transactions",
    )

    account = models.ForeignKey(
        "accounts.Account",
        on_delete=models.PROTECT,
        related_name="transactions",
    )

    category = models.ForeignKey(
        "categories.Category",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="transactions",
    )

    destination_account = models.ForeignKey(
        "accounts.Account",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="incoming_transfers",
    )

    transaction_type = models.CharField(
        max_length=20,
        choices=TransactionType.choices,
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
    )

    currency = models.CharField(
        max_length=10,
        default="CLP",
    )

    date = models.DateField()

    description = models.CharField(
        max_length=255,
        blank=True,
    )

    notes = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=TransactionStatus.choices,
        default=TransactionStatus.CONFIRMED,
    )

    is_recurring = models.BooleanField(
        default=False,
    )

    recurrence_rule = models.CharField(
        max_length=100,
        blank=True,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-date", "-created_at"]
        verbose_name = "Movimiento"
        verbose_name_plural = "Movimientos"
        indexes = [
            models.Index(fields=["user", "date"]),
            models.Index(fields=["account", "date"]),
            models.Index(fields=["category", "date"]),
            models.Index(fields=["transaction_type", "date"]),
            models.Index(fields=["status", "date"]),
        ]

    def __str__(self):
        return f"{self.get_transaction_type_display()} - {self.amount}"