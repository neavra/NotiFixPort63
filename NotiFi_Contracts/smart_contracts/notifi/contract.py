import beaker
import pyteal as pt

from beaker.lib.storage import BoxMapping


class UserEmailStates:
    emails = BoxMapping(pt.abi.Address, pt.abi.String)


app = beaker.Application("notifi", state=UserEmailStates())


@app.external
def hello(name: pt.abi.String, *, output: pt.abi.String) -> pt.Expr:
    return output.set(pt.Concat(pt.Bytes("Hello, "), name.get()))


@app.external
def updateEmail(email: pt.abi.String) -> pt.Expr:
    return app.state.emails[pt.Txn.sender()].set(email)
    # return output.set(pt.Txn.sender())


@app.external
def getEmail(address: pt.abi.Address, *, output: pt.abi.String) -> pt.Expr:
    return app.state.emails[address.get()].store_into(output)
