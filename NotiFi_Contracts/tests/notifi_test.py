import pytest
from algokit_utils import (
    ApplicationClient,
    ApplicationSpecification,
    get_localnet_default_account,
)
from algosdk.v2client.algod import AlgodClient

from smart_contracts.notifi import contract as notifi_contract


@pytest.fixture(scope="session")
def notifi_app_spec(algod_client: AlgodClient) -> ApplicationSpecification:
    return notifi_contract.app.build(algod_client)


@pytest.fixture(scope="session")
def notifi_client(
    algod_client: AlgodClient, notifi_app_spec: ApplicationSpecification
) -> ApplicationClient:
    client = ApplicationClient(
        algod_client,
        app_spec=notifi_app_spec,
        signer=get_localnet_default_account(algod_client),
        template_values={"UPDATABLE": 1, "DELETABLE": 1},
    )
    client.create()
    return client


def test_says_hello(notifi_client: ApplicationClient) -> None:
    result = notifi_client.call(notifi_contract.hello, name="World")

    assert result.return_value == "Hello, World"
