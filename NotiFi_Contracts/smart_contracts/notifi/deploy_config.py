import logging

import algokit_utils
from algokit_utils import EnsureBalanceParameters, ensure_funded, get_account
from algosdk.v2client.algod import AlgodClient
from algosdk.v2client.indexer import IndexerClient

from beaker import localnet
from beaker.consts import algo

logger = logging.getLogger(__name__)


# define deployment behaviour based on supplied app spec
def deploy(
    algod_client: AlgodClient,
    indexer_client: IndexerClient,
    app_spec: algokit_utils.ApplicationSpecification,
    deployer: algokit_utils.Account,
) -> None:
    from smart_contracts.artifacts.notifi.client import (
        NotifiClient,
    )

    app_client = NotifiClient(
        algod_client,
        creator=deployer,
        indexer_client=indexer_client,
    )
    app_client.deploy(
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
        on_update=algokit_utils.OnUpdate.AppendApp,
    )

    name = "world"
    response = app_client.hello(name=name)
    logger.info(
        f"Called hello on {app_spec.contract.name} ({app_client.app_id}) "
        f"with name={name}, received: {response.return_value}"
    )

    ensure_funded(
        algod_client,
        EnsureBalanceParameters(
            account_to_fund=app_client.app_address,
            min_spending_balance_micro_algos=10000 * algo,
            min_funding_increment_micro_algos=10000 * algo,
        ),
    )
    # need address as bytes
    response = app_client.update_email(
        email=name,
        transaction_parameters=algokit_utils.TransactionParameters(
            boxes=[(app_client.app_id, deployer.public_key)]
        ),
    )
    logger.info(
        f"Called updateEmail on {app_spec.contract.name} ({app_client.app_id}) "
        f"with email={name}, received: {response.return_value}"
    )

    response = app_client.get_email(
        address=deployer.public_key,
        transaction_parameters=algokit_utils.TransactionParameters(
            boxes=[(app_client.app_id, deployer.public_key)]
        ),
    )
    logger.info(
        f"Called readEmail on {app_spec.contract.name} ({app_client.app_id}) "
        f"with address={deployer.address}, received: {response.return_value}"
    )
