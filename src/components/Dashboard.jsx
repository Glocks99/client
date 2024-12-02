import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [type, setType] = useState("income");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [income, setIncome] = useState(0)
    const [expense, setExpense] = useState(0)

    useEffect(() => {
     
      const fetchData = async() => {
        const response = await fetch("http://localhost:3000/get-trans")
    
          const data = await response.json()
          setTransactions(data)
        
      }

      fetchData()
    }, [])

    

    

  const addTransaction = async() => {
    if (!amount || amount <= 0 || !description.trim()) {
      alert("Please enter a valid amount and description.");
      return;
    }

    const newTransaction = {
      type,
      amount: parseFloat(amount),
      desc: description.trim(),
      date: new Date().toLocaleDateString()
    };

    await fetch("http://localhost:3000/post-trans", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify(newTransaction)
    })
    .then(() => {
      setTransactions(newTransaction)
    })
    .catch(err => {
      console.log(err.message)
    })
    .finally(() => {
      setAmount(" ")
      setDescription(" ")
    })

  };


  const handleDelete = async(id) => {
    const response = await fetch(`http://localhost:3000/delete-trans/${id}`, {
      method: "DELETE"
    })
    
    transactions.filter(trans => {
      setTransactions(trans._id != id)
    })
  }

  if(transactions ){
    transactions.forEach(item => {
      if(item.type == "income"){
        setIncome(prevIncome => prevIncome + item.amount)
      }
      else {
        setExpense(prevExpense => prevExpense + item.amount)
      }
    })
  }

  

  const navigate = useNavigate();
  // const user = JSON.parse(localStorage.getItem("loggedInUser"));

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };


  return (
    <div>
      {/* <h1>Welcome, {user.email}</h1> */}
      <button onClick={handleLogout}>Log Out</button>

      <div className="App">
      <header>
        <h1>Student Budget Tracker</h1>
      </header>

      <section>
        <h2>Add Transaction</h2>
        <div className="form">
          <select value={type} name="type" onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            name="desc"
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={addTransaction}>Add</button>
        </div>
      </section>

      <section>
        <h2>Summary</h2>
        <p>Total Income: GHC {income}</p>
        <p>Total Expenses: GHC {expense}</p>
        <p>Savings: GHC  {income - expense}</p>
      </section>

      <section>
        <h2>Transactions</h2>
        
        {transactions.length === 0 ?
        <p>No transactions yet</p> :
          
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((trans,index) => (
                <tr key={index}>
                  <td>{trans.type}</td>
                  <td>{trans.amount}</td>
                  <td>{trans.desc}</td>
                  <td>{trans.date}</td>
                  <td><button onClick={e => handleDelete(trans._id, index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>

            <tfoot></tfoot>
          </table>

        }
      </section>
    </div>
  

    </div>
  );
}

export default Dashboard;
