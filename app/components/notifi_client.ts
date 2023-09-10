import algosdk from "algosdk";
import * as bkr from "beaker-ts";
export class notifi extends bkr.ApplicationClient {
    desc: string = "";
    override appSchema: bkr.Schema = { declared: {}, reserved: {} };
    override acctSchema: bkr.Schema = { declared: {}, reserved: {} };
    override approvalProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKaW50Y2Jsb2NrIDAgMQpieXRlY2Jsb2NrIDB4CnR4biBOdW1BcHBBcmdzCmludGNfMCAvLyAwCj09CmJueiBtYWluX2w2CnR4bmEgQXBwbGljYXRpb25BcmdzIDAKcHVzaGJ5dGVzIDB4MjA5ZTE5MjkgLy8gInVwZGF0ZUVtYWlsKHN0cmluZyl2b2lkIgo9PQpibnogbWFpbl9sNQp0eG5hIEFwcGxpY2F0aW9uQXJncyAwCnB1c2hieXRlcyAweDIxYzViZmNmIC8vICJnZXRFbWFpbChhZGRyZXNzKXN0cmluZyIKPT0KYm56IG1haW5fbDQKZXJyCm1haW5fbDQ6CnR4biBPbkNvbXBsZXRpb24KaW50Y18wIC8vIE5vT3AKPT0KdHhuIEFwcGxpY2F0aW9uSUQKaW50Y18wIC8vIDAKIT0KJiYKYXNzZXJ0CmNhbGxzdWIgZ2V0RW1haWxjYXN0ZXJfMwppbnRjXzEgLy8gMQpyZXR1cm4KbWFpbl9sNToKdHhuIE9uQ29tcGxldGlvbgppbnRjXzAgLy8gTm9PcAo9PQp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAohPQomJgphc3NlcnQKY2FsbHN1YiB1cGRhdGVFbWFpbGNhc3Rlcl8yCmludGNfMSAvLyAxCnJldHVybgptYWluX2w2Ogp0eG4gT25Db21wbGV0aW9uCmludGNfMCAvLyBOb09wCj09CmJueiBtYWluX2w4CmVycgptYWluX2w4Ogp0eG4gQXBwbGljYXRpb25JRAppbnRjXzAgLy8gMAo9PQphc3NlcnQKaW50Y18xIC8vIDEKcmV0dXJuCgovLyB1cGRhdGVFbWFpbAp1cGRhdGVFbWFpbF8wOgpwcm90byAxIDAKdHhuIFNlbmRlcgpib3hfZGVsCnBvcAp0eG4gU2VuZGVyCmZyYW1lX2RpZyAtMQpib3hfcHV0CnJldHN1YgoKLy8gZ2V0RW1haWwKZ2V0RW1haWxfMToKcHJvdG8gMSAxCmJ5dGVjXzAgLy8gIiIKZnJhbWVfZGlnIC0xCmJveF9nZXQKc3RvcmUgMQpzdG9yZSAwCmxvYWQgMQphc3NlcnQKbG9hZCAwCmZyYW1lX2J1cnkgMApyZXRzdWIKCi8vIHVwZGF0ZUVtYWlsX2Nhc3Rlcgp1cGRhdGVFbWFpbGNhc3Rlcl8yOgpwcm90byAwIDAKYnl0ZWNfMCAvLyAiIgp0eG5hIEFwcGxpY2F0aW9uQXJncyAxCmZyYW1lX2J1cnkgMApmcmFtZV9kaWcgMApjYWxsc3ViIHVwZGF0ZUVtYWlsXzAKcmV0c3ViCgovLyBnZXRFbWFpbF9jYXN0ZXIKZ2V0RW1haWxjYXN0ZXJfMzoKcHJvdG8gMCAwCmJ5dGVjXzAgLy8gIiIKZHVwCnR4bmEgQXBwbGljYXRpb25BcmdzIDEKZnJhbWVfYnVyeSAxCmZyYW1lX2RpZyAxCmNhbGxzdWIgZ2V0RW1haWxfMQpmcmFtZV9idXJ5IDAKcHVzaGJ5dGVzIDB4MTUxZjdjNzUgLy8gMHgxNTFmN2M3NQpmcmFtZV9kaWcgMApjb25jYXQKbG9nCnJldHN1Yg==";
    override clearProgram: string = "I3ByYWdtYSB2ZXJzaW9uIDgKcHVzaGludCAwIC8vIDAKcmV0dXJu";
    override methods: algosdk.ABIMethod[] = [
        new algosdk.ABIMethod({ name: "updateEmail", desc: "", args: [{ type: "string", name: "email", desc: "" }], returns: { type: "void", desc: "" } }),
        new algosdk.ABIMethod({ name: "getEmail", desc: "", args: [{ type: "address", name: "address", desc: "" }], returns: { type: "string", desc: "" } })
    ];
    async updateEmail(args: {
        email: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<void>> {
        const result = await this._execute(await this.compose.updateEmail({ email: args.email }, txnParams));
        return new bkr.ABIResult<void>(result);
    }
    async getEmail(args: {
        address: string;
    }, txnParams?: bkr.TransactionOverrides): Promise<bkr.ABIResult<string>> {
        const result = await this._execute(await this.compose.getEmail({ address: args.address }, txnParams));
        return new bkr.ABIResult<string>(result, result.returnValue as string);
    }
    compose = {
        updateEmail: async (args: {
            email: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this._addMethodCall(algosdk.getMethodByName(this.methods, "updateEmail"), { email: args.email }, txnParams, atc);
        },
        getEmail: async (args: {
            address: string;
        }, txnParams?: bkr.TransactionOverrides, atc?: algosdk.AtomicTransactionComposer): Promise<algosdk.AtomicTransactionComposer> => {
            return this._addMethodCall(algosdk.getMethodByName(this.methods, "getEmail"), { address: args.address }, txnParams, atc);
        }
    };
}
