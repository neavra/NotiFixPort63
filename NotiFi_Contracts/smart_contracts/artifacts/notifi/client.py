# flake8: noqa
# fmt: off
# mypy: disable-error-code="no-any-return, no-untyped-call"
# This file was automatically generated by algokit-client-generator.
# DO NOT MODIFY IT BY HAND.
# requires: algokit-utils@^1.2.0
import base64
import dataclasses
import decimal
import typing
from abc import ABC, abstractmethod

import algokit_utils
import algosdk
from algosdk.atomic_transaction_composer import (
    AtomicTransactionComposer,
    AtomicTransactionResponse,
    TransactionSigner,
    TransactionWithSigner
)

_APP_SPEC_JSON = r"""{
    "hints": {
        "hello(string)string": {
            "call_config": {
                "no_op": "CALL"
            }
        },
        "updateEmail(string)void": {
            "call_config": {
                "no_op": "CALL"
            }
        },
        "getEmail(address)string": {
            "call_config": {
                "no_op": "CALL"
            }
        }
    },
    "source": {
        "approval": "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4IDB4MTUxZjdjNzUKdHhuIE51bUFwcEFyZ3MKaW50Y18wIC8vIDAKPT0KYm56IG1haW5fbDgKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgwMmJlY2UxMSAvLyAiaGVsbG8oc3RyaW5nKXN0cmluZyIKPT0KYm56IG1haW5fbDcKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMApwdXNoYnl0ZXMgMHgyMDllMTkyOSAvLyAidXBkYXRlRW1haWwoc3RyaW5nKXZvaWQiCj09CmJueiBtYWluX2w2CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4MjFjNWJmY2YgLy8gImdldEVtYWlsKGFkZHJlc3Mpc3RyaW5nIgo9PQpibnogbWFpbl9sNQplcnIKbWFpbl9sNToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiBnZXRFbWFpbGNhc3Rlcl81CmludGNfMSAvLyAxCnJldHVybgptYWluX2w2Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CnR4biBBcHBsaWNhdGlvbklECmludGNfMCAvLyAwCiE9CiYmCmFzc2VydApjYWxsc3ViIHVwZGF0ZUVtYWlsY2FzdGVyXzQKaW50Y18xIC8vIDEKcmV0dXJuCm1haW5fbDc6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgaGVsbG9jYXN0ZXJfMwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sODoKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQpibnogbWFpbl9sMTAKZXJyCm1haW5fbDEwOgp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAo9PQphc3NlcnQKaW50Y18xIC8vIDEKcmV0dXJuCgovLyBoZWxsbwpoZWxsb18wOgpwcm90byAxIDEKYnl0ZWNfMCAvLyAiIgpwdXNoYnl0ZXMgMHg0ODY1NmM2YzZmMmMyMCAvLyAiSGVsbG8sICIKZnJhbWVfZGlnIC0xCmV4dHJhY3QgMiAwCmNvbmNhdApmcmFtZV9idXJ5IDAKZnJhbWVfZGlnIDAKbGVuCml0b2IKZXh0cmFjdCA2IDAKZnJhbWVfZGlnIDAKY29uY2F0CmZyYW1lX2J1cnkgMApyZXRzdWIKCi8vIHVwZGF0ZUVtYWlsCnVwZGF0ZUVtYWlsXzE6CnByb3RvIDEgMAp0eG4gU2VuZGVyCmJveF9kZWwKcG9wCnR4biBTZW5kZXIKZnJhbWVfZGlnIC0xCmJveF9wdXQKcmV0c3ViCgovLyBnZXRFbWFpbApnZXRFbWFpbF8yOgpwcm90byAxIDEKYnl0ZWNfMCAvLyAiIgpmcmFtZV9kaWcgLTEKYm94X2dldApzdG9yZSAxCnN0b3JlIDAKbG9hZCAxCmFzc2VydApsb2FkIDAKZnJhbWVfYnVyeSAwCnJldHN1YgoKLy8gaGVsbG9fY2FzdGVyCmhlbGxvY2FzdGVyXzM6CnByb3RvIDAgMApieXRlY18wIC8vICIiCmR1cAp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmZyYW1lX2J1cnkgMQpmcmFtZV9kaWcgMQpjYWxsc3ViIGhlbGxvXzAKZnJhbWVfYnVyeSAwCmJ5dGVjXzEgLy8gMHgxNTFmN2M3NQpmcmFtZV9kaWcgMApjb25jYXQKbG9nCnJldHN1YgoKLy8gdXBkYXRlRW1haWxfY2FzdGVyCnVwZGF0ZUVtYWlsY2FzdGVyXzQ6CnByb3RvIDAgMApieXRlY18wIC8vICIiCnR4bmEgQXBwbGljYXRpb25BcmdzIDEKZnJhbWVfYnVyeSAwCmZyYW1lX2RpZyAwCmNhbGxzdWIgdXBkYXRlRW1haWxfMQpyZXRzdWIKCi8vIGdldEVtYWlsX2Nhc3RlcgpnZXRFbWFpbGNhc3Rlcl81Ogpwcm90byAwIDAKYnl0ZWNfMCAvLyAiIgpkdXAKdHhuYSBBcHBsaWNhdGlvbkFyZ3MgMQpmcmFtZV9idXJ5IDEKZnJhbWVfZGlnIDEKY2FsbHN1YiBnZXRFbWFpbF8yCmZyYW1lX2J1cnkgMApieXRlY18xIC8vIDB4MTUxZjdjNzUKZnJhbWVfZGlnIDAKY29uY2F0CmxvZwpyZXRzdWI=",
        "clear": "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu"
    },
    "state": {
        "global": {
            "num_byte_slices": 0,
            "num_uints": 0
        },
        "local": {
            "num_byte_slices": 0,
            "num_uints": 0
        }
    },
    "schema": {
        "global": {
            "declared": {},
            "reserved": {}
        },
        "local": {
            "declared": {},
            "reserved": {}
        }
    },
    "contract": {
        "name": "notifi",
        "methods": [
            {
                "name": "hello",
                "args": [
                    {
                        "type": "string",
                        "name": "name"
                    }
                ],
                "returns": {
                    "type": "string"
                }
            },
            {
                "name": "updateEmail",
                "args": [
                    {
                        "type": "string",
                        "name": "email"
                    }
                ],
                "returns": {
                    "type": "void"
                }
            },
            {
                "name": "getEmail",
                "args": [
                    {
                        "type": "address",
                        "name": "address"
                    }
                ],
                "returns": {
                    "type": "string"
                }
            }
        ],
        "networks": {}
    },
    "bare_call_config": {
        "no_op": "CREATE"
    }
}"""
APP_SPEC = algokit_utils.ApplicationSpecification.from_json(_APP_SPEC_JSON)
_TReturn = typing.TypeVar("_TReturn")


