from django.db import transaction as db_transaction

from rest_framework import viewsets
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated

from .models import Transaction
from .serializers import TransactionSerializer
from .services import TransactionService


class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(
            user=self.request.user
        ).select_related(
            "account",
            "category",
            "destination_account",
        )

    @db_transaction.atomic
    def perform_create(self, serializer):
        transaction = serializer.save(
            user=self.request.user
        )

        TransactionService.apply_transaction(transaction)

    @db_transaction.atomic
    def perform_update(self, serializer):
        old_transaction = (
            Transaction.objects
            .select_for_update()
            .get(
                pk=serializer.instance.pk,
                user=self.request.user,
            )
        )

        if (
            old_transaction.status
            == Transaction.TransactionStatus.CONFIRMED
            and old_transaction.transaction_type
            == Transaction.TransactionType.ADJUSTMENT
        ):
            raise ValidationError(
                {
                    "detail": (
                        "Por ahora no se puede editar ni cancelar "
                        "un ajuste confirmado, porque no se guardó "
                        "el saldo anterior."
                    )
                }
            )

        if (
            old_transaction.status
            == Transaction.TransactionStatus.CONFIRMED
        ):
            TransactionService.reverse_transaction(
                old_transaction
            )

        updated_transaction = serializer.save()

        if (
            updated_transaction.status
            == Transaction.TransactionStatus.CONFIRMED
        ):
            TransactionService.apply_transaction(
                updated_transaction
            )

    @db_transaction.atomic
    def perform_destroy(self, instance):
        transaction = (
            Transaction.objects
            .select_for_update()
            .get(
                pk=instance.pk,
                user=self.request.user,
            )
        )

        if (
            transaction.status
            == Transaction.TransactionStatus.CONFIRMED
            and transaction.transaction_type
            == Transaction.TransactionType.ADJUSTMENT
        ):
            raise ValidationError(
                {
                    "detail": (
                        "Por ahora no se puede eliminar un ajuste "
                        "confirmado, porque no se guardó "
                        "el saldo anterior."
                    )
                }
            )

        if (
            transaction.status
            == Transaction.TransactionStatus.CONFIRMED
        ):
            TransactionService.reverse_transaction(
                transaction
            )

        transaction.delete()