(function startApp() {
  const mysql = require("mysql");
  const inquirer = require("inquirer");
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_DB"
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayProductsForSale();
  });

  function displayProductsForSale() {
    console.log("\nPRODUCTS FOR SALE:\n");
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      // console.log(res);
      // Displays Product Info
      for (let i = 0; i < res.length; i++) {
        console.log("ID: " + res[i].id + " | " + "ITEM: " + res[i].product_name + " | " + "PRICE: " + res[i].price);
        console.log("-------------------------------------");
      }
      customerSelection();
    });
  }

  function customerSelection() {
    inquirer
      .prompt([{
          name: "id",
          type: "input",
          message: "Please select a product by id?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy"
        }
      ])
      .then(function (answer) {
        connection.query("SELECT * FROM products", function (err, res) {
          if (err) throw err;
          console.log("You Selected Item: " + answer.id + " " + " & a Quantity Of: " + answer.quantity);

          let quantity;
          let product;
          let price;
          //Grabs Data from the database to use for calculations
          for (let i = 0; i < res.length; i++) {
            if (res[i].id === parseInt(answer.id)) {
              quantity = res[i].stock_quantity;
              product = res[i].product_name;
              price = res[i].price;
            }
          }
          //If database product's stock is greater than what customer asked for and greater than zero, then subtract asked for quantity from database, otherwise don't do anything to the database and show user you are out of that product!
          if (quantity >= parseInt(answer.quantity) && (quantity > 0) && (answer.quantity > 0)) {
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: (quantity - answer.quantity),
              }, {
                id: answer.id
              }],
              function (err) {
                if (err) throw err;
                console.log("INVOICE: " + answer.quantity + "x " + product);
                console.log("TOTAL: " + "$" + (answer.quantity * price));
              });
            connection.end();
          } else {
            console.log("INSUFFICIENT QUANTITY IN STOCK!");
            connection.end();
          }
        });
      });
  }
}());