class _ArgsBase(ABC, typing.Generic[_TReturn]):
    @staticmethod
    @abstractmethod
    def method() -> str:
        ...


_TArgs = typing.TypeVar("_TArgs", bound=_ArgsBase[typing.Any])


@dataclasses.dataclass(kw_only=True)
class _TArgsHolder(typing.Generic[_TArgs]):
    args: _TArgs


def _filter_none(value: dict | typing.Any) -> dict | typing.Any:
    if isinstance(value, dict):
        return {k: _filter_none(v) for k, v in value.items() if v is not None}
    return value


def _as_dict(data: typing.Any, *, convert_all: bool = True) -> dict[str, typing.Any]:
    if data is None:
        return {}
    if not dataclasses.is_dataclass(data):
        raise TypeError(f"{data} must be a dataclass")
    if convert_all:
        result = dataclasses.asdict(data)
    else:
        result = {f.name: getattr(data, f.name) for f in dataclasses.fields(data)}
    return _filter_none(result)


def _convert_transaction_parameters(
    transaction_parameters: algokit_utils.TransactionParameters | None,
) -> algokit_utils.CommonCallParametersDict:
    return typing.cast(algokit_utils.CommonCallParametersDict, _as_dict(transaction_parameters))


def _convert_call_transaction_parameters(
    transaction_parameters: algokit_utils.TransactionParameters | None,
) -> algokit_utils.OnCompleteCallParametersDict:
    return typing.cast(algokit_utils.OnCompleteCallParametersDict, _as_dict(transaction_parameters))


def _convert_create_transaction_parameters(
    transaction_parameters: algokit_utils.TransactionParameters | None,
    on_complete: algokit_utils.OnCompleteActionName,
) -> algokit_utils.CreateCallParametersDict:
    result = typing.cast(algokit_utils.CreateCallParametersDict, _as_dict(transaction_parameters))
    on_complete_enum = on_complete.replace("_", " ").title().replace(" ", "") + "OC"
    result["on_complete"] = getattr(algosdk.transaction.OnComplete, on_complete_enum)
    return result


