class Customer {
    constructor(id, fullname, email, password, birthdate, balance, points, createdAt, updatedAt) {
        this.id = id;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.balance = balance;
        this.points = points;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export default Customer;