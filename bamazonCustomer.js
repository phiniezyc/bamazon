const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // username
  user: "root",

  password: "",
  database: "bamazon_DB"
});

//Used an Immediately Invoked Function Expression to start game immediately and to keep global space clean
(function startApp() {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // username
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
      //connection.end();
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
          
          for (let i = 0; i < res.length; i++) {
            if (res[i].id === parseInt(answer.id)) {
              quantity = res[i].stock_quantity;
              product = res[i].product_name;
              price = res[i].price;
            }
          }
          if (quantity >= parseInt(answer.quantity) && (quantity > 0) && (answer.quantity > 0)) {

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: (quantity - answer.quantity),
              }, {
                id: answer.id
              }],
              function (err) {
                if (err) throw err;
                console.log("INVOICE: " + answer.quantity + "x " + " product");
                console.log("TOTAL: " + "$" + (answer.quantity * price));
              });


          } else {
            console.log("INSUFFICIENT QUANTITY IN STOCK!");
          }

        });

      });

  }



}());




// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.