def _convert_deploy_args(
    deploy_args: algokit_utils.DeployCallArgs | None,
) -> algokit_utils.ABICreateCallArgsDict | None:
    if deploy_args is None:
        return None

    deploy_args_dict = typing.cast(algokit_utils.ABICreateCallArgsDict, _as_dict(deploy_args))
    if isinstance(deploy_args, _TArgsHolder):
        deploy_args_dict["args"] = _as_dict(deploy_args.args)
        deploy_args_dict["method"] = deploy_args.args.method()

    return deploy_args_dict


@dataclasses.dataclass(kw_only=True)
class HelloArgs(_ArgsBase[str]):
    name: str

    @staticmethod
    def method() -> str:
        return "hello(string)string"


@dataclasses.dataclass(kw_only=True)
class UpdateEmailArgs(_ArgsBase[None]):
    email: str

    @staticmethod
    def method() -> str:
        return "updateEmail(string)void"


@dataclasses.dataclass(kw_only=True)
class GetEmailArgs(_ArgsBase[str]):
    address: str

    @staticmethod
    def method() -> str:
        return "getEmail(address)string"


class Composer:

    def __init__(self, app_client: algokit_utils.ApplicationClient, atc: AtomicTransactionComposer):
        self.app_client = app_client
        self.atc = atc

    def build(self) -> AtomicTransactionComposer:
        return self.atc

    def execute(self) -> AtomicTransactionResponse:
        return self.app_client.execute_atc(self.atc)

    def hello(
        self,
        *,
        name: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to `hello(string)string` ABI method
        
        :param str name: The `name` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        args = HelloArgs(
            name=name,
        )
        self.app_client.compose_call(
            self.atc,
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return self

    def update_email(
        self,
        *,
        email: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to `updateEmail(string)void` ABI method
        
        :param str email: The `email` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        args = UpdateEmailArgs(
            email=email,
        )
        self.app_client.compose_call(
            self.atc,
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return self

    def get_email(
        self,
        *,
        address: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to `getEmail(address)string` ABI method
        
        :param str address: The `address` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        args = GetEmailArgs(
            address=address,
        )
        self.app_client.compose_call(
            self.atc,
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return self

    def create_bare(
        self,
        *,
        on_complete: typing.Literal["no_op"] = "no_op",
        transaction_parameters: algokit_utils.CreateTransactionParameters | None = None,
    ) -> "Composer":
        """Adds a call to create an application using the no_op bare method
        
        :param typing.Literal[no_op] on_complete: On completion type to use
        :param algokit_utils.CreateTransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns Composer: This Composer instance"""

        self.app_client.compose_create(
            self.atc,
            call_abi_method=False,
            transaction_parameters=_convert_create_transaction_parameters(transaction_parameters, on_complete),
        )
        return self

    def clear_state(
        self,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
        app_args: list[bytes] | None = None,
    ) -> "Composer":
        """Adds a call to the application with on completion set to ClearState
    
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :param list[bytes] | None app_args: (optional) Application args to pass"""
    
        self.app_client.compose_clear_state(self.atc, _convert_transaction_parameters(transaction_parameters), app_args)
        return self


class NotifiClient:
    """A class for interacting with the notifi app providing high productivity and
    strongly typed methods to deploy and call the app"""

    @typing.overload
    def __init__(
        self,
        algod_client: algosdk.v2client.algod.AlgodClient,
        *,
        app_id: int = 0,
        signer: TransactionSigner | algokit_utils.Account | None = None,
        sender: str | None = None,
        suggested_params: algosdk.transaction.SuggestedParams | None = None,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        app_name: str | None = None,
    ) -> None:
        ...

    @typing.overload
    def __init__(
        self,
        algod_client: algosdk.v2client.algod.AlgodClient,
        *,
        creator: str | algokit_utils.Account,
        indexer_client: algosdk.v2client.indexer.IndexerClient | None = None,
        existing_deployments: algokit_utils.AppLookup | None = None,
        signer: TransactionSigner | algokit_utils.Account | None = None,
        sender: str | None = None,
        suggested_params: algosdk.transaction.SuggestedParams | None = None,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        app_name: str | None = None,
    ) -> None:
        ...

    def __init__(
        self,
        algod_client: algosdk.v2client.algod.AlgodClient,
        *,
        creator: str | algokit_utils.Account | None = None,
        indexer_client: algosdk.v2client.indexer.IndexerClient | None = None,
        existing_deployments: algokit_utils.AppLookup | None = None,
        app_id: int = 0,
        signer: TransactionSigner | algokit_utils.Account | None = None,
        sender: str | None = None,
        suggested_params: algosdk.transaction.SuggestedParams | None = None,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        app_name: str | None = None,
    ) -> None:
        """
        NotifiClient can be created with an app_id to interact with an existing application, alternatively
        it can be created with a creator and indexer_client specified to find existing applications by name and creator.
        
        :param AlgodClient algod_client: AlgoSDK algod client
        :param int app_id: The app_id of an existing application, to instead find the application by creator and name
        use the creator and indexer_client parameters
        :param str | Account creator: The address or Account of the app creator to resolve the app_id
        :param IndexerClient indexer_client: AlgoSDK indexer client, only required if deploying or finding app_id by
        creator and app name
        :param AppLookup existing_deployments:
        :param TransactionSigner | Account signer: Account or signer to use to sign transactions, if not specified and
        creator was passed as an Account will use that.
        :param str sender: Address to use as the sender for all transactions, will use the address associated with the
        signer if not specified.
        :param TemplateValueMapping template_values: Values to use for TMPL_* template variables, dictionary keys should
        *NOT* include the TMPL_ prefix
        :param str | None app_name: Name of application to use when deploying, defaults to name defined on the
        Application Specification
            """

        self.app_spec = APP_SPEC
        
        # calling full __init__ signature, so ignoring mypy warning about overloads
        self.app_client = algokit_utils.ApplicationClient(  # type: ignore[call-overload, misc]
            algod_client=algod_client,
            app_spec=self.app_spec,
            app_id=app_id,
            creator=creator,
            indexer_client=indexer_client,
            existing_deployments=existing_deployments,
            signer=signer,
            sender=sender,
            suggested_params=suggested_params,
            template_values=template_values,
            app_name=app_name,
        )

    @property
    def algod_client(self) -> algosdk.v2client.algod.AlgodClient:
        return self.app_client.algod_client

    @property
    def app_id(self) -> int:
        return self.app_client.app_id

    @app_id.setter
    def app_id(self, value: int) -> None:
        self.app_client.app_id = value

    @property
    def app_address(self) -> str:
        return self.app_client.app_address

    @property
    def sender(self) -> str | None:
        return self.app_client.sender

    @sender.setter
    def sender(self, value: str) -> None:
        self.app_client.sender = value

    @property
    def signer(self) -> TransactionSigner | None:
        return self.app_client.signer

    @signer.setter
    def signer(self, value: TransactionSigner) -> None:
        self.app_client.signer = value

    @property
    def suggested_params(self) -> algosdk.transaction.SuggestedParams | None:
        return self.app_client.suggested_params

    @suggested_params.setter
    def suggested_params(self, value: algosdk.transaction.SuggestedParams | None) -> None:
        self.app_client.suggested_params = value

    def hello(
        self,
        *,
        name: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.ABITransactionResponse[str]:
        """Calls `hello(string)string` ABI method
        
        :param str name: The `name` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.ABITransactionResponse[str]: The result of the transaction"""

        args = HelloArgs(
            name=name,
        )
        result = self.app_client.call(
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return result

    def update_email(
        self,
        *,
        email: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.ABITransactionResponse[None]:
        """Calls `updateEmail(string)void` ABI method
        
        :param str email: The `email` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.ABITransactionResponse[None]: The result of the transaction"""

        args = UpdateEmailArgs(
            email=email,
        )
        result = self.app_client.call(
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return result

    def get_email(
        self,
        *,
        address: str,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
    ) -> algokit_utils.ABITransactionResponse[str]:
        """Calls `getEmail(address)string` ABI method
        
        :param str address: The `address` ABI parameter
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.ABITransactionResponse[str]: The result of the transaction"""

        args = GetEmailArgs(
            address=address,
        )
        result = self.app_client.call(
            call_abi_method=args.method(),
            transaction_parameters=_convert_call_transaction_parameters(transaction_parameters),
            **_as_dict(args, convert_all=True),
        )
        return result

    def create_bare(
        self,
        *,
        on_complete: typing.Literal["no_op"] = "no_op",
        transaction_parameters: algokit_utils.CreateTransactionParameters | None = None,
    ) -> algokit_utils.TransactionResponse:
        """Creates an application using the no_op bare method
        
        :param typing.Literal[no_op] on_complete: On completion type to use
        :param algokit_utils.CreateTransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :returns algokit_utils.TransactionResponse: The result of the transaction"""

        result = self.app_client.create(
            call_abi_method=False,
            transaction_parameters=_convert_create_transaction_parameters(transaction_parameters, on_complete),
        )
        return result

    def clear_state(
        self,
        transaction_parameters: algokit_utils.TransactionParameters | None = None,
        app_args: list[bytes] | None = None,
    ) -> algokit_utils.TransactionResponse:
        """Calls the application with on completion set to ClearState
    
        :param algokit_utils.TransactionParameters transaction_parameters: (optional) Additional transaction parameters
        :param list[bytes] | None app_args: (optional) Application args to pass
        :returns algokit_utils.TransactionResponse: The result of the transaction"""
    
        return self.app_client.clear_state(_convert_transaction_parameters(transaction_parameters), app_args)

    def deploy(
        self,
        version: str | None = None,
        *,
        signer: TransactionSigner | None = None,
        sender: str | None = None,
        allow_update: bool | None = None,
        allow_delete: bool | None = None,
        on_update: algokit_utils.OnUpdate = algokit_utils.OnUpdate.Fail,
        on_schema_break: algokit_utils.OnSchemaBreak = algokit_utils.OnSchemaBreak.Fail,
        template_values: algokit_utils.TemplateValueMapping | None = None,
        create_args: algokit_utils.DeployCallArgs | None = None,
        update_args: algokit_utils.DeployCallArgs | None = None,
        delete_args: algokit_utils.DeployCallArgs | None = None,
    ) -> algokit_utils.DeployResponse:
        """Deploy an application and update client to reference it.
        
        Idempotently deploy (create, update/delete if changed) an app against the given name via the given creator
        account, including deploy-time template placeholder substitutions.
        To understand the architecture decisions behind this functionality please see
        <https://github.com/algorandfoundation/algokit-cli/blob/main/docs/architecture-decisions/2023-01-12_smart-contract-deployment.md>
        
        ```{note}
        If there is a breaking state schema change to an existing app (and `on_schema_break` is set to
        'ReplaceApp' the existing app will be deleted and re-created.
        ```
        
        ```{note}
        If there is an update (different TEAL code) to an existing app (and `on_update` is set to 'ReplaceApp')
        the existing app will be deleted and re-created.
        ```
        
        :param str version: version to use when creating or updating app, if None version will be auto incremented
        :param algosdk.atomic_transaction_composer.TransactionSigner signer: signer to use when deploying app
        , if None uses self.signer
        :param str sender: sender address to use when deploying app, if None uses self.sender
        :param bool allow_delete: Used to set the `TMPL_DELETABLE` template variable to conditionally control if an app
        can be deleted
        :param bool allow_update: Used to set the `TMPL_UPDATABLE` template variable to conditionally control if an app
        can be updated
        :param OnUpdate on_update: Determines what action to take if an application update is required
        :param OnSchemaBreak on_schema_break: Determines what action to take if an application schema requirements
        has increased beyond the current allocation
        :param dict[str, int|str|bytes] template_values: Values to use for `TMPL_*` template variables, dictionary keys
        should *NOT* include the TMPL_ prefix
        :param algokit_utils.DeployCallArgs | None create_args: Arguments used when creating an application
        :param algokit_utils.DeployCallArgs | None update_args: Arguments used when updating an application
        :param algokit_utils.DeployCallArgs | None delete_args: Arguments used when deleting an application
        :return DeployResponse: details action taken and relevant transactions
        :raises DeploymentError: If the deployment failed"""

        return self.app_client.deploy(
            version,
            signer=signer,
            sender=sender,
            allow_update=allow_update,
            allow_delete=allow_delete,
            on_update=on_update,
            on_schema_break=on_schema_break,
            template_values=template_values,
            create_args=_convert_deploy_args(create_args),
            update_args=_convert_deploy_args(update_args),
            delete_args=_convert_deploy_args(delete_args),
        )

    def compose(self, atc: AtomicTransactionComposer | None = None) -> Composer:
        return Composer(self.app_client, atc or AtomicTransactionComposer())
