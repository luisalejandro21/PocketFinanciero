from django.db import transaction as db_transaction

from apps.accounts.models import Account

from .models import Transaction


class TransactionService:
    @staticmethod
    def get_locked_account(account_id):
        """
        Obtiene la cuenta directamente desde la base de datos
        y bloquea su fila mientras se actualiza el saldo.
        """

        return (
            Account.objects
            .select_for_update()
            .get(pk=account_id)
        )

    @staticmethod
    @db_transaction.atomic
    def apply_transaction(transaction: Transaction):
        """
        Aplica al saldo el efecto de una transacción confirmada.
        """

        if transaction.status != Transaction.TransactionStatus.CONFIRMED:
            return transaction

        account = TransactionService.get_locked_account(
            transaction.account_id
        )

        if transaction.transaction_type == Transaction.TransactionType.INCOME:
            account.current_balance += transaction.amount

        elif transaction.transaction_type == Transaction.TransactionType.EXPENSE:
            account.current_balance -= transaction.amount

        elif transaction.transaction_type == Transaction.TransactionType.ADJUSTMENT:
            account.current_balance = transaction.amount

        elif transaction.transaction_type == Transaction.TransactionType.TRANSFER:
            destination_account = TransactionService.get_locked_account(
                transaction.destination_account_id
            )

            account.current_balance -= transaction.amount
            destination_account.current_balance += transaction.amount

            destination_account.save(
                update_fields=["current_balance"]
            )

        account.save(
            update_fields=["current_balance"]
        )

        return transaction

    @staticmethod
    @db_transaction.atomic
    def reverse_transaction(transaction: Transaction):
        """
        Revierte el efecto de una transacción confirmada.
        """

        if transaction.status != Transaction.TransactionStatus.CONFIRMED:
            return transaction

        account = TransactionService.get_locked_account(
            transaction.account_id
        )

        if transaction.transaction_type == Transaction.TransactionType.INCOME:
            account.current_balance -= transaction.amount

        elif transaction.transaction_type == Transaction.TransactionType.EXPENSE:
            account.current_balance += transaction.amount

        elif transaction.transaction_type == Transaction.TransactionType.TRANSFER:
            destination_account = TransactionService.get_locked_account(
                transaction.destination_account_id
            )

            account.current_balance += transaction.amount
            destination_account.current_balance -= transaction.amount

            destination_account.save(
                update_fields=["current_balance"]
            )

        elif transaction.transaction_type == Transaction.TransactionType.ADJUSTMENT:
            raise ValueError(
                "No es posible revertir un ajuste sin conocer el saldo anterior."
            )

        account.save(
            update_fields=["current_balance"]
        )

        return transaction