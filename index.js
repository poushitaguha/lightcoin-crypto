class Account {

  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    // this.balance = 0;
    this.transactions = [];
  }

  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

// abstract class
class Transaction {

  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  // commit() {
  //   this.account.balance += this.value;
  // }

  commit() {
    if (!this.isAllowed()) return false;    
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }

}

class Deposit extends Transaction {

  // commit() {
  //   this.account.balance += this.amount;
  // }

  get value() {
    return this.amount
  }  

  isAllowed() {
    // Deposits are always allowed 
    return true;
  }  

}

class Withdrawal extends Transaction {

  // commit() {
  //   this.account.balance -= this.amount;
  // }

  get value() {
    return -this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }  

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);


// Output in console

// Starting Account Balance:  0
// Attempting to withdraw even $1 should fail...
// Commit result: false
// Account Balance:  0
// Depositing should succeed...
// Commit result: true
// Account Balance:  9.99
// Withdrawal for 9.99 should be allowed...
// Commit result: true
// Ending Account Balance:  0
// Lookings like I'm broke again
// Account Transaction History:  [ Deposit {
//     amount: 9.99,
//     account: Account { username: undefined, transactions: [Circular] },
//     time: 2019-06-26T16:05:15.159Z },
//   Withdrawal {
//     amount: 9.99,
//     account: Account { username: undefined, transactions: [Circular] },
//     time: 2019-06-26T16:05:15.159Z } ]