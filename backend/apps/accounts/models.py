from django.conf import settings
from django.db import models


class Account(models.Model):
    class AccountType(models.TextChoices):
        CHECKING = "CHECKING", "Cuenta corriente"
        VIEW = "VIEW", "Cuenta vista"
        SAVINGS = "SAVINGS", "Cuenta de ahorro"
        CASH = "CASH", "Efectivo"
        CREDIT_CARD = "CREDIT_CARD", "Tarjeta de crédito"
        OTHER = "OTHER", "Otro"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="accounts",
    )

    name = models.CharField(max_length=100)

    account_type = models.CharField(
        max_length=20,
        choices=AccountType.choices,
        default=AccountType.VIEW,
    )

    institution = models.CharField(max_length=100, blank=True)

    initial_balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    current_balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0,
    )

    currency = models.CharField(max_length=10, default="CLP")
    is_active = models.BooleanField(default=True)
    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name = "Account"
        verbose_name_plural = "Accounts"
        unique_together = ("user", "name")

    def __str__(self):
        return f"{self.name} - {self.user.email}"