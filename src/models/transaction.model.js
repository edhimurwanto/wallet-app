class Transaction {
    
    constructor(id, type, amount, transactionDate, sender, receiever, createdAt, updatedAt){
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.transactionDate =transactionDate;
        this.sender = sender;
        this.receiever = receiever;
        this.createdAt =createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Transaction;